import bpy, bmesh, json
from pathlib import Path
from mathutils import Vector
ROOT=Path('F:/UnityProjects/CEBB_V13')
OUT=ROOT/'Assets/3D Models/Pink Roof'
PRE=ROOT/'output/pink-roof'; PRE.mkdir(parents=True,exist_ok=True)
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
# Equal 3x3 openings in the 0.5 m centre, separated by 0.02 m strips.
hole=(.5-.04)/3
a=-.25+hole; b=a+.02; c=b+hole; d=c+.02
xy=[-.5,-.25,a,b,c,d,.25,.5]
zs=[0,.115,.135,.25]
occupied={(i,j,k) for i in range(7) for j in range(7) for k in range(3)
 if i in (0,6) or j in (0,6) or (k==1 and (i in (2,4) or j in (2,4)))}
verts=[]; faces=[]; lookup={}
def face(points):
    ids=[]
    for p in points:
        if p not in lookup: lookup[p]=len(verts); verts.append(p)
        ids.append(lookup[p])
    faces.append(ids)
for i,j,k in sorted(occupied):
    x,X=xy[i:i+2]; y,Y=xy[j:j+2]; z,Z=zs[k:k+2]
    if (i-1,j,k) not in occupied: face([(x,y,z),(x,y,Z),(x,Y,Z),(x,Y,z)])
    if (i+1,j,k) not in occupied: face([(X,Y,z),(X,Y,Z),(X,y,Z),(X,y,z)])
    if (i,j-1,k) not in occupied: face([(X,y,z),(X,y,Z),(x,y,Z),(x,y,z)])
    if (i,j+1,k) not in occupied: face([(x,Y,z),(x,Y,Z),(X,Y,Z),(X,Y,z)])
    if (i,j,k-1) not in occupied: face([(x,Y,z),(X,Y,z),(X,y,z),(x,y,z)])
    if (i,j,k+1) not in occupied: face([(x,y,Z),(X,y,Z),(X,Y,Z),(x,Y,Z)])
mesh=bpy.data.meshes.new('PinkRoof_Mesh'); mesh.from_pydata(verts,[],faces); mesh.update()
bm=bmesh.new(); bm.from_mesh(mesh)
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
# Merge redundant coplanar grid faces before triangulation/export.
bmesh.ops.dissolve_limit(bm,angle_limit=.0001,verts=list(bm.verts),edges=list(bm.edges),use_dissolve_boundaries=False)
assert all(e.is_manifold for e in bm.edges)
assert bm.calc_volume()>0
# Connected closed surface with nine handles = nine through openings.
assert len(bm.verts)-len(bm.edges)+len(bm.faces)==2-2*9
bm.to_mesh(mesh); bm.free(); mesh.update()
obj=bpy.data.objects.new('PinkRoof',mesh); bpy.context.collection.objects.link(obj)
bpy.context.view_layer.objects.active=obj; obj.select_set(True)
uv=mesh.uv_layers.new(name='UVMap')
for poly in mesh.polygons:
    for li in poly.loop_indices:
        p=mesh.vertices[mesh.loops[li].vertex_index].co
        if abs(poly.normal.z)>.5: coord=(p.x+.5,p.y+.5)
        elif abs(poly.normal.y)>.5: coord=(p.x+.5,p.z/.25)
        else: coord=(p.y+.5,p.z/.25)
        uv.data[li].uv=coord
mat=bpy.data.materials.new('PinkRoof_CherryWood'); mat.use_nodes=True
bs=mat.node_tree.nodes.get('Principled BSDF'); bs.inputs['Roughness'].default_value=.8
img=bpy.data.images.load(str(OUT/'PinkRoof_Albedo.png')); assert tuple(img.size)==(128,128)
tex=mat.node_tree.nodes.new('ShaderNodeTexImage'); tex.image=img
mat.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color']); mesh.materials.append(mat)
mesh.calc_loop_triangles(); tris=len(mesh.loop_triangles)
bpy.ops.export_scene.fbx(filepath=str(OUT/'PinkRoof.fbx'),use_selection=True,object_types={'MESH'},axis_forward='-Z',axis_up='Y',apply_unit_scale=True,bake_space_transform=True,path_mode='COPY',embed_textures=True)
bpy.ops.export_scene.gltf(filepath=str(OUT/'PinkRoof.glb'),export_format='GLB',use_selection=True)
img.pack(); bpy.ops.wm.save_as_mainfile(filepath=str(PRE/'PinkRoof.blend'))
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.fbx(filepath=str(OUT/'PinkRoof.fbx'))
objects=[o for o in bpy.context.scene.objects if o.type=='MESH']; assert len(objects)==1
obj=objects[0]; points=[obj.matrix_world@Vector(p) for p in obj.bound_box]
dims=[max(p[i] for p in points)-min(p[i] for p in points) for i in range(3)]
assert all(abs(a-b)<.0001 for a,b in zip(dims,[1,1,.25]))
assert obj.matrix_world.translation.length<.0001 and abs(min(p.z for p in points))<.0001
assert any(n.type=='TEX_IMAGE' and n.image and n.image.size[0]==128 for n in obj.data.materials[0].node_tree.nodes)
report={'dimensions_unity_xyz':[1,.25,1],'pivot':[0,0,0],'triangles':tris,'mesh_count':1,'materials':1,'openings':9,'frame_width':.25,'grid_width':.02,'grid_thickness':.02,'texture':[128,128],'fbx_reimport_passed':True,'manifold':True}
(PRE/'validation.json').write_text(json.dumps(report,indent=2))
scene=bpy.context.scene; scene.render.engine='CYCLES'; scene.cycles.samples=32
scene.render.resolution_x=1000; scene.render.resolution_y=900; scene.render.resolution_percentage=100
scene.world.color=(.2,.2,.2); scene.view_settings.view_transform='Standard'
scene.render.image_settings.file_format='PNG'
for name,loc,energy in [('Key',(-3,-4,5),260),('Fill',(3,-1,3),110)]:
    data=bpy.data.lights.new(name,'AREA'); data.energy=energy; data.size=4
    light=bpy.data.objects.new(name,data); bpy.context.collection.objects.link(light); light.location=loc
    light.rotation_euler=(Vector((0,0,.125))-light.location).to_track_quat('-Z','Y').to_euler()
data=bpy.data.cameras.new('Preview'); cam=bpy.data.objects.new('Preview',data)
bpy.context.collection.objects.link(cam); scene.camera=cam; data.type='ORTHO'; data.ortho_scale=1.6
cam.location=(.8,-2,2.7); cam.rotation_euler=(Vector((0,0,.125))-cam.location).to_track_quat('-Z','Y').to_euler()
scene.render.filepath=str(PRE/'PinkRoof_Perspective.png'); bpy.ops.render.render(write_still=True)
cam.location=(0,0,4); cam.rotation_euler=(0,0,0); data.ortho_scale=1.35
scene.render.filepath=str(PRE/'PinkRoof_Top.png'); bpy.ops.render.render(write_still=True)
print('ROOF_RESULT '+json.dumps(report))
