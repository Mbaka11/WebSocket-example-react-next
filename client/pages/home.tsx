import React, { useState } from "react";
import { useRouter } from "next/router";
import { socket } from "../utils/socket";

const CreateJoinRoomPage: React.FC = () => {
  console.log("socket connected: ", socket.connected);
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const handleCreateRoom = () => {
    // Logic to handle creating a room
    // For simplicity, redirect to the chat page with a generated room ID
    // const newRoomId = generateRandomRoomId();
    const newRoomId = "456";
    console.log(`Creating new room with ID ${newRoomId}`);
    console.log("SOCKET ID: ", socket.id);
    socket.emit("join-room", { roomId: newRoomId, socketId: socket.id });
    router.push(`/waiting-room/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    // Logic to handle joining a room with roomId
    // For simplicity, redirect to the chat page with the entered room ID
    // router.push(`/waiting-room/${roomId}`);
    const newRoomId = "456";
    socket.emit("join-room", { roomId: newRoomId, socketId: socket.id });
    router.push(`/waiting-room/456`);
  };

  const generateRandomRoomId = () => {
    // Generate a random room ID (you may use a more sophisticated logic)
    return Math.random().toString(36).substring(7);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Create or Join a Room</h1>

      <button
        onClick={handleCreateRoom}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600 focus:outline-none"
      >
        Create Room
      </button>

      <div className="flex items-center">
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleJoinRoom();
            }
          }}
          placeholder="Enter Room ID"
          className="p-2 border rounded-l focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          onClick={handleJoinRoom}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none"
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default CreateJoinRoomPage;
