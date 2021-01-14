import React from "react";
import "./button.css";

const Button = ({ title, onClick, disabled }) => {
  return (
    <div className="button">
      <button onClick={onClick} disabled={disabled}>
        {title}
      </button>
    </div>
  );
};

export default Button;
