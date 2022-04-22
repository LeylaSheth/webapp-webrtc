import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { roomManager } from "../../common";

export interface RoomSetupProps {
  enterDisabled: boolean;
  leaveDisabled: boolean;
}

export const RoomSetup: FC<RoomSetupProps> = ({
  enterDisabled,
  leaveDisabled,
}) => {
  const [roomId, setRoomId] = useState(0);

  const handleInput = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setRoomId(Number(e.target.value) || 0);
  }, []);

  const handleJoin = useCallback(() => {
    roomManager.join(roomId);
  }, [roomId]);

  const handleLeft = useCallback(() => {
    roomManager.left();
  }, []);
  return (
    <div className="room-setting">
      <div>
        请输入房间号：
        <input value={roomId} onChange={handleInput} />
      </div>
      <div>
        <button onClick={handleJoin} disabled={enterDisabled}>
          加入房间
        </button>
        <button onClick={handleLeft} disabled={leaveDisabled}>
          离开房间
        </button>
      </div>
    </div>
  );
};
