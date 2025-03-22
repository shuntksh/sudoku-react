export type Grid = number[][];

export function generateGrid(): Grid {
	const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
	solve(grid);
	return grid;
}

export function removeNumbers(grid: Grid, difficulty: number): Grid {
	const cellsToRemove = Math.min(Math.max(20 + (difficulty - 1) * 10, 20), 60); // 20, 30, 40, 50, 60
	const pairsToRemove = cellsToRemove / 2; // Always even, so pairs work
	const puzzle = grid.map(row => [...row]);
	const removedPositions = new Set<string>();
	let pairsRemoved = 0;

	while (pairsRemoved < pairsToRemove) {
		let row: number;
		let col: number;
		do {
			row = Math.floor(Math.random() * 9);
			col = Math.floor(Math.random() * 9);
		} while (removedPositions.has(`${row},${col}`) || removedPositions.has(`${8 - row},${8 - col}`));

		removedPositions.add(`${row},${col}`);
		removedPositions.add(`${8 - row},${8 - col}`);
		puzzle[row][col] = 0;
		puzzle[8 - row][8 - col] = 0;
		pairsRemoved++;
	}
	return puzzle;
}

export function isPartialSudokuValid(grid: Grid): boolean {
	// Check rows
	for (let row = 0; row < 9; row++) {
		const seen = new Set<number>();
		for (let col = 0; col < 9; col++) {
			const num = grid[row][col];
			if (num !== 0) {
				if (seen.has(num)) return false;
				seen.add(num);
			}
		}
	}
	// Check columns
	for (let col = 0; col < 9; col++) {
		const seen = new Set<number>();
		for (let row = 0; row < 9; row++) {
			const num = grid[row][col];
			if (num !== 0) {
				if (seen.has(num)) return false;
				seen.add(num);
			}
		}
	}
	// Check 3x3 boxes
	for (let boxRow = 0; boxRow < 3; boxRow++) {
		for (let boxCol = 0; boxCol < 3; boxCol++) {
			const seen = new Set<number>();
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					const row = boxRow * 3 + i;
					const col = boxCol * 3 + j;
					const num = grid[row][col];
					if (num !== 0) {
						if (seen.has(num)) return false;
						seen.add(num);
					}
				}
			}
		}
	}
	return true;
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
