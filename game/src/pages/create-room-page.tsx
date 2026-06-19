import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../lib/socket";

type Player = { id: string; role: "host" | "guest" };

const MAX_PLAYERS = 2;

const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();
  
  const handleStart = () => {
    socket.emit("start-game", id);
  };

  useEffect(() => {
    if (!id) return;

    socket.emit("get-room", id);

    socket.on(
      "room-update",
      ({ players }: { roomId: string; players: Player[] }) => {
        setPlayers(players);
      },
    );

    socket.on("game-start", (url: string) => {
      navigate(url);
    });

    return () => {
      socket.off("room-update");
    };
  }, [id]);

  const host = players.find((p) => p.role === "host");
  const guest = players.find((p) => p.role === "guest");

  return (
    <div className="p-20 shadow-md flex flex-col justify-center items-center gap-y-5">
      <div>id - {id}</div>

      <div className="flex flex-col gap-y-2">
        <div>User 1 (host): {host?.id ?? "waiting..."}</div>
        <div>User 2 (guest): {guest?.id ?? "waiting..."}</div>
      </div>

      <div className="bg-blue-300 text-white px-10 py-5 rounded-md">
        Waiting... ({players.length}/{MAX_PLAYERS})
      </div>

      <button
        onClick={handleStart}
        className="bg-green-500 hover:bg-green-300 text-white px-10 py-3 rounded-md opacity-50"
      >
        Start
      </button>

      <Link to={"/"} className="text-red-300 hover:underline">
        Cancel
      </Link>
    </div>
  );
};

export default RoomPage;
