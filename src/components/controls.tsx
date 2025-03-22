import { useState } from 'react';

interface ControlsProps {
  onNewGame: (difficulty: number) => void;
  onCheckSolution: () => void;
}

function Controls({ onNewGame, onCheckSolution }: ControlsProps) {
  const [difficulty, setDifficulty] = useState(3);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <label className="text-lg text-gray-800">Difficulty:</label>
        <select
          value={difficulty}
          onChange={e => setDifficulty(Number(e.target.value))}
          className="border rounded p-1 bg-white text-gray-800"
        >
          {[1, 2, 3, 4, 5].map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={() => onNewGame(difficulty)}
      >
        New Game
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={onCheckSolution}
      >
        Check Solution
      </button>
    </div>
  );
}

export default Controls;