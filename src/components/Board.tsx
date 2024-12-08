interface BoardProps {
  board: string[][];
}

export const Board = ({ board }: BoardProps) => {
  return (
    <div className="grid gap-[1px] bg-gray-700 p-[1px]">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-7 h-7 ${cell || 'bg-gray-900'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
