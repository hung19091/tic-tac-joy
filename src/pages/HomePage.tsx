import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Circle, RefreshCw } from 'lucide-react';
import { useGameStore } from '@/hooks/useGameStore';
import type { Player, SquareState } from '@/hooks/useGameStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// 玩家���標組件
const PlayerIcon = ({ player, className }: { player: Player; className?: string }) => {
  // 根據玩家類型返回對應的圖標
  if (player === 'X') {
    return <X className={cn("h-1/2 w-1/2 text-joy-pink", className)} strokeWidth={4} />;
  }
  return <Circle className={cn("h-1/2 w-1/2 text-joy-yellow", className)} strokeWidth={4} />;
};
// 遊戲方塊組件
const Square = ({ value, onClick, isWinning }: { value: SquareState; onClick: () => void; isWinning: boolean }) => {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "flex aspect-square items-center justify-center rounded-2xl bg-background shadow-inner cursor-pointer transition-all duration-200",
        isWinning ? 'bg-green-200' : 'hover:bg-secondary hover:scale-105'
      )}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence>
        {value && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="h-full w-full flex items-center justify-center"
          >
            <PlayerIcon player={value} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
// 主頁面組件
export function HomePage() {
  // 從 Zustand store 中獲取狀態和動作
  // 每個狀態使用單獨�� selector 以優化性能，避免不必要的重新渲染
  const board = useGameStore((state) => state.board);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const winner = useGameStore((state) => state.winner);
  const isDraw = useGameStore((state) => state.isDraw);
  const winningLine = useGameStore((state) => state.winningLine);
  const makeMove = useGameStore((state) => state.makeMove);
  const newGame = useGameStore((state) => state.newGame);
  // 獲取遊戲狀態信息的函式
  const getStatusMessage = () => {
    if (winner) {
      return `${winner} 獲勝！`;
    }
    if (isDraw) {
      return '平手！';
    }
    return `輪到 ${currentPlayer} 了`;
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <main className="w-full max-w-md">
        <Card className="rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-primary/10">
          <CardContent className="p-0">
            <div className="space-y-6 text-center">
              {/* 遊戲標題 */}
              <h1 className="font-display text-4xl font-bold text-joy-blue">Tic-Tac-Joy</h1>
              {/* 遊戲狀態顯示 */}
              <div className="flex h-12 items-center justify-center text-xl font-medium text-muted-foreground">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={getStatusMessage()}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getStatusMessage()}
                  </motion.p>
                </AnimatePresence>
              </div>
              {/* 遊戲板 */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {board.map((square, i) => (
                  <Square
                    key={i}
                    value={square}
                    onClick={() => makeMove(i)}
                    isWinning={winningLine?.includes(i) ?? false}
                  />
                ))}
              </div>
              {/* 新遊戲按鈕 */}
              <Button
                onClick={newGame}
                size="lg"
                className="w-full bg-joy-blue text-lg font-semibold text-white hover:bg-joy-blue/90 active:scale-95 transition-transform duration-150"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                新遊戲
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </div>
  );
}