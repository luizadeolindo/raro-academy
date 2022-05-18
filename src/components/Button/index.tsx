import "./Button.css";
import { ButtonProps } from "./ButtonTypes";

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  disabled = false,
}) => {
  return (
    <button type={type} disabled={disabled} className="btnForm">
      <p>{children}</p>
    </button>
  );
};
