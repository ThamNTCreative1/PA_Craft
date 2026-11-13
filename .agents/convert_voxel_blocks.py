import bpy,os,json
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=r'D:/Source/PA_Craft/Assets/_Playable/CherryForest/Source/VoxelBlocks/voxel-blocks.glb')
for o in bpy.context.scene.objects:
 if o.type=='MESH':
  print('BLOCK',o.name,'MATS',[m.name for m in o.data.materials], 'BOUNDS',list(o.dimensions),flush=True)
bpy.ops.export_scene.fbx(filepath=r'D:/Source/PA_Craft/Assets/_Playable/CherryForest/VoxelBlocks.fbx',object_types={'MESH'},bake_anim=False,path_mode='COPY',embed_textures=True)
