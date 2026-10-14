"""Preserve the source controller's layers/clips without runtime Blend Trees.

Requires PyYAML. Two-dimensional trees select rows, then columns by midpoints;
this deliberately uses discrete clips instead of Unity's blended poses.
"""
from pathlib import Path
import copy
import re
import yaml

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'Assets/_Playable_/ClimbJump/Imported/Game/MiniGames/Commons/Animations/MinigameCharacterController.controller'
TARGET = ROOT / 'Assets/_Playable_/ClimbJump/LunaDirectRunDiagnostic.controller'
text = SOURCE.read_text(encoding='utf-8-sig')
objects = {}
for match in re.finditer(r'--- !u!(\d+) &(-?\d+)\n(.*?)(?=--- !u!|\Z)', text, re.S):
    objects[int(match[2])] = (int(match[1]), yaml.safe_load(match[3]))
original = copy.deepcopy(objects)
counter = 700000000

def add(kind, name, value):
    global counter
    counter += 1
    assert counter not in objects
    objects[counter] = (kind, {name: value})
    return {'fileID': counter}

def bins(values, value, parameter):
    values = sorted(set(values))
    i = values.index(value)
    result = []
    if i:
        result.append({'m_ConditionMode': 3, 'm_ConditionEvent': parameter,
                       'm_EventTreshold': (values[i-1] + value) / 2 + min(0.02, (value - values[i-1]) * 0.1)})
    if i + 1 < len(values):
        result.append({'m_ConditionMode': 4, 'm_ConditionEvent': parameter,
                       'm_EventTreshold': (values[i+1] + value) / 2 - min(0.02, (values[i+1] - value) * 0.1)})
    return result

def leaves(motion, conditions=(), speed=1, offset=0, mirror=0):
    entry = original.get(motion.get('fileID')) if 'guid' not in motion else None
    if entry is None or entry[0] != 206:
        return [(motion, list(conditions), speed, offset, mirror)]
    tree = entry[1]['BlendTree']
    children = tree['m_Childs']
    assert tree['m_BlendType'] in (0, 3), tree['m_BlendType']
    result = []
    for child in children:
        if tree['m_BlendType'] == 0:
            extra = bins([c['m_Threshold'] for c in children], child['m_Threshold'], tree['m_BlendParameter'])
        else:
            y = child['m_Position']['y']
            row = [c for c in children if c['m_Position']['y'] == y]
            extra = bins([c['m_Position']['y'] for c in children], y, tree['m_BlendParameterY'])
            extra += bins([c['m_Position']['x'] for c in row], child['m_Position']['x'], tree['m_BlendParameter'])
        result += leaves(child['m_Motion'], list(conditions) + extra,
                         speed * child['m_TimeScale'], offset + child['m_CycleOffset'], mirror ^ child['m_Mirror'])
    return result

transition_template = next(copy.deepcopy(v[1]['AnimatorStateTransition']) for v in original.values() if v[0] == 1101)
expanded = {}
for state_id, (kind, data) in original.items():
    if kind != 1102:
        continue
    state = data['AnimatorState']
    variants = leaves(state['m_Motion'])
    if len(variants) == 1 and variants[0][0] == state['m_Motion']:
        continue
    refs = []
    for i, (motion, conditions, speed, offset, mirror) in enumerate(variants):
        new = copy.deepcopy(state)
        new['m_Name'] = state['m_Name'] + '_Direct_' + str(i)
        new['m_Motion'] = motion
        new['m_Speed'] *= speed
        new['m_CycleOffset'] += offset
        new['m_Mirror'] ^= mirror
        # Signed climb playback is already selected by the former tree's regions.
        if new.get('m_SpeedParameter') == 'ClimbSpeed':
            new['m_SpeedParameterActive'] = 0
        if i == 0:
            objects[state_id] = (1102, {'AnimatorState': new})
            ref = {'fileID': state_id}
        else:
            ref = add(1102, 'AnimatorState', new)
        refs.append((ref, conditions))
    for ref, _ in refs:
        new = objects[ref['fileID']][1]['AnimatorState']
        for destination, conditions in refs:
            if destination == ref:
                continue
            transition = copy.deepcopy(transition_template)
            transition.update(m_Conditions=conditions, m_DstState=destination, m_DstStateMachine={'fileID': 0},
                              m_IsExit=0, m_HasExitTime=0, m_ExitTime=0, m_HasFixedDuration=1,
                              m_TransitionDuration=0.16, m_TransitionOffset=0, m_CanTransitionToSelf=0)
            new['m_Transitions'].append(add(1101, 'AnimatorStateTransition', transition))
    expanded[state_id] = [r for r, _ in refs[1:]]

for kind, data in list(objects.values()):
    if kind == 1107:
        machine = data['AnimatorStateMachine']
        for child in list(machine['m_ChildStates']):
            for i, ref in enumerate(expanded.get(child['m_State']['fileID'], [])):
                new = copy.deepcopy(child)
                new['m_State'] = ref
                new['m_Position']['x'] += 250 * (i + 1)
                machine['m_ChildStates'].append(new)
    elif kind == 91:
        data['AnimatorController']['m_Name'] = 'LunaDirectAnimations'

objects = {i: v for i, v in objects.items() if v[0] != 206}
def clips(collection):
    result = set()
    for kind, data in collection.values():
        if kind == 1102:
            for motion, *_ in leaves(data['AnimatorState']['m_Motion']):
                if motion.get('guid'):
                    result.add((motion['guid'], motion['fileID']))
    return result
assert clips(original) == clips(objects), 'Original clips must all be preserved'
def check_refs(value):
    if isinstance(value, dict):
        if set(value) == {'fileID'} and value['fileID']:
            assert value['fileID'] in objects, value
        for child in value.values():
            check_refs(child)
    elif isinstance(value, list):
        for child in value:
            check_refs(child)
for _, data in objects.values():
    check_refs(data)
output = '%YAML 1.1\n%TAG !u! tag:unity3d.com,2011:\n'
for key, (kind, data) in objects.items():
    output += f'--- !u!{kind} &{key}\n' + yaml.safe_dump(data, sort_keys=False, width=160)
TARGET.write_text(output, encoding='utf-8')
print(f'PASS: preserved {len(clips(objects))} unique clips, all original layers and external transitions; no Blend Trees; valid references.')
