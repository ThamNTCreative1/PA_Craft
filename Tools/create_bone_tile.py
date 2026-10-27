import bpy,bmesh,json
from pathlib import Path
from mathutils import Vector
ROOT=Path('F:/UnityProjects/CEBB_V13'); OUT=ROOT/'Assets/3D Models/Bone Decor Tile'; PRE=ROOT/'output/bone-decor-tile'
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
# Closed tray with a 0.08 m rim and recessed floor at 0.045 m.
verts=[]; faces=[]
for half,z in [(.4,0),(.4,.1),(.32,.1),(.32,.045)]:
    verts.extend([(-half,-half,z),(half,-half,z),(half,half,z),(-half,half,z)])
faces.append((3,2,1,0))
for a,b in [(0,4),(4,8),(8,12)]:
    for i in range(4):
        j=(i+1)%4; faces.append((a+i,a+j,b+j,b+i))
faces.append((12,13,14,15))
mesh=bpy.data.meshes.new('BoneTileMesh'); mesh.from_pydata(verts,[],faces); mesh.update()
obj=bpy.data.objects.new('BoneDecorTile',mesh); bpy.context.collection.objects.link(obj)
bpy.context.view_layer.objects.active=obj; obj.select_set(True)
bm=bmesh.new(); bm.from_mesh(mesh); bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces)); bm.to_mesh(mesh); bm.free()
# Extruded bone silhouette, four rounded low-poly lobes, 0.50 m long.
outline=[(-.25,0),(-.262,.025),(-.257,.055),(-.235,.077),(-.207,.08),(-.18,.064),(-.14,.037),(.14,.037),(.18,.064),(.207,.08),(.235,.077),(.257,.055),(.262,.025),(.25,0),(.262,-.025),(.257,-.055),(.235,-.077),(.207,-.08),(.18,-.064),(.14,-.037),(-.14,-.037),(-.18,-.064),(-.207,-.08),(-.235,-.077),(-.257,-.055),(-.262,-.025)]
n=len(outline); bv=[(x,y,z) for z in [.035,.1] for x,y in outline]
bf=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
mesh=bpy.data.meshes.new('BoneRelief'); mesh.from_pydata(bv,[],bf); mesh.update()
bm=bmesh.new(); bm.from_mesh(mesh); bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces)); bm.to_mesh(mesh); bm.free()
bone=bpy.data.objects.new('BoneRelief',mesh); bpy.context.collection.objects.link(bone)
mod=obj.modifiers.new('UnionRelief','BOOLEAN'); mod.operation='UNION'; mod.solver='EXACT'; mod.object=bone
bpy.ops.object.modifier_apply(modifier=mod.name); bpy.data.objects.remove(bone,do_unlink=True)
bm=bmesh.new(); bm.from_mesh(obj.data)
bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001)
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
assert all(e.is_manifold for e in bm.edges) and bm.calc_volume()>0
bm.to_mesh(obj.data); bm.free(); obj.data.update()
mat=bpy.data.materials.new('BoneTile_PixelAtlas'); mat.use_nodes=True
bs=mat.node_tree.nodes.get('Principled BSDF'); bs.inputs['Roughness'].default_value=.85
img=bpy.data.images.load(str(OUT/'BoneTile_Albedo.png')); assert tuple(img.size)==(128,128)
tex=mat.node_tree.nodes.new('ShaderNodeTexImage'); tex.image=img; tex.interpolation='Closest'
mat.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color']); obj.data.materials.append(mat)
uv=obj.data.uv_layers.new(name='UVMap')
for p in obj.data.polygons:
    c=p.center
    is_bone=abs(c.x)<.28 and abs(c.y)<.09 and c.z>.046
    is_floor=abs(c.z-.045)<.00001 and p.normal.z>.5
    for li in p.loop_indices:
        co=obj.data.vertices[obj.data.loops[li].vertex_index].co
        if is_floor: ox,oy=0,.5; u,v=(co.x+.32)/.64,(co.y+.32)/.64
        elif is_bone: ox,oy=0,0; u,v=(co.x+.28)/.56,(co.y+.09)/.18
        else: ox,oy=.5,.5; u,v=(co.x+.4)/.8,(co.y+.4)/.8
        uv.data[li].uv=(ox+.006+u*.488,oy+.006+v*.488)
obj.data.calc_loop_triangles(); tris=len(obj.data.loop_triangles)
bpy.ops.export_scene.fbx(filepath=str(OUT/'BoneDecorTile.fbx'),use_selection=True,object_types={'MESH'},axis_forward='-Z',axis_up='Y',apply_unit_scale=True,bake_space_transform=True,path_mode='COPY',embed_textures=True)
bpy.ops.export_scene.gltf(filepath=str(OUT/'BoneDecorTile.glb'),export_format='GLB',use_selection=True)
img.pack(); bpy.ops.wm.save_as_mainfile(filepath=str(PRE/'BoneDecorTile.blend'))
bpy.ops.object.delete(use_global=False); bpy.ops.import_scene.fbx(filepath=str(OUT/'BoneDecorTile.fbx'))
objects=[o for o in bpy.context.scene.objects if o.type=='MESH']; assert len(objects)==1
obj=objects[0]; points=[obj.matrix_world@v.co for v in obj.data.vertices]
assert all(abs(max(p[i] for p in points)-min(p[i] for p in points)-d)<1e-5 for i,d in enumerate([.8,.8,.1]))
assert obj.matrix_world.translation.length<1e-5 and abs(min(p.z for p in points))<1e-5
for m in obj.data.materials:
    for node in m.node_tree.nodes:
        if node.type=='TEX_IMAGE': node.interpolation='Closest'
report={'unity_dimensions_xyz':[.8,.1,.8],'rim_width':.08,'recess_floor_height':.045,'bone_top_height':.1,'triangles':tris,'mesh_count':1,'manifold':True,'texture':[128,128],'fbx_reimport_passed':True}
(PRE/'validation.json').write_text(json.dumps(report,indent=2))
scene=bpy.context.scene; scene.render.engine='CYCLES'; scene.cycles.samples=32
scene.render.resolution_x=1000; scene.render.resolution_y=1000; scene.render.resolution_percentage=100
scene.world.color=(.25,.25,.25); scene.view_settings.view_transform='Standard'; scene.render.image_settings.file_format='PNG'
for name,loc,power in [('Key',(-3,-4,5),400),('Fill',(3,-1,3),170)]:
    data=bpy.data.lights.new(name,'AREA'); data.energy=power; data.size=3
    light=bpy.data.objects.new(name,data); bpy.context.collection.objects.link(light); light.location=loc
    light.rotation_euler=(Vector((0,0,0))-light.location).to_track_quat('-Z','Y').to_euler()
data=bpy.data.cameras.new('Preview'); cam=bpy.data.objects.new('Preview',data); bpy.context.collection.objects.link(cam); scene.camera=cam
data.type='ORTHO'; data.ortho_scale=1.15; cam.location=(.2,-1.6,2.4)
cam.rotation_euler=(Vector((0,0,.04))-cam.location).to_track_quat('-Z','Y').to_euler()
scene.render.filepath=str(PRE/'BoneTile_Perspective.png'); bpy.ops.render.render(write_still=True)
cam.location=(0,0,4); cam.rotation_euler=(0,0,0); data.ortho_scale=1.05
scene.render.filepath=str(PRE/'BoneTile_Top.png'); bpy.ops.render.render(write_still=True)
print('BONE_TILE_VALIDATED '+json.dumps(report))
