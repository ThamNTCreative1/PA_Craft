import bpy
import bmesh
import json
from pathlib import Path
from mathutils import Vector

ROOT = Path('F:/UnityProjects/CEBB_V13')
OUT = ROOT/'Assets/3D Models/Gray Stone Block'
PREVIEW = ROOT/'output/gray-stone-block'
PREVIEW.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0,0,.5))
obj = bpy.context.object
obj.name = 'GrayStoneBlock'
obj.dimensions = (.5,.5,1)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
bpy.context.scene.cursor.location = (0,0,0)
bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
mesh = obj.data
mesh.name = 'GrayStoneBlock_Mesh'
uv = mesh.uv_layers.active
for poly in mesh.polygons:
    for li in poly.loop_indices:
        p = mesh.vertices[mesh.loops[li].vertex_index].co
        if abs(poly.normal.z) > .5:
            # Top uses two stone tiles. Bottom uses a solid tile.
            u = (p.x+.25)*2
            v = (p.y+.25)*2
            uv.data[li].uv = (.002 + .496*u, .002 + .496*v) if poly.normal.z > 0 else (.502+.496*u,.002+.496*v)
        else:
            if poly.normal.y < -.5: u = (p.x+.25)*2
            elif poly.normal.y > .5: u = (.25-p.x)*2
            elif poly.normal.x > .5: u = (p.y+.25)*2
            else: u = (.25-p.y)*2
            # Left atlas half: large upper stone, two smaller lower stones.
            uv.data[li].uv = (.002+.496*u, .002+.996*p.z)
mat = bpy.data.materials.new('GrayStone_Rough')
mat.use_nodes = True
shader = mat.node_tree.nodes.get('Principled BSDF')
shader.inputs['Roughness'].default_value = .9
image = bpy.data.images.load(str(OUT/'GrayStone_Albedo.png'))
tex = mat.node_tree.nodes.new('ShaderNodeTexImage')
tex.image = image
mat.node_tree.links.new(tex.outputs['Color'],shader.inputs['Base Color'])
mesh.materials.append(mat)
bm=bmesh.new()
bm.from_mesh(mesh)
assert all(e.is_manifold for e in bm.edges)
assert bm.calc_volume() > 0
bm.free()
mesh.calc_loop_triangles()
assert len(mesh.loop_triangles)==12
bpy.ops.export_scene.fbx(filepath=str(OUT/'GrayStoneBlock.fbx'),use_selection=True,
    object_types={'MESH'},axis_forward='-Z',axis_up='Y',apply_unit_scale=True,
    bake_space_transform=True,path_mode='COPY',embed_textures=True)
image.pack()
bpy.ops.wm.save_as_mainfile(filepath=str(PREVIEW/'GrayStoneBlock.blend'))

# Validate the delivered FBX, then render the imported object itself.
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.fbx(filepath=str(OUT/'GrayStoneBlock.fbx'))
objects=[o for o in bpy.context.scene.objects if o.type=='MESH']
assert len(objects)==1
obj=objects[0]
points=[obj.matrix_world @ Vector(p) for p in obj.bound_box]
lo=[min(p[i] for p in points) for i in range(3)]
hi=[max(p[i] for p in points) for i in range(3)]
dims=[hi[i]-lo[i] for i in range(3)]
assert all(abs(a-b)<.0001 for a,b in zip(dims,[.5,.5,1]))
assert abs(lo[2])<.0001 and obj.matrix_world.translation.length<.0001
assert any(n.type=='TEX_IMAGE' and n.image and n.image.size[0]>0 for n in obj.data.materials[0].node_tree.nodes)
report={'dimensions_unity_xyz':[.5,1,.5],'pivot':[0,0,0],'triangles':12,'mesh_count':1,'material_count':1,'fbx_reimport_passed':True,'manifold':True}
(PREVIEW/'validation.json').write_text(json.dumps(report,indent=2))
scene=bpy.context.scene
scene.render.engine='CYCLES'
scene.cycles.samples=32
scene.render.resolution_x=900
scene.render.resolution_y=1000
scene.render.resolution_percentage=100
scene.world.color=(.24,.24,.24)
scene.view_settings.view_transform='Standard'
scene.render.image_settings.file_format='PNG'
for name,loc,power,size in [('Key',(-3,-4,5),270,4),('Fill',(3,-1,3),110,3)]:
    data=bpy.data.lights.new(name,'AREA')
    data.energy=power
    data.size=size
    light=bpy.data.objects.new(name,data)
    bpy.context.collection.objects.link(light)
    light.location=loc
    light.rotation_euler=(Vector((0,0,.5))-light.location).to_track_quat('-Z','Y').to_euler()
data=bpy.data.cameras.new('Preview')
cam=bpy.data.objects.new('Preview',data)
bpy.context.collection.objects.link(cam)
scene.camera=cam
data.type='ORTHO'
data.ortho_scale=1.55
cam.location=(1.6,-2.5,2.2)
cam.rotation_euler=(Vector((0,0,.5))-cam.location).to_track_quat('-Z','Y').to_euler()
scene.render.filepath=str(PREVIEW/'GrayStone_Perspective.png')
bpy.ops.render.render(write_still=True)
cam.location=(0,0,4)
cam.rotation_euler=(0,0,0)
data.ortho_scale=.85
scene.render.resolution_y=900
scene.render.filepath=str(PREVIEW/'GrayStone_Top.png')
bpy.ops.render.render(write_still=True)
print('STONE_RESULT '+json.dumps(report))
