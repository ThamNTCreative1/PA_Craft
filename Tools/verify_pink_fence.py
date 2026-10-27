import bpy
import json
from pathlib import Path
from mathutils import Vector

root = Path('F:/UnityProjects/CEBB_V13')
results = []
for ext in ('glb', 'fbx'):
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    path = root / 'Assets/3D Models/Pink Fence' / ('PinkFence.' + ext)
    if ext == 'glb':
        bpy.ops.import_scene.gltf(filepath=str(path))
    else:
        bpy.ops.import_scene.fbx(filepath=str(path))
    objects = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    assert len(objects) == 1
    obj = objects[0]
    points = [obj.matrix_world @ Vector(p) for p in obj.bound_box]
    lo = [min(p[i] for p in points) for i in range(3)]
    hi = [max(p[i] for p in points) for i in range(3)]
    dims = [hi[i]-lo[i] for i in range(3)]
    assert all(abs(a-b) < .0001 for a,b in zip(dims,[1,.16,.75])), dims
    assert abs(lo[2]) < .0001
    assert obj.matrix_world.translation.length < .0001
    assert len(obj.data.materials) == 1
    images = [n.image for n in obj.data.materials[0].node_tree.nodes
              if n.type == 'TEX_IMAGE' and n.image]
    assert images and all(im.size[0] > 0 for im in images)
    results.append({'format':ext,'mesh_count':1,'dimensions_blender':dims,
                    'bottom_z':lo[2],'origin':list(obj.matrix_world.translation),
                    'texture_loaded':True})
print('ROUNDTRIP ' + json.dumps(results))
(root/'output/pink-fence/roundtrip.json').write_text(json.dumps(results,indent=2))
