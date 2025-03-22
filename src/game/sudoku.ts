export type Grid = number[][];

export function generateGrid(): Grid {
  const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  solve(grid);
  return grid;
}

export function removeNumbers(grid: Grid, difficulty: number): Grid {
  const cellsToRemove = Math.min(Math.max(20 + (difficulty - 1) * 10, 20), 60); // 20 to 60 cells
  const puzzle = grid.map(row => [...row]);
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  return puzzle;
}

export function isSudokuValid(grid: Grid): boolean {
  for (let row = 0; row < 9; row++) {
    const set = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num === 0 || set.has(num)) return false;
      set.add(num);
    }
  }
  for (let col = 0; col < 9; col++) {
    const set = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const num = grid[row][col];
      if (num === 0 || set.has(num)) return false;
      set.add(num);
    }
  }
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const set = new Set<number>();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const row = boxRow * 3 + i;
          const col = boxCol * 3 + j;
          const num = grid[row][col];
          if (num === 0 || set.has(num)) return false;
          set.add(num);
        }
      }
    }
  }
  return true;
}

function solve(grid: Grid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValid(grid: Grid, row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}