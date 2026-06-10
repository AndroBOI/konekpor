import { createContext } from "react";

type GameContextType = {
  clicks: Record<number, string>;
  toggleCircle: (index: number) => void;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);
