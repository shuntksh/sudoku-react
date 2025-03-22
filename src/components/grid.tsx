import type { Grid } from "../game/sudoku";
import Cell from "./cell";

interface SudokuGridProps {
	grid: Grid;
	puzzle: Grid;
	selectedCell: { row: number; col: number } | null;
	onCellClick: (row: number, col: number) => void;
}

function SudokuGrid({
	grid,
	puzzle,
	selectedCell,
	onCellClick,
}: SudokuGridProps) {
	// Create cell elements directly without using array map
	const cellElements = [];

	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			cellElements.push(
				<Cell
					key={`sudoku-cell-${r}-${c}`}
					value={grid[r][c]}
					isPrefilled={puzzle[r][c] !== 0}
					isSelected={selectedCell?.row === r && selectedCell?.col === c}
					onClick={() => onCellClick(r, c)}
					className={getCellClass(r, c)}
				/>,
			);
		}
	}

	return (
		<div className="grid grid-cols-9 gap-0 bg-gray-100 p-1 rounded">
			{cellElements}
		</div>
	);
}

function getCellClass(row: number, col: number): string {
	let classes = "border border-gray-300";
	if (row % 3 === 0) classes += " border-t-2 border-t-gray-500";
	if (col % 3 === 0) classes += " border-l-2 border-l-gray-500";
	if (row === 8) classes += " border-b-2 border-b-gray-500";
	if (col === 8) classes += " border-r-2 border-r-gray-500";
	return classes;
}

export default SudokuGrid;
