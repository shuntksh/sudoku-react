
interface NumberPadProps {
  onNumberClick: (number: number) => void;
  onClearClick: () => void;
}

function NumberPad({ onNumberClick, onClearClick }: NumberPadProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-9 gap-4 bg-white p-2">
        {numbers.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onNumberClick(num)}
            className="aspect-square flex items-center justify-center text-2xl font-semibold text-blue-600 bg-white rounded-lg shadow hover:bg-blue-50 my-2"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NumberPad; 