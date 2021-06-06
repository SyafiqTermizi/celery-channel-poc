import * as React from "react";
import { useState } from "react";
import axios from "axios";

import { Input, Label, TextInput } from "./BaseForm";

import { validate } from "../validators";

const initialData = {
  name: "",
  birthYear: "",
  gender: "",
  homeworld: {
    name: "",
    terrain: "",
    climate: "",
    population: "",
  },
};

export const CreatePeopleForm = () => {
  const [data, setData] = useState<peopleData>({ ...initialData });
  const [errors, setErrors] = useState<peopleData>({ ...initialData });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validate(data);
    setErrors(err);

    if (!err.name && !err.birthYear && !err.gender) {
      const postData = { ...data };
      postData.birth_year = postData.birthYear;
      delete postData.birthYear;

      const axiosInstance = axios.create({
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFTOKEN",
      });

      axiosInstance
        .post("/api/create", postData)
        .then((res) => window.location.replace("/"))
        .catch((err) => err);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Label label="Name" errorMsg={errors.name} inputName={data.name}>
        <div className="input-group">
          <input
            className="form-control"
            id="name"
            name="name"
            type="text"
            value={data.name}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="search"
            >
              Search
            </button>
          </div>
        </div>
      </Label>

      <TextInput
        label="Birth Year"
        inputName="birthYear"
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

      <TextInput
        label="Planet Name"
        inputName="planetName"
        inputValue={data.homeworld.name}
        errorMsg={errors.homeworld.name}
        onChange={(e) =>
          setData({
            ...data,
            homeworld: { ...data.homeworld, name: e.target.value },
          })
        }
      />

      <Input
        label="Population"
        inputName="population"
        inputType="number"
        inputValue={data.homeworld.population}
        errorMsg={errors.homeworld.population}
        onChange={(e) =>
          setData({
            ...data,
            homeworld: { ...data.homeworld, population: e.target.value },
          })
        }
      />

      <TextInput
        label="Climate"
        inputName="climate"
        inputValue={data.homeworld.climate}
        errorMsg={errors.homeworld.climate}
        onChange={(e) =>
          setData({
            ...data,
            homeworld: { ...data.homeworld, climate: e.target.value },
          })
        }
      />

      <TextInput
        label="Terrain"
        inputName="terrain"
        inputValue={data.homeworld.terrain}
        errorMsg={errors.homeworld.terrain}
        onChange={(e) =>
          setData({
            ...data,
            homeworld: { ...data.homeworld, terrain: e.target.value },
          })
        }
      />

      <div className="form-group">
        <input type="submit" value="Submit" className="btn btn-primary" />
      </div>
    </form>
  );
};
