import bpy
from pathlib import Path
p=Path('F:/UnityProjects/CEBB_V13/output/house-reference'); p.mkdir(exist_ok=True)
s=bpy.context.scene; seq=s.sequence_editor_create()
m=seq.strips.new_movie('Reference','C:/Users/Admin/Downloads/76ce46f43c366dca4b14a40649e6a476aa19d99b_raw.mp4',channel=1,frame_start=1)
s.render.resolution_x=576; s.render.resolution_y=1024; s.render.resolution_percentage=100
s.render.image_settings.file_format='PNG'
print('DURATION',m.frame_final_duration)
for f in [.05,.25,.5,.99]:
 s.frame_set(int(m.frame_final_duration*f)); s.render.filepath=str(p/('frame'+str(f)+'.png')); bpy.ops.render.render(write_still=True)
