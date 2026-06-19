import { GameProvider } from "./context/GameProvider";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import GamePage from "./pages/game-page";
import RoomPage from "./pages/create-room-page";
import JoinRoomPage from "./pages/join-room-page";

const App = () => {
  return (
    <GameProvider>
      <div className="flex min-h-screen justify-center items-center">
        <Routes>
          <Route path="/game" element={<GamePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:id" element={<RoomPage />} />
          <Route path="/join-room" element={<JoinRoomPage />} />
        </Routes>
      </div>
    </GameProvider>
  );
};

export default App;
