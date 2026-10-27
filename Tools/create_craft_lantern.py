import bpy,bmesh,json,math
from pathlib import Path
from mathutils import Vector
ROOT=Path('F:/UnityProjects/CEBB_V13')
OUT=ROOT/'Assets/3D Models/Craft Lantern'
PRE=ROOT/'output/craft-lantern'; PRE.mkdir(parents=True,exist_ok=True)
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
verts=[]; faces=[]; indices=[]; uvs=[]
def face(ids,mat,uv=None):
    faces.append(ids); indices.append(mat)
    uvs.append(uv or [(0,0),(1,0),(1,1),(0,1)])
# One boundary shell for base, luminous body and stepped metal lid.
profile=[(0,.22),(.055,.22),(.455,.22),
         (.48,.22),(.48,.19),(.495,.19),(.495,.155),(.515,.155),(.535,.155),(.58,.155)]
for z,w in profile: verts.extend([(-w,-w,z),(w,-w,z),(w,w,z),(-w,w,z)])
face([3,2,1,0],0)
for ring in range(len(profile)-1):
    material=1 if ring==1 else 2 if ring==7 else 0
    for side in range(4):
        n=(side+1)%4
        face([ring*4+side,ring*4+n,(ring+1)*4+n,(ring+1)*4+side],material)
last=4*(len(profile)-1); face([last,last+1,last+2,last+3],0)
# Two polygonal interlocking links, real holes, alternating link planes.
for link,center in enumerate([.66,.79]):
    start=len(verts)
    for i in range(12):
        t=2*math.pi*i/12
        for j in range(4):
            s=2*math.pi*j/4
            x=(.052+.012*math.cos(s))*math.cos(t)
            y=.012*math.sin(s)
            z=center+(.068+.012*math.cos(s))*math.sin(t)
            verts.append((x,y,z) if link%2==0 else (y,x,z))
    for i in range(12):
        for j in range(4):
            face([start+i*4+j,start+((i+1)%12)*4+j,
                  start+((i+1)%12)*4+(j+1)%4,start+i*4+(j+1)%4],0)
mesh=bpy.data.meshes.new('CraftLantern_Mesh'); mesh.from_pydata(verts,[],faces); mesh.update()
obj=bpy.data.objects.new('CraftLantern',mesh); bpy.context.collection.objects.link(obj)
bpy.context.view_layer.objects.active=obj; obj.select_set(True)
def material(name,color):
    m=bpy.data.materials.new(name); m.use_nodes=True
    m.node_tree.nodes.get('Principled BSDF').inputs['Base Color'].default_value=(*color,1)
    m.node_tree.nodes.get('Principled BSDF').inputs['Roughness'].default_value=.7
    m.diffuse_color=(*color,1)
    return m
metal=material('Lantern_GrayMetal',(.40,.38,.45))
metal_img=bpy.data.images.load(str(OUT/'Lantern_Metal.png'))
metal_tex=metal.node_tree.nodes.new('ShaderNodeTexImage'); metal_tex.image=metal_img
metal.node_tree.links.new(metal_tex.outputs['Color'],metal.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
glow=material('Lantern_WarmGlow',(1,.8,.3))
orange=material('Lantern_OrangeBand',(1,.36,.055))
img=bpy.data.images.load(str(OUT/'Lantern_Glow.png'))
tex=glow.node_tree.nodes.new('ShaderNodeTexImage'); tex.image=img
bs=glow.node_tree.nodes.get('Principled BSDF')
glow.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color'])
glow.node_tree.links.new(tex.outputs['Color'],bs.inputs['Emission Color'])
bs.inputs['Emission Strength'].default_value=.45
for m in [metal,glow,orange]: mesh.materials.append(m)
uv=mesh.uv_layers.new(name='UVMap')
for poly,mat,coords in zip(mesh.polygons,indices,uvs):
    poly.material_index=mat
    for li,coord in zip(poly.loop_indices,coords): uv.data[li].uv=coord
bm=bmesh.new(); bm.from_mesh(mesh)
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
bm.verts.ensure_lookup_table()
body_edges=[e for e in bm.edges
            if all(v.index < 4*len(profile) for v in e.verts)
            and e.is_manifold and e.calc_face_angle() > .5]
bmesh.ops.bevel(bm,geom=body_edges,offset=.003,segments=2,
                affect='EDGES',clamp_overlap=True,profile=.5)
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
assert all(e.is_manifold for e in bm.edges)
assert bm.calc_volume()>0
bm.to_mesh(mesh); bm.free(); mesh.update(); mesh.calc_loop_triangles()
# Carry the luminous material across bevel strips at the four body corners.
# Reproject the entire light section so bevel UVs cannot sample metal or
# stretch the light panel beyond its intended rectangular region.
uv=mesh.uv_layers.active
for poly in mesh.polygons:
    if .055 < poly.center.z < .455:
        poly.material_index=1
        for li in poly.loop_indices:
            p=mesh.vertices[mesh.loops[li].vertex_index].co
            if abs(poly.normal.y)>=abs(poly.normal.x):
                u=(p.x+.22)/.44 if poly.normal.y<0 else (.22-p.x)/.44
            else:
                u=(p.y+.22)/.44 if poly.normal.x>0 else (.22-p.y)/.44
            uv.data[li].uv=(max(0,min(1,u)),max(0,min(1,(p.z-.055)/.4)))
tris=len(mesh.loop_triangles)
bpy.ops.export_scene.fbx(filepath=str(OUT/'CraftLantern.fbx'),use_selection=True,object_types={'MESH'},axis_forward='-Z',axis_up='Y',apply_unit_scale=True,bake_space_transform=True,path_mode='COPY',embed_textures=True)
img.pack(); metal_img.pack(); bpy.ops.wm.save_as_mainfile(filepath=str(PRE/'CraftLantern.blend'))
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.fbx(filepath=str(OUT/'CraftLantern.fbx'))
objects=[o for o in bpy.context.scene.objects if o.type=='MESH']; assert len(objects)==1
obj=objects[0]; points=[obj.matrix_world@Vector(p) for p in obj.bound_box]
dims=[max(p[i] for p in points)-min(p[i] for p in points) for i in range(3)]
assert all(abs(a-b)<.0001 for a,b in zip(dims,[.44,.44,.87]))
assert obj.matrix_world.translation.length<.0001 and abs(min(p.z for p in points))<.0001
assert any(n.type=='TEX_IMAGE' and n.image and n.image.size[0]==128 for m in obj.data.materials for n in m.node_tree.nodes)
report={'dimensions_unity_xyz':[.44,.87,.44],'chain_links':2,'bevel_radius':.003,'bevel_segments':2,'pivot':[0,0,0],'triangles':tris,'mesh_count':1,'materials':3,'texture':[128,128],'fbx_reimport_passed':True,'manifold':True}
(PRE/'validation.json').write_text(json.dumps(report,indent=2))
scene=bpy.context.scene; scene.render.engine='CYCLES'; scene.cycles.samples=32
scene.render.resolution_x=900; scene.render.resolution_y=1000; scene.render.resolution_percentage=100
scene.world.color=(.16,.19,.23); scene.view_settings.view_transform='Standard'
scene.render.image_settings.file_format='PNG'
for name,loc,power in [('Key',(-3,-4,5),230),('Fill',(3,-1,2),100)]:
    data=bpy.data.lights.new(name,'AREA'); data.energy=power; data.size=4
    light=bpy.data.objects.new(name,data); bpy.context.collection.objects.link(light); light.location=loc
    light.rotation_euler=(Vector((0,0,.5))-light.location).to_track_quat('-Z','Y').to_euler()
data=bpy.data.cameras.new('Preview'); cam=bpy.data.objects.new('Preview',data)
bpy.context.collection.objects.link(cam); scene.camera=cam; data.type='ORTHO'; data.ortho_scale=1.08
cam.location=(1.3,-3,1.3); cam.rotation_euler=(Vector((0,0,.435))-cam.location).to_track_quat('-Z','Y').to_euler()
scene.render.filepath=str(PRE/'Lantern_Perspective.png'); bpy.ops.render.render(write_still=True)
cam.location=(0,0,4); cam.rotation_euler=(0,0,0); data.ortho_scale=.7
scene.render.resolution_y=900
scene.render.filepath=str(PRE/'Lantern_Top.png'); bpy.ops.render.render(write_still=True)
print('LANTERN_RESULT '+json.dumps(report))
