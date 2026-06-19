import { Link, useNavigate } from "react-router-dom";
import socket from "../lib/socket";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("room-created", (roomId: string) => {
      navigate(`/room/${roomId}`);
    });

    return () => {
      socket.off("connect");
      socket.off("room-created");
    };
  }, [navigate]);

  return (
    <div className="shadow-md rounded-lg gap-x-10 h-75 flex items-center justify-between p-20">
      <button
      onClick={() => socket.emit('create-room')}
        className="bg-blue-300 text-white p-5 font-medium rounded-md hover:bg-blue-200 cursor-pointer"
      >
        Create Room
      </button>
      <Link
        to={"/join-room"}
        className="bg-red-300 text-white p-5 font-medium rounded-md hover:bg-red-200 cursor-pointer"
      >
        Join Room
      </Link>
    </div>
  );
};

export default HomePage;
