import * as React from "react";
import { useState } from "react";

import { Input } from "./BaseForm";

interface formData {
  name?: string;
  population?: number | string;
  climate?: string;
  terrain?: string;
}

const validate = (values: formData): formData => {
  const errors: formData = {};
  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.population) {
    errors.population = "Population is required";
  }

  if (!values.climate) {
    errors.climate = "Climate is required";
  }

  if (!values.terrain) {
    errors.terrain = "Terrain is required";
  }

  return errors;
};

export const CreatePlanetForm = () => {
  const initialValue: formData = {
    name: "",
    terrain: "",
    climate: "",
    population: "",
  };
  const [data, setData] = useState<formData>({ ...initialValue });
  const [errors, setErrors] = useState<formData>({ ...initialValue });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validate(data);
    setErrors(err);

    if (!err.name && !err.population && !err.climate && !err.terrain) {
      console.log("form submitted!");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        label="Planet Name"
        inputName="name"
        inputType="text"
        inputValue={data.name}
        errorMsg={errors.name}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Input
        label="Population"
        inputName="population"
        inputType="number"
        inputValue={data.population}
        errorMsg={errors.population}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Input
        label="Climate"
        inputName="climate"
        inputType="text"
        inputValue={data.climate}
        errorMsg={errors.climate}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Input
        label="Terrain"
        inputName="terrain"
        inputType="text"
        inputValue={data.terrain}
        errorMsg={errors.terrain}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <div className="form-group">
        <input type="submit" value="Submit" className="btn btn-primary" />
      </div>
    </form>
  );
};
