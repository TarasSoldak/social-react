 type ValidateType = (value:string)=>string | undefined
export const required: ValidateType = (value) => (value ? undefined : "Required");

export const maxLength = (max:number): ValidateType => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min:number): ValidateType => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
