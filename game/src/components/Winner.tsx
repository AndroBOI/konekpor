import { useContext } from "react";
import { GameContext } from "../context/GameContext";

const Winner = () => {
  const { winner } = useContext(GameContext)!;

  if (!winner) return null;

  return (
    <div className="mt-6 animate-bounce">
      <h1
        className={`text-5xl font-bold tracking-wide ${winner === "Blue" ? "text-blue-300" : "text-red-300"}`}
      >
        {winner}
      </h1>
    </div>
  );
};

export default Winner;
