import { Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export const WelcomeScreen = ({ onStartGame }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-5xl font-bold text-gray-900">双人 Tetris</h1>
      
      <div className="grid grid-cols-2 gap-12 max-w-2xl">
        <div>
          <h2 className="text-xl font-bold mb-4">玩家1 控制</h2>
          <ul className="text-gray-600 space-y-2">
            <li>A D 左右移动方块</li>
            <li>S 加速下落</li>
            <li>W 旋转方块</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">玩家2 控制</h2>
          <ul className="text-gray-600 space-y-2">
            <li>← → 左右移动方块</li>
            <li>↓ 加速下落</li>
            <li>↑ 旋转方块</li>
          </ul>
        </div>
      </div>

      <button
        onClick={onStartGame}
        className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
      >
        <Play className="w-5 h-5" />
        开始游戏
      </button>
    </div>
  );
};
