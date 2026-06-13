import { Link } from "react-router-dom";
import socket from "../lib/socket";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <div className="shadow-md rouned-lg gap-x-10 h-75 flex items-center justify-between p-20">
      <Link
        to={"/create-room"}
        className="bg-blue-300 text-white p-5 font-medium rounded-md hover:bg-blue-200 cursor-pointer"
      >
        Create Room
      </Link>
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
