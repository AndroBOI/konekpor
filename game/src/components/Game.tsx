import Circle from "./Circle";

const Game = () => {
  return (
    <div className="inline-grid grid-cols-7 grid-rows-6 border-2 rounded-xl p-5 place-items-center gap-2 shadow-lg">
      {Array.from({ length: 42 }).map((_, i) => (
        <Circle key={i} index={i} />
      ))}
    </div>
  );
};

export default Game;
