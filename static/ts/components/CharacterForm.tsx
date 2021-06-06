import * as React from "react";
import { useState } from "react";

import { Input, Label } from "./BaseForm";

interface formData {
  name?: string;
  birthYear?: string;
  gender?: string;
}

const validate = (values: formData): formData => {
  const errors: formData = {};
  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.birthYear) {
    errors.birthYear = "Birth Year is required";
  } else if (!/^\d*\.?\d*\s?(ABY|BBY)/.test(values.birthYear)) {
    errors.birthYear = "Birth Year should be in 123 ABY or 123 BBY format";
  }

  const validGender = ["male", "female", "unknown", "n/a"];

  if (!values.gender) {
    errors.gender = "Gender is required";
  } else if (!validGender.indexOf(values.gender)) {
    errors.gender = `Gender should be in  ${validGender.join()}`;
  }

  return errors;
};

export const CreateCharacterForm = () => {
  const initialValue: formData = { name: "", birthYear: "", gender: "" };
  const [data, setData] = useState<formData>({ ...initialValue });
  const [errors, setErrors] = useState<formData>({ ...initialValue });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validate(data);
    setErrors(err);

    if (!err.name && !err.birthYear && !err.gender) {
      console.log("form submitted!");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        label="Name"
        inputName="name"
        inputType="text"
        inputValue={data.name}
        errorMsg={errors.name}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Input
        label="Birth Year"
        inputName="birthYear"
        inputType="text"
        inputValue={data.birthYear}
        errorMsg={errors.birthYear}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Label label="Gender" inputName="gender" errorMsg="">
        <select
          className="form-control"
          name="gender"
          id="gender"
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unknown">Unknown</option>
          <option value="n/a">N/A</option>
        </select>
      </Label>
      <div className="form-group">
        <input type="submit" value="Submit" className="btn btn-primary" />
      </div>
    </form>
  );
};
