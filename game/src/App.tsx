import { GameProvider } from "./context/GameProvider";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import GamePage from "./pages/game-page";

const App = () => {
  return (
    <GameProvider>
      <div className="flex min-h-screen justify-center items-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </div>
    </GameProvider>
  );
};

export default App;
