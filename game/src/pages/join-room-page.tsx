import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../lib/socket";

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room-update", ({ roomId }) => {
      navigate(`/room/${roomId}`);
    });

    socket.on("join-error", (message: string) => {
      setError(message);
    });

    return () => {
      socket.off("room-update");
      socket.off("join-error");
    };
  }, [navigate]);

  const handleJoin = () => {
    setError("");
    socket.emit("join-room", roomId.trim());
  };

  return (
    <div className="w-72 shadow-md flex flex-col items-center gap-y-5 p-10">
      <input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter room id"
        className="border p-3 rounded-md w-full"
      />
      <button
        onClick={handleJoin}
        className="bg-red-300 text-white px-10 py-3 rounded-md hover:bg-red-200 cursor-pointer"
      >
        Join
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default JoinRoomPage;
