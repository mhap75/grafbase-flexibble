import Image from "next/image";
import { memo } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  leftIcon?: string | null;
  rightIcon?: string | null;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  className,
  loading,
  leftIcon,
  rightIcon,
}) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`flexCenter gap-3 rounded-lg p-3 hover:opacity-70 disabled:cursor-progress disabled:opacity-50 ${className}`}
      disabled={loading}
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="left icon" />
      )}
      {loading ? "Loading ..." : children}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="left icon" />
      )}
    </button>
  );
};

export default memo(Button);
