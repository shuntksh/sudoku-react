import type React from "react";
import IconButton from "./icon-button";

interface ControlSectionProps {
  onNewGame: () => void;
  onUndo: () => void;
  onErase: () => void;
  onHint: () => void;
}

const ControlSection: React.FC<ControlSectionProps> = ({
  onNewGame,
  onUndo,
  onErase,
  onHint
}) => {
  return (
    <div className="w-full grid bg-white p-2 grid-cols-4 gap-4 md:mb-4">
      <IconButton
        onClick={onNewGame}
        label="New"
        ariaLabel="New Game"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>New Game</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        }
      />
      <IconButton
        onClick={onUndo}
        label="Undo"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>Undo</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
          </svg>
        }
      />
      <IconButton
        onClick={onErase}
        label="Erase"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>Erase</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        }
      />
      <IconButton
        onClick={onHint}
        label="Hint"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>Hint</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />
    </div>
  );
};

export default ControlSection; 