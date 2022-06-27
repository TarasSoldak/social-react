import React from "react";
import { WrappedFieldsProps } from "redux-form";
import "./field.css";
type CreateFieldType={
  label:string
  type:string

}
const CreateField: React.FC<WrappedFieldsProps & CreateFieldType> = ({
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
