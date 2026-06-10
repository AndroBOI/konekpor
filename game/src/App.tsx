import Game from "./components/Game";
import { GameProvider } from "./context/GameProvider";

const App = () => {
  return (
    <GameProvider>
      <div className="flex h-screen w-screen items-center justify-center">
        <Game />
      </div>
    </GameProvider>
  );
};

export default App;
