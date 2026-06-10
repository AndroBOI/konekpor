import Game from "./components/Game";
import { GameProvider } from "./context/GameProvider";
import Winner from "./components/Winner";

const App = () => {
  return (
    <GameProvider>
      <div className="flex flex-col w-screen items-center justify-center">
        <Game />
        <Winner />
      </div>
    </GameProvider>
  );
};

export default App;
