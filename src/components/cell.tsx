interface CellProps {
	value: number;
	isPrefilled: boolean;
	isSelected: boolean;
	onClick: () => void;
	className?: string;
}

function Cell({
	value,
	isPrefilled,
	isSelected,
	onClick,
	className,
}: CellProps) {

	return (
		<div
			className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-xl font-medium cursor-pointer ${
				isPrefilled ? "text-gray-600 font-bold bg-gray-200 pointer-events-none cursor-auto" : "text-blue-600"
			} ${isSelected ? "bg-blue-100" : ""} ${className}`}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onClick();
				}
			}}
			aria-label={value ? `Cell with value ${value}` : "Empty cell"}
		>
			{value !== 0 ? value : ""}
		</div>
	);
}

export default Cell;
