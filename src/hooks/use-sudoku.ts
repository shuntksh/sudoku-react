import { useState } from "react";
import { type Grid, generateGrid, removeNumbers } from "../game/sudoku";

type GameStatus = "playing" | "solved";

export interface SudokuState {
	puzzle: Grid;
	grid: Grid;
	solution: Grid;
	status: GameStatus;
	startTime: number;
	difficulty: number;
	selectedCell: { row: number; col: number } | null;
}

function useSudoku(initialState?: SudokuState) {
	const [state, setState] = useState<SudokuState>(() => ({
		...(initialState || generateNewGame(3)),
		selectedCell: null,
	}));

	function generateNewGame(difficulty: number): SudokuState {
		const solution = generateGrid();
		const puzzle = removeNumbers(solution, difficulty);
		const grid = puzzle.map((row) => [...row]);
		return {
			puzzle,
			grid,
			solution,
			status: "playing",
			startTime: Date.now(),
			difficulty,
			selectedCell: null,
		};
	}

	function newGame(difficulty: number) {
		setState(generateNewGame(difficulty));
	}

	function setCell(row: number, col: number, value: number) {
		if (state.puzzle[row][col] === 0) {
			const newGrid = state.grid.map((r: number[]) => [...r]);
			newGrid[row][col] = value;
			setState({ ...state, grid: newGrid });
		}
	}

	function selectCell(row: number, col: number) {
		setState({ ...state, selectedCell: { row, col } });
	}

	function checkSolution(): boolean {
		return JSON.stringify(state.grid) === JSON.stringify(state.solution);
	}

	return {
		state,
		newGame,
		setCell,
		selectCell,
		checkSolution,
	};
}

export default useSudoku;
