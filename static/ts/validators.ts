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

export const validate = (values: peopleData): peopleData => {
  const errors: peopleData = { ...initialData };

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

  if (!values.homeworld.name) {
    errors.homeworld.name = "Planet name is required";
  }

  if (!values.homeworld.population) {
    errors.homeworld.population = "Population is required";
  }

  if (!values.homeworld.climate) {
    errors.homeworld.climate = "Climate is required";
  }

  if (!values.homeworld.terrain) {
    errors.homeworld.terrain = "Terrain is required";
  }

  return errors;
};