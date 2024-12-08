import { useState, useEffect, useCallback } from 'react';

// Tetromino shapes - including classic and unique shapes
const TETROMINOES = {
  // Classic shapes
  I: {
    shape: [
      [1, 1, 1, 1]
    ],
    color: 'bg-cyan-400'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'bg-blue-500'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'bg-orange-500'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'bg-yellow-400'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'bg-green-500'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'bg-purple-500'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'bg-red-500'
  },
  // New unique shapes
  Plus: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    color: 'bg-pink-500'
  },
  U: {
    shape: [
      [1, 0, 1],
      [1, 1, 1]
    ],
    color: 'bg-indigo-500'
  },
  W: {
    shape: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'bg-teal-500'
  },
  X: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    color: 'bg-rose-500'
  },
  H: {
    shape: [
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1]
    ],
    color: 'bg-amber-500'
  },
  Pyramid: {
    shape: [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1]
    ],
    color: 'bg-lime-500'
  }
};

const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 20;
const BASE_SPEED = 1000;
const SPEED_INCREASE = 50;
const POINTS_PER_LEVEL = 200;
const CELEBRATION_THRESHOLD = 500;

type ControlScheme = 'arrows' | 'wasd';

export const useTetris = (controls: ControlScheme) => {
  const [board, setBoard] = useState<string[][]>(
    Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(''))
  );
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    position: { x: number; y: number };
    color: string;
  } | null>(null);
  const [nextPiece, setNextPiece] = useState<{
    shape: number[][];
    color: string;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [level, setLevel] = useState(1);
  const [lastCelebrationScore, setLastCelebrationScore] = useState(0);

  const getCurrentSpeed = useCallback(() => {
    return Math.max(BASE_SPEED - (level - 1) * SPEED_INCREASE, 100);
  }, [level]);

  const generatePiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOES);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof TETROMINOES;
    return {
      shape: TETROMINOES[randomPiece].shape,
      color: TETROMINOES[randomPiece].color
    };
  }, []);

  const initGame = useCallback(() => {
    const piece = generatePiece();
    setCurrentPiece({
      shape: piece.shape,
      position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2), y: 0 },
      color: piece.color
    });
    setNextPiece(generatePiece());
    setBoard(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill('')));
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setLevel(1);
    setLastCelebrationScore(0);
    setShowCelebration(false);
  }, [generatePiece]);

  const checkCollision = useCallback((piece: number[][], position: { x: number; y: number }) => {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x]) {
          const newX = position.x + x;
          const newY = position.y + y;
          
          if (
            newX < 0 || 
            newX >= BOARD_WIDTH || 
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX] !== '')
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, [board]);

  const rotatePiece = useCallback(() => {
    if (!currentPiece) return;
    
    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );

    let newPosition = { ...currentPiece.position };
    if (newPosition.x + rotated[0].length > BOARD_WIDTH) {
      newPosition.x = BOARD_WIDTH - rotated[0].length;
    }

    if (!checkCollision(rotated, newPosition)) {
      setCurrentPiece({
        ...currentPiece,
        shape: rotated,
        position: newPosition
      });
    }
  }, [currentPiece, checkCollision]);

  const movePiece = useCallback((dx: number) => {
    if (!currentPiece) return;

    const newPosition = { ...currentPiece.position, x: currentPiece.position.x + dx };
    if (!checkCollision(currentPiece.shape, newPosition)) {
      setCurrentPiece({
        ...currentPiece,
        position: newPosition
      });
    }
  }, [currentPiece, checkCollision]);

  const updateLevel = useCallback((newScore: number) => {
    const newLevel = Math.floor(newScore / POINTS_PER_LEVEL) + 1;
    setLevel(newLevel);

    if (Math.floor(newScore / CELEBRATION_THRESHOLD) > Math.floor(lastCelebrationScore / CELEBRATION_THRESHOLD)) {
      setShowCelebration(true);
      setLastCelebrationScore(newScore);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [lastCelebrationScore]);

  const dropPiece = useCallback(() => {
    if (!currentPiece) return;

    const newPosition = { ...currentPiece.position, y: currentPiece.position.y + 1 };
    if (!checkCollision(currentPiece.shape, newPosition)) {
      setCurrentPiece({
        ...currentPiece,
        position: newPosition
      });
    } else {
      const newBoard = board.map(row => [...row]);
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = currentPiece.position.y + y;
            if (boardY >= 0) {
              newBoard[boardY][currentPiece.position.x + x] = currentPiece.color;
            }
          }
        });
      });

      let completedLines = 0;
      for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        if (newBoard[y].every(cell => cell !== '')) {
          newBoard.splice(y, 1);
          newBoard.unshift(Array(BOARD_WIDTH).fill(''));
          completedLines++;
          y++;
        }
      }

      if (completedLines > 0) {
        const newScore = score + (completedLines * 100);
        setScore(newScore);
        updateLevel(newScore);
      }

      setBoard(newBoard);

      const piece = nextPiece!;
      const newPiecePosition = { 
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2), 
        y: 0 
      };
      
      if (checkCollision(piece.shape, newPiecePosition)) {
        setGameOver(true);
      } else {
        setCurrentPiece({
          shape: piece.shape,
          position: newPiecePosition,
          color: piece.color
        });
        setNextPiece(generatePiece());
      }
    }
  }, [currentPiece, board, nextPiece, checkCollision, generatePiece, score, updateLevel]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const interval = setInterval(() => {
      dropPiece();
    }, getCurrentSpeed());

    return () => clearInterval(interval);
  }, [dropPiece, gameOver, isPaused, getCurrentSpeed]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameOver || isPaused) return;

      if (controls === 'arrows') {
        switch (event.key) {
          case 'ArrowLeft':
            movePiece(-1);
            break;
          case 'ArrowRight':
            movePiece(1);
            break;
          case 'ArrowDown':
            dropPiece();
            break;
          case 'ArrowUp':
            rotatePiece();
            break;
        }
      } else {
        switch (event.key.toLowerCase()) {
          case 'a':
            movePiece(-1);
            break;
          case 'd':
            movePiece(1);
            break;
          case 's':
            dropPiece();
            break;
          case 'w':
            rotatePiece();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, dropPiece, rotatePiece, gameOver, isPaused, controls]);

  const getDisplayBoard = useCallback(() => {
    const displayBoard = board.map(row => [...row]);
    
    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value && currentPiece.position.y + y >= 0) {
            displayBoard[currentPiece.position.y + y][currentPiece.position.x + x] = currentPiece.color;
          }
        });
      });
    }
    
    return displayBoard;
  }, [board, currentPiece]);

  return {
    board: getDisplayBoard(),
    score,
    gameOver,
    nextPiece,
    isPaused,
    initGame,
    setIsPaused,
    showCelebration,
    level
  };
};
