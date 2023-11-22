import { useRouter } from "next/router";
import WaitingRoom from "../../components/waiting-room";
import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";

const WaitingRoomPage = () => {
  const router = useRouter();
  const { roomId } = router.query;

  console.log("socket connected: ", socket.connected);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("join-room", { roomId: roomId as string, socketId: socket.id });
  }, [roomId]);

  useEffect(() => {
    socket.on("user-connected", ({ socketId, usersInRoom }) => {
      console.log("Received user-connected event from server!");
      console.log("Users in room: ", usersInRoom);
      setUsers(usersInRoom);
    });
  }, [socket]);

  return <WaitingRoom roomId={roomId as string} users={users} />;
};

export default WaitingRoomPage;
