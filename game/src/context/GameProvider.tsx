import { useState } from "react";
import { GameContext } from "./GameContext";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const GameProvider = ({ children }: Props) => {
  const [clicks, setClicks] = useState<Record<number, string>>({});
  const [turn, setTurn] = useState(0);

  const toggleCircle = (index: number) => {
    if (clicks[index]) return;

    setClicks((prev) => ({
      ...prev,
      [index]: turn % 2 === 0 ? "bg-blue-300" : "bg-red-300",
    }));
    setTurn((prev) => prev + 1);
  };

  console.info(clicks);

  return (
    <GameContext.Provider value={{ clicks, toggleCircle }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
