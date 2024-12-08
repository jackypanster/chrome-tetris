import { Play, Pause, RotateCcw, Gauge } from 'lucide-react';
import { Board } from './components/Board';
import { NextPiece } from './components/NextPiece';
import { Controls } from './components/Controls';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useTetris } from './hooks/useTetris';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { PlayerBoard } from './components/PlayerBoard';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const player1 = useTetris('arrows');
  const player2 = useTetris('wasd');

  const handleStartGame = () => {
    setGameStarted(true);
    player1.initGame();
    player2.initGame();
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <WelcomeScreen onStartGame={handleStartGame} />
      </div>
    );
  }

  const showCelebration = player1.showCelebration || player2.showCelebration;

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative overflow-hidden">
      {showCelebration && <Confetti numberOfPieces={200} recycle={false} />}
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">双人 Tetris</h1>
          <p className="text-gray-600">玩家1: WASD控制 | 玩家2: 方向键控制</p>
        </div>

        <div className="flex justify-center gap-16">
          {/* Player 1 */}
          <PlayerBoard
            player={player2}
            playerName="玩家1 (WASD)"
            controls={<Controls type="wasd" />}
          />

          {/* Divider */}
          <div className="w-px bg-gray-200" />

          {/* Player 2 */}
          <PlayerBoard
            player={player1}
            playerName="玩家2 (方向键)"
            controls={<Controls type="arrows" />}
          />
        </div>

        {(player1.gameOver || player2.gameOver) && (
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold text-red-500 mb-2">游戏结束!</h2>
            {player1.gameOver && player2.gameOver ? (
              <p className="text-gray-600">双方游戏结束!</p>
            ) : player1.gameOver ? (
              <p className="text-gray-600">玩家2获胜!</p>
            ) : (
              <p className="text-gray-600">玩家1获胜!</p>
            )}
            <button
              onClick={() => {
                player1.initGame();
                player2.initGame();
              }}
              className="mt-4 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              重新开始
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
