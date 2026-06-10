import { useContext } from "react";
import { GameContext } from "../context/GameContext";

type Props = {
  index: number;
};

const Circle = ({ index }: Props) => {
  const { clicks, toggleCircle } = useContext(GameContext)!;
  const color = clicks[index] ?? "";

  return (
    <div
      onClick={() => toggleCircle(index)}
      className={`h-20 w-20 rounded-full border-2 cursor-pointer transition-all duration-300 hover:scale-110 ${color}`}
    />
  );
};

export default Circle;
