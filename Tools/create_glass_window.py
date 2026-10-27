import bpy
import bmesh
import json
from pathlib import Path
from mathutils import Vector

ROOT=Path('F:/UnityProjects/CEBB_V13')
OUT=ROOT/'Assets/3D Models/Glass Window'
PRE=ROOT/'output/glass-window'
OUT.mkdir(parents=True,exist_ok=True)
PRE.mkdir(parents=True,exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# A closed boundary surface, partitioned into frame and clear regions.
# No internal faces or overlapping solids; all dimensions baked into mesh.
xs=[-.5,-.475,.5]
zs=[0,.025,.975,1]
verts=[]; faces=[]; mats=[]; lookup={}
def face(points,mat):
    ids=[]
    for p in points:
        if p not in lookup:
            lookup[p]=len(verts); verts.append(p)
        ids.append(lookup[p])
    faces.append(ids); mats.append(mat)
for i in range(2):
    for j in range(3):
        a,b=xs[i:i+2]; c,d=zs[j:j+2]
        m=0 if i==0 or j!=1 else 1
        face([(a,-.08,c),(b,-.08,c),(b,-.08,d),(a,-.08,d)],m)
        face([(b,.08,c),(a,.08,c),(a,.08,d),(b,.08,d)],m)
        if i==0: face([(a,.08,c),(a,-.08,c),(a,-.08,d),(a,.08,d)],0)
        if i==1: face([(b,-.08,c),(b,.08,c),(b,.08,d),(b,-.08,d)],1)
        if j==0: face([(a,.08,c),(b,.08,c),(b,-.08,c),(a,-.08,c)],0)
        if j==2: face([(a,-.08,d),(b,-.08,d),(b,.08,d),(a,.08,d)],0)
mesh=bpy.data.meshes.new('GlassWindow_Mesh')
mesh.from_pydata(verts,[],faces); mesh.update()
obj=bpy.data.objects.new('GlassWindow',mesh)
bpy.context.collection.objects.link(obj)
bpy.context.view_layer.objects.active=obj
obj.select_set(True)

# Functional RGBA texture: nearly clear pane plus exactly two diagonal glints.
size=128
img=bpy.data.images.new('GlassWindow_RGBA',width=size,height=size,alpha=True)
pixels=[]
def distance_segment(x,y,a,b):
    dx=b[0]-a[0]; dy=b[1]-a[1]
    t=max(0,min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)))
    return ((x-a[0]-t*dx)**2+(y-a[1]-t*dy)**2)**.5
for y in range(size):
    for x in range(size):
        u=(x+.5)/size; v=(y+.5)/size
        dist=min(distance_segment(u,v,(.11,.76),(.19,.88)),
                 distance_segment(u,v,(.81,.12),(.89,.24)))
        line=max(0,min(1,(.009-dist)*size))
        pixels.extend((.78+.22*line,.94+.06*line,1,.045+.72*line))
img.pixels=pixels
img.filepath_raw=str(OUT/'GlassWindow_RGBA.png')
img.file_format='PNG'; img.save()
frame=bpy.data.materials.new('GlassWindow_PaleBlue_Frame'); frame.use_nodes=True
bs=frame.node_tree.nodes.get('Principled BSDF')
bs.inputs['Base Color'].default_value=(.46,.79,.88,1)
bs.inputs['Roughness'].default_value=.38
frame.diffuse_color=(.46,.79,.88,1)
glass=bpy.data.materials.new('GlassWindow_Transparent'); glass.use_nodes=True
bs=glass.node_tree.nodes.get('Principled BSDF')
bs.inputs['Roughness'].default_value=.25
bs.inputs['Alpha'].default_value=.045
glass.diffuse_color=(.78,.94,1,.045)
if hasattr(glass,'surface_render_method'): glass.surface_render_method='DITHERED'
tex=glass.node_tree.nodes.new('ShaderNodeTexImage'); tex.image=img
glass.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color'])
glass.node_tree.links.new(tex.outputs['Alpha'],bs.inputs['Alpha'])
mesh.materials.append(frame); mesh.materials.append(glass)
uv=mesh.uv_layers.new(name='UVMap')
for poly,m in zip(mesh.polygons,mats):
    poly.material_index=m
    for li in poly.loop_indices:
        p=mesh.vertices[mesh.loops[li].vertex_index].co
        uv.data[li].uv=(p.x+.5,p.z) if abs(poly.normal.y)>.5 else (.5,.5)
bm=bmesh.new(); bm.from_mesh(mesh)
assert all(e.is_manifold for e in bm.edges)
assert bm.calc_volume()>0
bm.free()
mesh.calc_loop_triangles()
triangles=len(mesh.loop_triangles)
bpy.ops.export_scene.fbx(filepath=str(OUT/'GlassWindow.fbx'),use_selection=True,
 object_types={'MESH'},axis_forward='-Z',axis_up='Y',apply_unit_scale=True,
 bake_space_transform=True,path_mode='COPY',embed_textures=True)
img.pack()
bpy.ops.wm.save_as_mainfile(filepath=str(PRE/'GlassWindow.blend'))

bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.fbx(filepath=str(OUT/'GlassWindow.fbx'))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
assert len(meshes)==1
obj=meshes[0]
points=[obj.matrix_world@Vector(p) for p in obj.bound_box]
dims=[max(p[i] for p in points)-min(p[i] for p in points) for i in range(3)]
assert all(abs(a-b)<.0001 for a,b in zip(dims,[1,.16,1]))
assert obj.matrix_world.translation.length<.0001
assert abs(min(p.z for p in points))<.0001
glassmat=next(m for m in obj.data.materials if 'Transparent' in m.name)
assert any(n.type=='TEX_IMAGE' and n.image and n.image.size[0]==128 for n in glassmat.node_tree.nodes)
assert glassmat.node_tree.nodes.get('Principled BSDF').inputs['Alpha'].is_linked
report={'dimensions_unity_xyz':[1,1,.16],'pivot':[0,0,0],
 'mesh_count':1,'triangles':triangles,'materials':2,'texture_size':[128,128],
 'manifold':True,'fbx_reimport_passed':True,'alpha_texture_connected':True}
(PRE/'validation.json').write_text(json.dumps(report,indent=2))

scene=bpy.context.scene
scene.render.engine='CYCLES'; scene.cycles.samples=48
scene.render.resolution_x=1100; scene.render.resolution_y=850
scene.render.resolution_percentage=100
scene.world.color=(.12,.16,.2)
scene.view_settings.view_transform='Standard'
scene.render.image_settings.file_format='PNG'
for name,loc,energy in [('Key',(-3,-4,5),260),('Fill',(3,-1,2),100)]:
    data=bpy.data.lights.new(name,'AREA'); data.energy=energy; data.size=4
    light=bpy.data.objects.new(name,data); bpy.context.collection.objects.link(light)
    light.location=loc
    light.rotation_euler=(Vector((0,0,.5))-light.location).to_track_quat('-Z','Y').to_euler()
data=bpy.data.cameras.new('Preview'); cam=bpy.data.objects.new('Preview',data)
bpy.context.collection.objects.link(cam); scene.camera=cam
data.type='ORTHO'; data.ortho_scale=1.6
cam.location=(.9,-3,1.45)
cam.rotation_euler=(Vector((0,0,.5))-cam.location).to_track_quat('-Z','Y').to_euler()
scene.render.filepath=str(PRE/'GlassWindow_Perspective.png')
bpy.ops.render.render(write_still=True)
cam.location=(0,0,4); cam.rotation_euler=(0,0,0)
scene.render.filepath=str(PRE/'GlassWindow_Top.png')
bpy.ops.render.render(write_still=True)
print('GLASS_RESULT '+json.dumps(report))
