interface NumberPadProps {
  onNumberClick: (number: number) => void;
  onClearClick: () => void;
}

function NumberPad({ onNumberClick, onClearClick }: NumberPadProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4 max-w-xs mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button
          key={num}
          className="w-14 h-14 bg-gray-200 text-black text-xl rounded-full shadow-sm hover:bg-blue-100 active:bg-blue-200 transition-all flex items-center justify-center"
          onClick={() => onNumberClick(num)}
        >
          {num}
        </button>
      ))}
      <button
        className="w-full h-14 bg-gray-400 text-white text-xl rounded-full shadow-sm hover:bg-gray-500 active:bg-gray-600 transition-all col-span-3 flex items-center justify-center"
        onClick={onClearClick}
      >
        Clear
      </button>
    </div>
  );
}

export default NumberPad;