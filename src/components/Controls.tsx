import { ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

interface ControlsProps {
  type: 'arrows' | 'wasd';
}

export const Controls = ({ type }: ControlsProps) => {
  if (type === 'arrows') {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">控制:</h3>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> 左移
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> 右移
          </div>
          <div className="flex items-center gap-2">
            <ArrowDown className="w-4 h-4" /> 下落
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> 旋转 (上箭头)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">控制:</h3>
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-bold">A</span> 左移
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">D</span> 右移
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">S</span> 下落
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">W</span> 旋转
        </div>
      </div>
    </div>
  );
};
