import bpy
import bmesh
import json
import shutil
from pathlib import Path
from mathutils import Vector

PROJECT = Path('F:/UnityProjects/CEBB_V13')
OUT = PROJECT / 'Assets/3D Models/Pink Fence'
PREVIEW = PROJECT / 'output/pink-fence'
OUT.mkdir(parents=True, exist_ok=True)
PREVIEW.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# A single watertight boundary mesh of the union of the five wooden members.
# Blender Z becomes Unity/glTF Y. Origin is the centre of the bottom surface.
xs = [-.5, -.375, -.125, .125, .375, .5]
# Rails inset 0.1 m from the ends, including the additional 0.025 m shift.
zs = [0, .1, .2875, .4625, .65, .75]
occupied = {(i, j) for i in range(5) for j in range(5)
             if i in (0, 4) or j in (1, 3) or (i == 2 and j == 2)}
verts, faces, lookup = [], [], {}
def face(points):
    indices = []
    for point in points:
        if point not in lookup:
            lookup[point] = len(verts)
            verts.append(point)
        indices.append(lookup[point])
    faces.append(indices)

for i, j in sorted(occupied):
    a, b, c, d = xs[i], xs[i+1], zs[j], zs[j+1]
    face([(a,-.1,c),(b,-.1,c),(b,-.1,d),(a,-.1,d)])
    face([(b,.1,c),(a,.1,c),(a,.1,d),(b,.1,d)])
    if (i-1,j) not in occupied:
        face([(a,.1,c),(a,-.1,c),(a,-.1,d),(a,.1,d)])
    if (i+1,j) not in occupied:
        face([(b,-.1,c),(b,.1,c),(b,.1,d),(b,-.1,d)])
    if (i,j-1) not in occupied:
        face([(a,.1,c),(b,.1,c),(b,-.1,c),(a,-.1,c)])
    if (i,j+1) not in occupied:
        face([(a,-.1,d),(b,-.1,d),(b,.1,d),(a,.1,d)])

mesh = bpy.data.meshes.new('PinkFence_Mesh')
mesh.from_pydata(verts, [], faces)
mesh.update()
bm = bmesh.new()
bm.from_mesh(mesh)
bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
assert all(e.is_manifold for e in bm.edges), 'Non-manifold mesh'
assert bm.calc_volume() > 0, 'Inverted normals'
bm.to_mesh(mesh)
bm.free()
obj = bpy.data.objects.new('PinkFence', mesh)
bpy.context.collection.objects.link(obj)
bpy.context.view_layer.objects.active = obj
obj.select_set(True)

texture_path = OUT / 'PinkFence_Wood.png'
img = bpy.data.images.load(str(texture_path))
mat = bpy.data.materials.new('PinkFence_Wood')
mat.use_nodes = True
bsdf = mat.node_tree.nodes.get('Principled BSDF')
bsdf.inputs['Roughness'].default_value = .78
tex = mat.node_tree.nodes.new('ShaderNodeTexImage')
tex.image = img
tex.interpolation = 'Linear'
mat.node_tree.links.new(tex.outputs['Color'], bsdf.inputs['Base Color'])
obj.data.materials.append(mat)

# Sample the interior of a plank: no dark seams, no painted holes.
# Grain runs along the horizontal rails and vertically along the upright pieces.
uv = mesh.uv_layers.new(name='UVMap')
for poly in mesh.polygons:
    center = poly.center
    upright = abs(center.x) > .375 or (abs(center.x) < .126 and .2875 < center.z < .4625)
    for li in poly.loop_indices:
        p = mesh.vertices[mesh.loops[li].vertex_index].co
        if abs(poly.normal.y) > .5:
            u, v = ((p.z/.75, (p.x+.5)) if upright else (p.x+.5, p.z/.75))
        elif abs(poly.normal.x) > .5:
            u, v = p.z/.75, (p.y+.1)/.2
        else:
            u, v = p.x+.5, (p.y+.1)/.2
        uv.data[li].uv = (u, v)

# Bake 80% depth into the mesh after UV mapping, keeping the texture layout
# and centred floor pivot unchanged. Exported object scale remains identity.
for vertex in mesh.vertices:
    vertex.co.y *= .8
mesh.update()
mesh.calc_loop_triangles()
report = {'object': obj.name, 'dimensions_unity_xyz': [1,.75,.16],
          'pivot_unity_xyz': [0,0,0], 'vertices': len(mesh.vertices),
          'triangles': len(mesh.loop_triangles), 'materials': 1,
          'openings': 2, 'opening_width': .25, 'opening_height': .175,
          'rail_inset': .1, 'center_separator_height': .175,
          'watertight_manifold': True, 'internal_faces': 0}
(PREVIEW / 'validation.json').write_text(json.dumps(report, indent=2))
bpy.ops.export_scene.gltf(filepath=str(OUT/'PinkFence.glb'), export_format='GLB',
                          use_selection=True, export_yup=True)
bpy.ops.export_scene.fbx(filepath=str(OUT/'PinkFence.fbx'), use_selection=True,
                         object_types={'MESH'}, axis_forward='-Z', axis_up='Y',
                         apply_unit_scale=True, bake_space_transform=True,
                         path_mode='COPY', embed_textures=True, use_mesh_modifiers=True)
img.pack()
bpy.ops.wm.save_as_mainfile(filepath=str(PREVIEW/'PinkFence.blend'))

scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 32
scene.render.resolution_x = 1100
scene.render.resolution_y = 850
scene.render.resolution_percentage = 100
scene.world.color = (.22,.22,.22)
scene.view_settings.view_transform = 'Standard'
scene.view_settings.look = 'Medium High Contrast' if 'Medium High Contrast' in [] else 'None'
scene.view_settings.exposure = 0
scene.render.image_settings.file_format = 'PNG'
scene.render.film_transparent = False
def area(name, location, energy, size):
    data = bpy.data.lights.new(name, 'AREA')
    data.energy, data.shape, data.size = energy, 'DISK', size
    light = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(light)
    light.location = location
    light.rotation_euler = (Vector((0,0,.375))-light.location).to_track_quat('-Z','Y').to_euler()
area('Key',(-2,-3,4),200,4)
area('Fill',(3,-1,2),90,3)
data = bpy.data.cameras.new('PreviewCamera')
cam = bpy.data.objects.new('PreviewCamera',data)
bpy.context.collection.objects.link(cam)
scene.camera = cam
data.type = 'ORTHO'
data.ortho_scale = 1.40
cam.location = (1.0,-3.5,1.35)
cam.rotation_euler = (Vector((0,0,.375))-cam.location).to_track_quat('-Z','Y').to_euler()
scene.render.filepath = str(PREVIEW/'PinkFence_Perspective.png')
bpy.ops.render.render(write_still=True)
cam.location = (0,0,4)
cam.rotation_euler = (0,0,0)
scene.render.filepath = str(PREVIEW/'PinkFence_Top.png')
bpy.ops.render.render(write_still=True)
print('FENCE_RESULT ' + json.dumps(report))
