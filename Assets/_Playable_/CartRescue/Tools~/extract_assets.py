"""Xuất asset cho playable Cart Rescue từ bản WebGL "Brainrot 3D: Animal Hunt".

Usage: python -P extract_assets.py <game.data> <outDir>

game.data = Build/*.data.br đã giải nén brotli.
Mesh được xuất ra JSON nguyên bản hệ toạ độ Unity (không qua OBJ để tránh lật trục / lệch thứ tự submesh);
Editor script CartRescueSetup dựng lại Mesh asset từ JSON. Mỗi mesh kèm danh sách material theo thứ tự submesh
(texture chính nếu có + màu _BaseColor).

Audio trong build là .m4a (Unity không import được) → chuyển sang mp3 mono bằng ffmpeg, chạy trong Source/Audio:
  for f in Win action_jump Button; do ffmpeg -y -i $f.m4a -ac 1 -b:a 96k $f.mp3; done
  ffmpeg -y -i tralalelotheme.m4a -t 40 -af "afade=t=out:st=38:d=2" -ac 1 -b:a 64k BGM_CartRescue.mp3
  rm *.m4a
"""
import json
import os
import sys

import UnityPy
from UnityPy.helpers.MeshHelper import MeshHandler

MESHES = [
    "Tralalelo", "TaTaTaTaSahur", "CappuccinoAssasino", "Chimpanzini", "BrrBrrPatapim",
    "golf-cart-base", "golf-cart-wheel_BL", "golf-cart-wheel_BR", "golf-cart-wheel_FL", "golf-cart-wheel_FR",
    "helicopter-base", "helicopter-propeller-main",
    "crate-supply", "barrel", "package-box", "log", "flag-golf_red", "cannonball",
    "jeep-open-base", "jeep-open-wheel_FL",
    # Bối cảnh 4 map (màn chọn map).
    "ferris-wheel-main", "ferris-wheel-stand", "bumper-car-red", "bumper-car_blue", "hot-dog-stand", "bench-old",
    "basketball-stand", "lamp-city", "building-cabin-small", "building-stadium", "car-broken", "fountain",
    "farm-house", "haystack", "hay-pile", "hay-cube", "fence", "fence-classic", "horse", "farm-flower-bed",
    "castle-medieval", "gate-medieval_medium", "flag-medieval", "japan-tree-tall", "mushroom-boletus", "grass-long",
]
SPRITES = ["TutorialFinger"]
AUDIO = ["Win", "action_jump", "Button", "tralalelotheme"]


def mat_info(mat):
    tex = None
    for key, env in mat.m_SavedProperties.m_TexEnvs:
        if key in ("_MainTex", "_BaseMap") and env.m_Texture.path_id:
            tex = env.m_Texture.read()
            break
    color = [1.0, 1.0, 1.0, 1.0]
    for key, c in mat.m_SavedProperties.m_Colors:
        if key in ("_BaseColor", "_Color"):
            color = [c.r, c.g, c.b, c.a]
            break
    return tex, color


def renderer_materials(mesh_filter):
    go = mesh_filter.m_GameObject.read()
    for comp in go.m_Component:
        ptr = comp.component if hasattr(comp, "component") else comp[1]
        if ptr.type.name == "MeshRenderer":
            return [m.read() for m in ptr.read().m_Materials]
    return []


def main(data_path, out):
    env = UnityPy.load(data_path)
    for sub in ("Meshes", "Textures", "UI", "Audio"):
        os.makedirs(os.path.join(out, sub), exist_ok=True)

    mesh_objs = {}
    for o in env.objects:
        if o.type.name == "Mesh":
            name = o.peek_name()
            if name in MESHES and name not in mesh_objs:
                mesh_objs[name] = o
    by_pid = {o.path_id: n for n, o in mesh_objs.items()}

    materials = {}
    for o in env.objects:
        if o.type.name != "MeshFilter":
            continue
        mf = o.read()
        name = by_pid.get(mf.m_Mesh.path_id)
        if name and name not in materials:
            materials[name] = renderer_materials(mf)

    manifest = []
    written_tex = set()
    for name in MESHES:
        if name not in mesh_objs:
            print("MISSING mesh", name)
            continue
        mesh = mesh_objs[name].read()
        h = MeshHandler(mesh)
        h.process()
        tris = h.get_triangles()  # list per submesh of (a,b,c) tuples
        data = {
            "name": name,
            "vertices": [c for v in h.m_Vertices for c in v[:3]],
            "normals": [c for v in (h.m_Normals or []) for c in v[:3]],
            "uv": [c for v in (h.m_UV0 or []) for c in v[:2]],
            "submeshes": [{"indices": [i for t in sub for i in t]} for sub in tris],
        }
        with open(os.path.join(out, "Meshes", name + ".json"), "w") as f:
            json.dump(data, f)

        mats = []
        for mat in materials.get(name, []):
            tex, color = mat_info(mat)
            tex_name = None
            if tex is not None:
                tex_name = tex.m_Name
                if tex_name not in written_tex:
                    tex.image.save(os.path.join(out, "Textures", tex_name + ".png"))
                    written_tex.add(tex_name)
            mats.append({"name": mat.m_Name, "texture": tex_name or "", "color": color})
        manifest.append({"mesh": name, "materials": mats, "vertexCount": len(h.m_Vertices), "submeshCount": len(tris)})

    for o in env.objects:
        if o.type.name == "Sprite" and o.peek_name() in SPRITES:
            sp = o.read()
            sp.image.save(os.path.join(out, "UI", sp.m_Name + ".png"))
        elif o.type.name == "AudioClip" and o.peek_name() in AUDIO:
            clip = o.read()
            for fname, raw in clip.samples.items():
                ext = os.path.splitext(fname)[1] or ".wav"
                with open(os.path.join(out, "Audio", clip.m_Name + ext), "wb") as f:
                    f.write(raw)

    with open(os.path.join(out, "manifest.json"), "w") as f:
        json.dump({"entries": manifest}, f, indent=1)
    print("exported %d meshes, %d textures" % (len(manifest), len(written_tex)))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
