import { useState } from "react";
import ControlSection from "./components/control-buttons";
import SudokuGrid from "./components/grid";
import NumberPad from "./components/number-pad";
import Timer from "./components/timer";
import useSudoku from "./hooks/use-sudoku";
import "./styles.css";

function App() {
	const { state, newGame, setCell, selectCell, checkSolution, undo, hint } = useSudoku();
	const [showModalDifficulty, setShowModalDifficulty] = useState(false);
	
	function handleNumberClick(number: number) {
		if (state.selectedCell) {
			setCell(state.selectedCell.row, state.selectedCell.col, number);
		}
	}
	
	function handleClearClick() {
		if (state.selectedCell) {
			setCell(state.selectedCell.row, state.selectedCell.col, 0);
		}
	}
	
	function handleNewGame(difficulty: number) {
		newGame(difficulty);
		setShowModalDifficulty(false);
	}
	
	return (
		<div className="min-h-screen bg-white flex flex-col items-center p-4 max-w-md mx-auto">
			{/* Header */}
			<h1 className="text-2xl font-bold text-gray-700 mb-4">Sudoku</h1>
			
			{/* Game Stats */}
			<div className="w-full grid grid-cols-4 gap-2 mb-4 text-center font-mono">
				<div>
					<div className="text-sm text-gray-500">Difficulty</div>
					<div className="font-semibold">Medium</div>
				</div>
				<div>
					<div className="text-sm text-gray-500">Mistakes</div>
					<div className="font-semibold">{state.mistakes}/3</div>
				</div>
				<div>
					<div className="text-sm text-gray-500">Score</div>
					<div className="font-semibold">{state.score}</div>
				</div>
				<div>
					<div className="text-sm text-gray-500">Time</div>
					<Timer startTime={state.startTime} />
				</div>
			</div>
			
			{/* Sudoku Grid */}
			<div className="w-full mb-4">
				<SudokuGrid
					grid={state.grid}
					puzzle={state.puzzle}
					selectedCell={state.selectedCell}
					onCellClick={selectCell}
				/>
			</div>
			
			{/* Control Buttons */}
			<ControlSection
				onNewGame={() => setShowModalDifficulty(true)}
				onUndo={undo}
				onErase={handleClearClick}
				onHint={() => hint()}
			/>
			
			{/* Number Pad */}
			<NumberPad 
				onNumberClick={handleNumberClick} 
				onClearClick={handleClearClick} 
			/>
			
			{/* Difficulty Modal */}
			{showModalDifficulty && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-80">
						<h2 className="text-xl font-bold mb-4">Select Difficulty</h2>
						<div className="grid grid-cols-1 gap-2">
							{['Easy', 'Medium', 'Hard', 'Expert', 'Master'].map((level, index) => (
								<button
									key={level}
									type="button"
									className="py-2 px-4 bg-blue-100 hover:bg-blue-200 rounded text-left"
									onClick={() => handleNewGame(index + 1)}
								>
									{level}
								</button>
							))}
						</div>
						<button
							type="button"
							className="mt-4 w-full py-2 bg-gray-200 hover:bg-gray-300 rounded"
							onClick={() => setShowModalDifficulty(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
			
			{/* Game Completed Modal */}
			{state.status === "solved" && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
						<h2 className="text-xl font-bold mb-2">Puzzle Solved!</h2>
						<p className="mb-4">Congratulations! You've completed the puzzle.</p>
						<div className="grid grid-cols-2 gap-2 mb-4">
							<div>
								<div className="text-sm text-gray-500">Score</div>
								<div className="font-bold text-xl">{state.score}</div>
							</div>
							<div>
								<div className="text-sm text-gray-500">Time</div>
								<div className="font-bold text-xl">
									<Timer startTime={state.startTime} />
								</div>
							</div>
						</div>
						<button
							type="button"
							className="w-full py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
							onClick={() => setShowModalDifficulty(true)}
						>
							New Game
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
