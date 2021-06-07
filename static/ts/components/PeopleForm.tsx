import * as React from "react";

import { Input, Label, TextInput } from "./BaseForm";

interface Props extends PeopleData {
  errors: PeopleData;
  handleSearch: (name: string) => void;
  handleChange: (data: PeopleData) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const CreatePeopleForm: React.FC<Props> = (props) => (
  <form onSubmit={(e) => props.handleSubmit(e)}>
    <Label label="Name" errorMsg={props.errors.name} inputName="name">
      <div className="input-group">
        <input
          className="form-control"
          id="name"
          name="name"
          type="text"
          value={props.name}
          onChange={(e) =>
            props.handleChange({ ...props, [e.target.name]: e.target.value })
          }
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="search"
            onClick={() => props.handleSearch(props.name)}
          >
            Search
          </button>
        </div>
      </div>
    </Label>

    <TextInput
      label="Birth Year"
      inputName="birth_year"
      inputValue={props.birth_year}
      errorMsg={props.errors.birth_year}
      onChange={(e) =>
        props.handleChange({ ...props, [e.target.name]: e.target.value })
      }
    />

    <Label label="Gender" inputName="gender" errorMsg="">
      <select
        className="form-control"
        name="gender"
        id="gender"
        onChange={(e) =>
          props.handleChange({ ...props, [e.target.name]: e.target.value })
        }
      >
        <option value="male" selected={props.gender == "male"}>
          Male
        </option>
        <option value="female" selected={props.gender == "female"}>
          Female
        </option>
        <option value="unknown" selected={props.gender == "unknown"}>
          Unknown
        </option>
        <option value="n/a" selected={props.gender == "n/a"}>
          N/A
        </option>
      </select>
    </Label>

    <TextInput
      label="Planet Name"
      inputName="planetName"
      inputValue={props.homeworld.name}
      errorMsg={props.errors.homeworld.name}
      onChange={(e) =>
        props.handleChange({
          ...props,
          homeworld: { ...props.homeworld, name: e.target.value },
        })
      }
    />

    <Input
      label="Population"
      inputName="population"
      inputType="number"
      inputValue={props.homeworld.population}
      errorMsg={props.errors.homeworld.population}
      onChange={(e) =>
        props.handleChange({
          ...props,
          homeworld: { ...props.homeworld, population: e.target.value },
        })
      }
    />

    <TextInput
      label="Climate"
      inputName="climate"
      inputValue={props.homeworld.climate}
      errorMsg={props.errors.homeworld.climate}
      onChange={(e) =>
        props.handleChange({
          ...props,
          homeworld: { ...props.homeworld, climate: e.target.value },
        })
      }
    />

    <TextInput
      label="Terrain"
      inputName="terrain"
      inputValue={props.homeworld.terrain}
      errorMsg={props.errors.homeworld.terrain}
      onChange={(e) =>
        props.handleChange({
          ...props,
          homeworld: { ...props.homeworld, terrain: e.target.value },
        })
      }
    />

    <div className="form-group">
      <input type="submit" value="Submit" className="btn btn-primary" />
    </div>
  </form>
);
