import bpy, os
from mathutils import Vector
base=r'D:/Source/PA_Craft/Assets/_Playable/CherryForest'
for folder,filename,out in [('CherryTree','scene.gltf','CherryTree'),('Blossom','cherry-blossom-tree.glb','BlossomTree'),('Mansion','sakura-mansion.glb','SakuraMansion'),('Pickaxe','sakura-pickaxe.glb','SakuraPickaxe')]:
 bpy.ops.wm.read_factory_settings(use_empty=True)
 bpy.ops.import_scene.gltf(filepath=os.path.join(base,'Source',folder,filename))
 meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
 coords=[o.matrix_world@Vector(v) for o in meshes for v in o.bound_box]
 print(out,'bounds',[(min(v[i] for v in coords),max(v[i] for v in coords)) for i in range(3)],'faces',sum(len(o.data.polygons) for o in meshes),flush=True)
 bpy.ops.export_scene.fbx(filepath=os.path.join(base,out+'.fbx'),use_selection=False,object_types={'MESH'},apply_unit_scale=True,bake_anim=False,path_mode='COPY',embed_textures=True)

