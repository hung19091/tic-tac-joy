import { create } from 'zustand';
// 定義玩家類型 'X' 或 'O'
export type Player = 'X' | 'O';
// 定義遊戲方塊的狀態，可以是玩家，也可以是 null (空的)
export type SquareState = Player | null;
// 定義遊戲狀態的介面
interface GameState {
  board: SquareState[]; // 9個格子的遊戲板
  currentPlayer: Player; // 當前輪到的玩家
  winner: Player | null; // 獲勝者，若無則為 null
  isDraw: boolean; // 是否平手
  winningLine: number[] | null; // 獲勝的連線索引
  makeMove: (index: number) => void; // 下棋的動作
  newGame: () => void; // 開始新遊戲���動作
}
// 檢查獲勝條件的輔助函式
const calculateWinner = (squares: SquareState[]): { winner: Player | null; line: number[] | null } => {
  // 所有可��的獲勝組合
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫排
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 直排
    [0, 4, 8], [2, 4, 6],             // 斜線
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // 如果一條線上的三個格子都是同一個玩家，且不為空
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] }; // 返回獲勝者和獲勝線
    }
  }
  return { winner: null, line: null }; // 沒有獲勝者
};
// 創建 Zustand store
export const useGameStore = create<GameState>((set, get) => ({
  // 初始狀態
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
  winningLine: null,
  // 下棋的動作實現
  makeMove: (index: number) => {
    const { board, currentPlayer, winner } = get();
    // 如果該格子已經被下過，或者已經有贏家，則不做任何事
    if (board[index] || winner) {
      return;
    }
    // 創建新的遊戲板狀態
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    // 檢查是否有贏家
    const { winner: newWinner, line: winningLine } = calculateWinner(newBoard);
    // 檢查是否平手 (所有格子都滿了且沒有贏家)
    const isDraw = !newWinner && newBoard.every(square => square !== null);
    // 更新���態
    set({
      board: newBoard,
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X', // 切換玩家
      winner: newWinner,
      isDraw: isDraw,
      winningLine: winningLine,
    });
  },
  // 開始新遊戲的動作實現
  newGame: () => {
    // 重置所有狀態到初始值
    set({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      winningLine: null,
    });
  },
}));