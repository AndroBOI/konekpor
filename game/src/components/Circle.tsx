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
      className={`h-20 w-20 rounded-full border-2 ${color}`}
    ></div>
  );
};

export default Circle;
