import { Gauge, Pause, Play, RotateCcw } from 'lucide-react';
import { Board } from './Board';
import { NextPiece } from './NextPiece';
import { Controls } from './Controls';

interface PlayerBoardProps {
  player: {
    board: string[][];
    score: number;
    gameOver: boolean;
    nextPiece: {
      shape: number[][];
      color: string;
    } | null;
    isPaused: boolean;
    setIsPaused: (paused: boolean) => void;
    initGame: () => void;
    level: number;
  };
  playerName: string;
  controls: React.ReactNode;
}

export const PlayerBoard = ({ player, playerName, controls }: PlayerBoardProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">{playerName}</h2>
      <div className="flex gap-8">
        <div>
          <Board board={player.board} />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">下一个方块:</h2>
            <NextPiece piece={player.nextPiece} />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">分数:</h2>
            <p className="text-2xl font-bold text-gray-900">{player.score}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              等级: {player.level}
            </h2>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${(player.level % 5) * 25}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {!player.gameOver && (
              <button
                onClick={() => player.setIsPaused(!player.isPaused)}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {player.isPaused ? (
                  <>
                    <Play className="w-4 h-4" />
                    继续
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4" />
                    暂停
                  </>
                )}
              </button>
            )}
          </div>

          {controls}
        </div>
      </div>
    </div>
  );
};
