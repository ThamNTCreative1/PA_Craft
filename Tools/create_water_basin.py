import bpy,bmesh,json
from pathlib import Path
from mathutils import Vector
ROOT=Path('F:/UnityProjects/CEBB_V13')
OUT=ROOT/'Assets/3D Models/Water Basin'
PRE=ROOT/'output/water-basin'; PRE.mkdir(parents=True,exist_ok=True)
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
xy=[-.5,-.36,-.25,.25,.36,.5]; zs=[0,.25,.4,1]
occupied={(i,j,k) for i in range(5) for j in range(5) for k in range(3)
 if (k==0 and i in (0,1,3,4) and j in (0,1,3,4))
 or k==1 or (k==2 and (i in (0,4) or j in (0,4)))}
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
mesh=bpy.data.meshes.new('WaterBasin_Mesh'); mesh.from_pydata(verts,[],faces); mesh.update()
bm=bmesh.new(); bm.from_mesh(mesh)
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
bmesh.ops.dissolve_limit(bm,angle_limit=.0001,verts=list(bm.verts),edges=list(bm.edges),use_dissolve_boundaries=True)
assert all(e.is_manifold for e in bm.edges)
assert bm.calc_volume()>0
bm.to_mesh(mesh); bm.free(); mesh.update()
obj=bpy.data.objects.new('WaterBasin',mesh); bpy.context.collection.objects.link(obj)
bpy.context.view_layer.objects.active=obj; obj.select_set(True)
stone=bpy.data.materials.new('Basin_WeatheredStone'); stone.use_nodes=True
bs=stone.node_tree.nodes.get('Principled BSDF'); bs.inputs['Roughness'].default_value=.88
img=bpy.data.images.load(str(OUT/'Basin_Albedo.png')); assert tuple(img.size)==(128,128)
tex=stone.node_tree.nodes.new('ShaderNodeTexImage'); tex.image=img
stone.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color']); mesh.materials.append(stone)
uv=mesh.uv_layers.new(name='UVMap')
for poly in mesh.polygons:
    for li in poly.loop_indices:
        p=mesh.vertices[mesh.loops[li].vertex_index].co
        if abs(poly.normal.z)>.5:
            coord=(p.x+.5,.96+.035*(p.y+.5)) if p.z>.99 else (p.x+.5,(p.y+.5)*.6)
        else:
            u=p.x+.5 if abs(poly.normal.y)>.5 else p.y+.5
            coord=(u,p.z)
        uv.data[li].uv=coord
# One planar water surface below the rim; no hidden water cube faces.
bpy.ops.mesh.primitive_plane_add(size=.72,location=(0,0,.98))
water=bpy.context.object; water.name='WaterSurface'
wm=bpy.data.materials.new('Basin_BlueWater'); wm.use_nodes=True
bs=wm.node_tree.nodes.get('Principled BSDF')
bs.inputs['Base Color'].default_value=(.045,.32,.8,1)
bs.inputs['Alpha'].default_value=.55
if hasattr(wm,'surface_render_method'): wm.surface_render_method='DITHERED'
bs.inputs['Roughness'].default_value=.3
wm.diffuse_color=(.045,.32,.8,.55)
water.data.materials.append(wm)
obj.select_set(True); bpy.context.view_layer.objects.active=obj
bpy.ops.object.join(); mesh=obj.data; mesh.calc_loop_triangles(); tris=len(mesh.loop_triangles)
assert obj.location.length<.0001
# Check that the only open edges belong to the four water boundaries.
bm=bmesh.new(); bm.from_mesh(mesh)
assert sum(e.is_boundary for e in bm.edges)==4
bm.free()
bpy.ops.export_scene.fbx(filepath=str(OUT/'WaterBasin.fbx'),use_selection=True,object_types={'MESH'},axis_forward='-Z',axis_up='Y',apply_unit_scale=True,bake_space_transform=True,path_mode='COPY',embed_textures=True)
bpy.ops.export_scene.gltf(filepath=str(OUT/'WaterBasin.glb'),export_format='GLB',use_selection=True)
img.pack(); bpy.ops.wm.save_as_mainfile(filepath=str(PRE/'WaterBasin.blend'))
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.fbx(filepath=str(OUT/'WaterBasin.fbx'))
objects=[o for o in bpy.context.scene.objects if o.type=='MESH']; assert len(objects)==1
obj=objects[0]; points=[obj.matrix_world@Vector(p) for p in obj.bound_box]
dims=[max(p[i] for p in points)-min(p[i] for p in points) for i in range(3)]
assert all(abs(a-b)<.0001 for a,b in zip(dims,[1,1,1]))
assert obj.matrix_world.translation.length<.0001 and abs(min(p.z for p in points))<.0001
assert any(n.type=='TEX_IMAGE' and n.image and n.image.size[0]==128 for m in obj.data.materials for n in m.node_tree.nodes)
water_material=next(m for m in obj.data.materials if 'BlueWater' in m.name)
assert abs(water_material.node_tree.nodes.get('Principled BSDF').inputs['Alpha'].default_value-.55)<.01
water_faces=[p for p in obj.data.polygons if obj.data.materials[p.material_index]==water_material]
assert water_faces and all(abs((obj.matrix_world @ obj.data.vertices[v].co).z-.98)<.0001 for p in water_faces for v in p.vertices)
report={'dimensions_unity_xyz':[1,1,1],'feet_dimensions':[.25,.25,.25],'wall_thickness':.14,'cavity_width':.72,'water_height':.98,'water_opacity':.55,'pivot':[0,0,0],'triangles':tris,'mesh_count':1,'materials':2,'texture':[128,128],'fbx_reimport_passed':True,'shell_manifold':True}
(PRE/'validation.json').write_text(json.dumps(report,indent=2))
scene=bpy.context.scene; scene.render.engine='CYCLES'; scene.cycles.samples=32
scene.render.resolution_x=1000; scene.render.resolution_y=1000; scene.render.resolution_percentage=100
scene.world.color=(.2,.2,.2); scene.view_settings.view_transform='Standard'
scene.render.image_settings.file_format='PNG'
for name,loc,power in [('Key',(-3,-4,5),260),('Fill',(3,-1,3),120)]:
    data=bpy.data.lights.new(name,'AREA'); data.energy=power; data.size=4
    light=bpy.data.objects.new(name,data); bpy.context.collection.objects.link(light); light.location=loc
    light.rotation_euler=(Vector((0,0,.5))-light.location).to_track_quat('-Z','Y').to_euler()
data=bpy.data.cameras.new('Preview'); cam=bpy.data.objects.new('Preview',data)
bpy.context.collection.objects.link(cam); scene.camera=cam; data.type='ORTHO'; data.ortho_scale=1.85
cam.location=(1.8,-3,2.6); cam.rotation_euler=(Vector((0,0,.5))-cam.location).to_track_quat('-Z','Y').to_euler()
scene.render.filepath=str(PRE/'WaterBasin_Perspective.png'); bpy.ops.render.render(write_still=True)
cam.location=(0,0,4); cam.rotation_euler=(0,0,0); data.ortho_scale=1.35
scene.render.filepath=str(PRE/'WaterBasin_Top.png'); bpy.ops.render.render(write_still=True)
print('BASIN_RESULT '+json.dumps(report))
