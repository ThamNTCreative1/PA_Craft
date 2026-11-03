# Monster Ground-Follow + Adjustable Spawn Count — Design

Date: 2026-08-07
Scope: `Assets/_Playable_/Scripts/Monster.cs`, `Assets/_Playable_/Scripts/MapController.cs`

## Problem

1. **Quái di chuyển "chéo" khi wander trên địa hình dốc/gồ ghề.** `Monster.UpdateMove()` raycast xuống đất chỉ ở điểm bắt đầu và điểm đích của quãng đường, sau đó dùng `Mathf.Lerp` nội suy độ cao Y theo % tiến trình quãng đường XZ. Nếu địa hình giữa 2 điểm không phẳng (dốc, gò, bậc), quái đi theo một đường thẳng nội suy cắt xuyên qua địa hình thay vì bám sát bề mặt thật — tạo cảm giác trượt/đi chéo qua không trung hoặc lún vào đất.
2. **Số lượng quái spawn mỗi lần tap đang cố định = 1**, không thể chỉnh trong Inspector.

## Goals

- Quái bám sát mặt đất khi di chuyển, kể cả khi địa hình giữa điểm xuất phát và điểm đến không phẳng.
- Dùng Collider vật lý (theo đúng pattern đã có ở `PlayerController`) thay vì chỉ nội suy toán học.
- Cho phép chỉnh số lượng quái spawn mỗi lần tap qua 1 field Inspector trên `MapController`, áp dụng cho Gameplay phase.
- Không phá vỡ luồng Tutorial hiện tại (vẫn spawn đúng 1 quái/điểm hướng dẫn).
- Không đổi hành vi pooling/despawn hiện có của `Monster` (`Despawn()` vẫn `SetActive(false)` để `GameController` tái sử dụng).

## Non-goals

- Không làm quái nghiêng thân theo pháp tuyến mặt dốc (chỉ xoay quanh trục Y theo hướng di chuyển, giữ nguyên hành vi `RotateTowards` hiện tại).
- Không đổi cơ chế Tutorial spawn count (giữ nguyên 1 quái/điểm).
- Không đổi cơ chế chọn quái (`HotbarItem` / `SelectMonster`).

## Design

### 1. Monster: chuyển sang Rigidbody (kinematic) + CapsuleCollider

**Thêm component (theo đúng pattern `PlayerController`):**
- `CapsuleCollider` — kích thước khớp model quái.
- `Rigidbody`:
  - `isKinematic = true`
  - `interpolation = RigidbodyInterpolation.Interpolate`
  - `constraints = RigidbodyConstraints.FreezeRotation`
  - `useGravity = false` (kinematic không cần)

Lý do chọn kinematic thay vì dynamic + gravity: quái không bị các va chạm khác (đẩy nhau, va Player) làm văng lệch AI, nhẹ hơn khi có nhiều quái cùng lúc, và hành vi wander (script tự quyết định target/vị trí) khớp tự nhiên với việc tự set vị trí qua `MovePosition` thay vì để PhysX tự do chi phối.

**Thay đổi `UpdateMove()`:**
- Chuyển phần set vị trí sang `FixedUpdate` (tách khỏi `Update` hiện tại đang lo cả animation/idle timer) — chỉ phần tính toán + gọi `Rigidbody.MovePosition` chạy trong `FixedUpdate`; phần timer (`_moveTimer`, `_idleTimer`) vẫn ở `Update` dùng `Time.deltaTime` như cũ.
- Mỗi bước di chuyển:
  1. Tính `nextPosition` (XZ) theo hướng tới `_targetPosition` như hiện tại (`direction * step`).
  2. `SphereCast` từ trên xuống tại `nextPosition` (bán kính = bán kính `CapsuleCollider`, giống `_groundRayHeight`/`_groundRayLength` hiện có) để lấy điểm chạm mặt đất tại đúng vị trí sắp tới — thay cho việc nội suy Lerp theo % quãng đường.
  3. Nếu `SphereCast` không trúng (rơi ra ngoài map/lỗ hổng), giữ nguyên Y hiện tại thay vì snap về vị trí cũ đột ngột (fallback an toàn).
  4. `_rigidbody.MovePosition(groundPoint)`.
- Xoá field `_raycastWhileMoving` (không còn cần thiết — hành vi mới luôn bám đất theo từng bước, thay thế cả 2 chế độ cũ) và field liên quan `_moveStartHeight` / `_moveFlatDistance` (không còn dùng Lerp độ cao).
- `RotateTowards` giữ nguyên nhưng áp dụng trong `FixedUpdate` cùng với `MovePosition` (đồng bộ update vật lý), hoặc set `_rigidbody.MoveRotation` thay vì `_transform.rotation` trực tiếp — để nhất quán với kinematic rigidbody và tránh giật hình do interpolation.

**Idle/Spawn:** `SnapToGround` khi `Spawn()` giữ nguyên raycast một lần (đứng yên, không cần SphereCast liên tục). Có thể set thẳng `_transform.position` lúc spawn (trước khi kinematic rigidbody bắt đầu điều khiển) như code hiện tại.

**Inspector mới cần gán ở prefab quái:** `CapsuleCollider`, `Rigidbody` (kinematic) — cần cập nhật prefab quái trong Unity Editor (ngoài phạm vi code, sẽ note trong plan).

### 2. MapController: field điều chỉnh số lượng spawn mỗi tap

**Field mới** trong nhóm `Header("Spawn Monster")`:
```csharp
[SerializeField] private int _spawnCountPerTap = 1;
[SerializeField] private float _spawnScatterRadius = 1.2f;
```

**`TrySpawnMonster` đổi thành spawn nhiều con, rải ngẫu nhiên quanh điểm tap:**
- Đổi chữ ký từ trả `bool` cho 1 lần spawn thành lặp `_spawnCountPerTap` lần trong `HandleGameplayTap`.
- Mỗi lần lặp: lấy offset ngẫu nhiên trong `Random.insideUnitCircle * _spawnScatterRadius`, cộng vào `worldPosition` gốc (XZ), giữ nguyên Y gốc — `Monster.Spawn()` đã tự `SnapToGround` nên không cần raycast lại ở `MapController`.
- `Instantiate` + `Spawn(offsetPosition, _monsterWanderRadius)` như cũ cho từng con.
- **Tutorial phase không đổi** — `HandleTutorialTap` vẫn spawn đúng 1 con tại `_posSpawnTutorial`, không áp dụng scatter/count. Tách rõ 2 hàm:
  - `SpawnMonsterAt(Vector3 worldPosition)` — hàm dùng chung, giữ đúng logic hiện tại của `TrySpawnMonster` (check `_prefabMonster != null`, `Instantiate` + `Spawn`), trả về `bool`.
  - `HandleGameplayTap` gọi `SpawnMonsterAt` trong vòng lặp `_spawnCountPerTap` lần với offset rải ngẫu nhiên.
  - `HandleTutorialTap` gọi thẳng `SpawnMonsterAt(_posSpawnTutorial)` đúng 1 lần như code cũ.
- VFX spawn (`ShowVfx`) không đổi, vẫn hiển thị tại điểm tap gốc (không nhân theo số lượng).

## Testing

- Test bằng Unity Play Mode trên map có địa hình dốc/gồ ghề thực tế: quan sát quái wander qua dốc, xác nhận không còn hiện tượng lún/trượt chéo qua không trung.
- Test spawn nhiều quái/tap: xác nhận không chồng đè vị trí, không văng ra ngoài map, các quái không bị PhysX đẩy dính chùm lạ khi đứng gần nhau.
- Test Tutorial phase không bị ảnh hưởng (vẫn spawn đúng 1 quái/điểm hướng dẫn).
- Test pooling: `Despawn()` → `SetActive(false)` → spawn lại từ pool, xác nhận Rigidbody/Collider không giữ trạng thái vật lý cũ (velocity, vị trí) gây lỗi khi tái sử dụng.

## Risks / Open questions

- Cần chỉnh prefab quái trong Unity Editor (thêm `CapsuleCollider` + `Rigidbody`, set kinematic) — việc này ngoài phạm vi sửa code thuần, cần thao tác trong Editor hoặc script Editor hỗ trợ.
- Nhiều quái cùng lúc có Collider có thể phát sinh va chạm/đẩy nhau nhẹ qua PhysX dù kinematic không bị đẩy bởi vật khác — nhưng *va chạm giữa 2 quái kinematic với nhau sẽ không tự tách ra* (PhysX không đẩy kinematic-kinematic). Cần lưu ý test số lượng lớn quái đứng gần nhau, có thể chồng lấn hình học nhẹ dù đã rải ngẫu nhiên lúc spawn — chấp nhận được vì bán kính wander đủ lớn để tự tách ra dần.
