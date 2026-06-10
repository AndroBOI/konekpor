import { useState } from "react";
import { GameContext } from "./GameContext";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const checkWin = (
  clicks: Record<number, string>,
  lastIndex: number,
  color: string,
) => {
  const col = lastIndex % 7;
  const row = Math.floor(lastIndex / 7);

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const [dr, dc] of directions) {
    let count = 1;

    for (let i = 1; i < 4; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      if (r < 0 || r >= 6 || c < 0 || c >= 7) break;
      if (clicks[r * 7 + c] !== color) break;
      count++;
    }

    for (let i = 1; i < 4; i++) {
      const r = row - dr * i;
      const c = col - dc * i;
      if (r < 0 || r >= 6 || c < 0 || c >= 7) break;
      if (clicks[r * 7 + c] !== color) break;
      count++;
    }

    if (count >= 4) return true;
  }

  return false;
};

export const GameProvider = ({ children }: Props) => {
  const [clicks, setClicks] = useState<Record<number, string>>({});
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);

  const toggleCircle = (index: number) => {
    if (clicks[index] || winner) return;

    const color = turn % 2 === 0 ? "bg-blue-300" : "bg-red-300";
    const newClicks = { ...clicks, [index]: color };

    setClicks(newClicks);

    if (checkWin(newClicks, index, color)) {
      setWinner(color === "bg-blue-300" ? "Blue" : "Red");
    }

    setTurn((prev) => prev + 1);
  };

  return (
    <GameContext.Provider value={{ clicks, toggleCircle, winner }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
