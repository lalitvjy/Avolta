import { ReactNode } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  rounded?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  label,
  onClick,
  icon,
  rounded = false,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "px-6 py-2   duration-300 flex items-center justify-center gap-2 border";
  const roundedStyle = rounded ? "rounded-full" : "rounded-lg";

  const variantStyles = {
    primary: "text-sm ",
    secondary: "bg-[#7A5CE0] hover:bg-[#6a4ecc] text-white text-sm",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${roundedStyle} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}
