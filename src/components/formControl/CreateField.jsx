import React from "react";
import "./field.css";

const CreateField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => {
  return (
    <div className="field">
      <label>{<b>{label}</b>}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          ((error && <span className="error">{error}</span>) ||
            (warning && <span className="error">{warning}</span>))}
      </div>
    </div>
  );
};

export default CreateField;
