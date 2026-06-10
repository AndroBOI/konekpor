import { createContext } from "react";

type GameContextType = {
  clicks: Record<number, string>;
  toggleCircle: (index: number) => void;
  winner: string | null;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);
