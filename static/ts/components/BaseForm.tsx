import * as React from "react";

interface LabelProps {
  label: string;
  errorMsg: string | number;
  inputName: string;
}

interface InputProps extends LabelProps {
  inputType: "number" | "text";
  inputValue: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextInputProps extends LabelProps {
  inputValue: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Label: React.FC<LabelProps> = ({
  label,
  inputName,
  errorMsg,
  ...props
}) => (
  <div className="form-group">
    <label htmlFor={inputName}>{label}</label>
    {props.children}
    {errorMsg && <div className="errors">{errorMsg}</div>}
  </div>
);

export const Input: React.FC<InputProps> = ({
  label,
  inputName,
  inputType,
  inputValue,
  errorMsg,
  onChange,
}) => (
  <Label label={label} errorMsg={errorMsg} inputName={inputName}>
    <input
      className="form-control"
      id={inputName}
      name={inputName}
      type={inputType}
      value={inputValue}
      onChange={onChange}
    />
  </Label>
);

export const TextInput: React.FC<TextInputProps> = ({
  label,
  inputName,
  inputValue,
  errorMsg,
  onChange,
}) => (
  <Input
    label={label}
    inputName={inputName}
    inputType="text"
    inputValue={inputValue}
    errorMsg={errorMsg}
    onChange={onChange}
  />
);
