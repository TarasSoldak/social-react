import React from "react";
import "./button.css";
type ButtonType={
  title:string
  disabled:boolean
  onClick?:()=>void
}
const Button: React.FC<ButtonType> = ({ title, onClick, disabled }) => {
  return (
    <div className="button">
      <button onClick={onClick} disabled={disabled}>
        {title}
      </button>
    </div>
  );
};

export default Button;
