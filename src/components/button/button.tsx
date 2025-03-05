import { ReactNode } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rounded?: boolean;
  variant?: "primary" | "secondary" | "disable";
  className?: string;
}

export default function Button({
  label,
  onClick,
  leftIcon,
  rightIcon,
  rounded = false,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles = " duration-300 flex items-center justify-center gap-2 ";
  const roundedStyle = rounded ? "rounded-full" : "rounded-lg";

  const variantStyles = {
    primary: " bg-white text-black font-bold",
    disable: "bg-gray-300 text-white text-sm",
    secondary: "bg-primaryAvolta hover:bg-[#6a4ecc] text-white  ",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${roundedStyle} ${variantStyles[variant]} ${className}`}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {label}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
}
