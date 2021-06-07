import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Input, Label, TextInput } from "./BaseForm";

import { validate } from "../validators";

const initialData = {
  name: "",
  birth_year: "",
  gender: "",
  homeworld: {
    name: "",
    terrain: "",
    climate: "",
    population: "",
  },
};

const ws = new WebSocket("ws://localhost:8000/ws/search/");

export const CreatePeopleForm = () => {
  const [data, setData] = useState<peopleData>({ ...initialData });
  const [errors, setErrors] = useState<peopleData>({ ...initialData });

  useEffect(() => {
    ws.onmessage = function (e) {
      const resData = JSON.parse(e.data);
      console.log(resData);
      if (!resData.data) return;
      setData(resData.data);
    };
  }, []);

  const handleSearch = () => {
    if (!data.name) return;
    ws.send(JSON.stringify({ name: data.name }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validate(data);
    setErrors(err);

    if (!err.name && !err.birth_year && !err.gender) {
      const postData = { ...data };
      postData.birth_year = postData.birth_year;
      delete postData.birth_year;

      const axiosInstance = axios.create({
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFTOKEN",
      });

      axiosInstance
        .post("/api/create", postData)
        .then((_) => window.location.replace("/"))
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
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </Label>

      <TextInput
        label="Birth Year"
        inputName="birth_year"
        inputValue={data.birth_year}
        errorMsg={errors.birth_year}
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
          <option value="male" selected={data.gender == "male"}>
            Male
          </option>
          <option value="female" selected={data.gender == "female"}>
            Female
          </option>
          <option value="unknown" selected={data.gender == "unknown"}>
            Unknown
          </option>
          <option value="n/a" selected={data.gender == "n/a"}>
            N/A
          </option>
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
