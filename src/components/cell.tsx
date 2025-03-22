interface CellProps {
  value: number;
  isPrefilled: boolean;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

function Cell({ value, isPrefilled, isSelected, onClick, className }: CellProps) {
  return (
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg font-medium cursor-pointer ${
        isPrefilled ? 'text-gray-800 font-bold' : 'text-blue-500'
      } ${isSelected ? 'bg-blue-100' : 'bg-white'} ${className}`}
      onClick={onClick}
    >
      {value !== 0 ? value : ''}
    </div>
  );
}

export default Cell;