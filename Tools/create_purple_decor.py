import bpy, bmesh, json
from pathlib import Path
from mathutils import Vector

ROOT=Path('F:/UnityProjects/CEBB_V13')
OUT=ROOT/'Assets/3D Models/Purple Decor Block'
PRE=ROOT/'output/purple-decor-block'
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0,0,.5))
obj=bpy.context.object
obj.name='PurpleDecorBlock'
bpy.context.scene.cursor.location=(0,0,0)
bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
mat=bpy.data.materials.new('PurpleDecor_PixelStone'); mat.use_nodes=True
bs=mat.node_tree.nodes.get('Principled BSDF')
bs.inputs['Roughness'].default_value=.8
img=bpy.data.images.load(str(OUT/'PurpleDecor_Albedo.png'))
assert tuple(img.size)==(128,128)
tex=mat.node_tree.nodes.new('ShaderNodeTexImage'); tex.image=img; tex.interpolation='Closest'
mat.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color'])
obj.data.materials.append(mat)
uv=obj.data.uv_layers.active
for face in obj.data.polygons:
    top=face.normal.z>.5; bottom=face.normal.z<-.5
    for li in face.loop_indices:
        p=obj.data.vertices[obj.data.loops[li].vertex_index].co
        if top or bottom:
            u=p.x+.5; v=p.y+.5
            ox=.5; oy=.5 if top else 0
        else:
            u=p.x+.5 if face.normal.y<-.5 else .5-p.x if face.normal.y>.5 else p.y+.5 if face.normal.x>.5 else .5-p.y
            v=p.z; ox=0; oy=.5
        # Half-texel padding prevents neighboring atlas tiles bleeding.
        uv.data[li].uv=(ox+(.5/128)+u*(.5-1/128),oy+(.5/128)+v*(.5-1/128))
bm=bmesh.new(); bm.from_mesh(obj.data)
assert all(e.is_manifold for e in bm.edges) and abs(bm.calc_volume()-1)<1e-6
bm.free()
obj.data.calc_loop_triangles(); assert len(obj.data.loop_triangles)==12
bpy.ops.export_scene.fbx(filepath=str(OUT/'PurpleDecorBlock.fbx'),use_selection=True,object_types={'MESH'},axis_forward='-Z',axis_up='Y',apply_unit_scale=True,bake_space_transform=True,path_mode='COPY',embed_textures=True)
bpy.ops.export_scene.gltf(filepath=str(OUT/'PurpleDecorBlock.glb'),export_format='GLB',use_selection=True)
img.pack()
bpy.ops.wm.save_as_mainfile(filepath=str(PRE/'PurpleDecorBlock.blend'))
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.fbx(filepath=str(OUT/'PurpleDecorBlock.fbx'))
objects=[o for o in bpy.context.scene.objects if o.type=='MESH']; assert len(objects)==1
obj=objects[0]
points=[obj.matrix_world@v.co for v in obj.data.vertices]
assert all(abs(max(p[i] for p in points)-min(p[i] for p in points)-1)<1e-5 for i in range(3))
assert obj.matrix_world.translation.length<1e-5 and abs(min(p.z for p in points))<1e-5
for m in obj.data.materials:
    for n in m.node_tree.nodes:
        if n.type=='TEX_IMAGE': n.interpolation='Closest'
(PRE/'validation.json').write_text(json.dumps({'dimensions':[1,1,1],'pivot':[0,0,0],'mesh_count':1,'triangles':12,'texture':[128,128],'manifold':True,'fbx_reimport_passed':True},indent=2))
scene=bpy.context.scene; scene.render.engine='CYCLES'; scene.cycles.samples=32
scene.render.resolution_x=1000; scene.render.resolution_y=1000; scene.render.resolution_percentage=100
scene.world.color=(.25,.25,.25); scene.view_settings.view_transform='Standard'
scene.render.image_settings.file_format='PNG'
for name,loc,power in [('Key',(-3,-4,5),350),('Fill',(3,-1,3),180)]:
    data=bpy.data.lights.new(name,'AREA'); data.energy=power; data.size=4
    light=bpy.data.objects.new(name,data); bpy.context.collection.objects.link(light); light.location=loc
    light.rotation_euler=(Vector((0,0,.5))-light.location).to_track_quat('-Z','Y').to_euler()
data=bpy.data.cameras.new('Preview'); cam=bpy.data.objects.new('Preview',data)
bpy.context.collection.objects.link(cam); scene.camera=cam; data.type='ORTHO'; data.ortho_scale=1.8
cam.location=(.6,-3,2.3); cam.rotation_euler=(Vector((0,0,.5))-cam.location).to_track_quat('-Z','Y').to_euler()
scene.render.filepath=str(PRE/'PurpleDecor_Perspective.png'); bpy.ops.render.render(write_still=True)
cam.location=(0,0,4); cam.rotation_euler=(0,0,0); data.ortho_scale=1.3
scene.render.filepath=str(PRE/'PurpleDecor_Top.png'); bpy.ops.render.render(write_still=True)
print('PURPLE_DECOR_VALIDATED')
