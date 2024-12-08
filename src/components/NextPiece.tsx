interface NextPieceProps {
  piece: {
    shape: number[][];
    color: string;
  } | null;
}

export const NextPiece = ({ piece }: NextPieceProps) => {
  if (!piece) return null;

  return (
    <div className="grid gap-[1px] bg-gray-700 p-[1px]">
      {piece.shape.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-7 h-7 ${cell ? piece.color : 'bg-gray-900'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
