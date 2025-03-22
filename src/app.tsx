import { useEffect, useState } from 'react';
import Controls from './components/controls';
import SudokuGrid from './components/grid';
import History from './components/history';
import NumberPad from './components/number-pad';
import Timer from './components/timer';
import useLocalStorage from './hooks/use-local-storage';
import useSudoku, { SudokuState } from './hooks/use-sudoku';
import "./styles.css";

interface GameHistoryEntry {
  date: string;
  difficulty: number;
  timeTaken: number;
}

function App() {
  const { save, load } = useLocalStorage();
  const initialState: SudokuState | undefined = load('currentGame') || undefined;
  const { state, newGame, setCell, selectCell, checkSolution } = useSudoku(initialState);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const { selectedCell, ...saveState } = state;
    save('currentGame', saveState);
  }, [state, save]);

  const handleCheckSolution = () => {
    if (checkSolution()) {
      const timeTaken = Math.floor((Date.now() - state.startTime) / 1000);
      const entry: GameHistoryEntry = {
        date: new Date().toISOString(),
        difficulty: state.difficulty,
        timeTaken,
      };
      const history: GameHistoryEntry[] = load('gameHistory') || [];
      save('gameHistory', [...history, entry]);
      alert(`Solved! Time taken: ${timeTaken} seconds`);
      setCell(0, 0, state.grid[0][0]); // Trigger re-render
    } else {
      alert('Not solved yet.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Header with Title, Timer, and Hamburger Menu */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-500">Sudoku</h1>
        <div className="flex items-center space-x-4">
          <Timer startTime={state.startTime} />
          <button
            className="text-gray-800 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="p-4">
          <button
            className="text-gray-800 mb-4 focus:outline-none"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Controls
            onNewGame={newGame}
            onCheckSolution={handleCheckSolution}
          />
          <History />
        </div>
      </div>

      {/* Overlay for closing menu on click outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-2xl">
        <SudokuGrid
          grid={state.grid}
          puzzle={state.puzzle}
          selectedCell={state.selectedCell}
          onCellClick={selectCell}
        />
        {state.selectedCell && (
          <NumberPad
            onNumberClick={(num) => state.selectedCell && setCell(state.selectedCell.row, state.selectedCell.col, num)}
            onClearClick={() => state.selectedCell && setCell(state.selectedCell.row, state.selectedCell.col, 0)}
          />
        )}
      </div>
    </div>
  );
}

export default App;