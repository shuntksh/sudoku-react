import { useEffect, useState } from "react";
import { type Grid, generateGrid, removeNumbers } from "../sudoku";

type GameStatus = "playing" | "solved";

export interface SudokuState {
	puzzle: Grid;
	grid: Grid;
	solution: Grid;
	status: GameStatus;
	startTime: number;
	difficulty: number;
	selectedCell: { row: number; col: number } | null;
	score: number;
	mistakes: number;
	moves: Array<{ row: number; col: number; oldValue: number; newValue: number }>;
}

const STORAGE_KEY = "sudoku-game-state";

function useSudoku(initialState?: SudokuState) {
	const [state, setState] = useState<SudokuState>(() => {
		// Try to load from localStorage first
		const savedState = localStorage.getItem(STORAGE_KEY);
		if (savedState) {
			try {
				return JSON.parse(savedState);
			} catch (e) {
				console.error("Failed to parse saved game state:", e);
			}
		}

		// Otherwise use initialState or generate new game
		return {
			...(initialState || generateNewGame(3)),
			selectedCell: null,
			moves: [],
		};
	});

	// Save state to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}, [state]);

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
			score: 260,
			mistakes: 0,
			moves: [],
		};
	}

	function newGame(difficulty: number) {
		setState(generateNewGame(difficulty));
	}

	function setCell(row: number, col: number, value: number) {
		if (state.puzzle[row][col] === 0 && state.status === "playing") {
			const newGrid = state.grid.map((r: number[]) => [...r]);
			const oldValue = newGrid[row][col];
			newGrid[row][col] = value;

			// Track this move for undo
			const newMoves = [...state.moves, { row, col, oldValue, newValue: value }];

			// Check if move is correct
			const isCorrect = value === 0 || value === state.solution[row][col];
			const newMistakes = isCorrect ? state.mistakes : state.mistakes + 1;

			// Update score: -1 for each wrong move
			const newScore = isCorrect ? state.score : Math.max(0, state.score - 1);

			// Check if the puzzle is solved
			const newStatus = checkSolutionInternal(newGrid) ? "solved" : "playing";

			setState({
				...state,
				grid: newGrid,
				moves: newMoves,
				mistakes: newMistakes,
				score: newScore,
				status: newStatus
			});
		}
	}

	function selectCell(row: number, col: number) {
		setState({ ...state, selectedCell: { row, col } });
	}

	function undo() {
		if (state.moves.length > 0) {
			const lastMove = state.moves[state.moves.length - 1];
			const newGrid = state.grid.map((r: number[]) => [...r]);
			newGrid[lastMove.row][lastMove.col] = lastMove.oldValue;

			setState({
				...state,
				grid: newGrid,
				moves: state.moves.slice(0, -1),
				selectedCell: { row: lastMove.row, col: lastMove.col }
			});
		}
	}

	function checkSolutionInternal(grid: Grid): boolean {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (grid[row][col] !== state.solution[row][col]) {
					return false;
				}
			}
		}
		return true;
	}

	function checkSolution(): boolean {
		const isSolved = checkSolutionInternal(state.grid);
		if (isSolved) {
			setState({ ...state, status: "solved" });
		}
		return isSolved;
	}

	function hint() {
		if (state.selectedCell && state.puzzle[state.selectedCell.row][state.selectedCell.col] === 0) {
			const { row, col } = state.selectedCell;
			const correctValue = state.solution[row][col];
			const newGrid = state.grid.map((r: number[]) => [...r]);
			const oldValue = newGrid[row][col];
			newGrid[row][col] = correctValue;

			setState({
				...state,
				grid: newGrid,
				moves: [...state.moves, { row, col, oldValue, newValue: correctValue }],
				// Check if puzzle is solved after hint
				status: checkSolutionInternal(newGrid) ? "solved" : "playing"
			});
		}
	}

	return {
		state,
		newGame,
		setCell,
		selectCell,
		checkSolution,
		undo,
		hint
	};
}

export default useSudoku;
