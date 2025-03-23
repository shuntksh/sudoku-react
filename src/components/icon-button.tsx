import type React from "react";

interface IconButtonProps {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  ariaLabel?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  onClick, 
  label, 
  icon, 
  ariaLabel 
}) => {
  return (
    <button 
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center p-2 bg-white hover:bg-gray-100 hover:shadow-md transition-all duration-200 hover:cursor-pointer"
      aria-label={ariaLabel || label}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default IconButton; 