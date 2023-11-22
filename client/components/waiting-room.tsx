// components/WaitingRoom.tsx

import React from "react";

const WaitingRoom: React.FC<{ roomId: string; users: string[] }> = ({
  roomId,
  users,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Waiting Room - Room ID: {roomId}
      </h1>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Users in the Room:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>

      <p>Waiting for more players to join...</p>
    </div>
  );
};

export default WaitingRoom;
