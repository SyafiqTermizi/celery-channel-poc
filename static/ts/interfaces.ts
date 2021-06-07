interface planetData {
  name?: string;
  population?: number | string;
  climate?: string;
  terrain?: string;
}

interface peopleData {
  name?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: planetData;
}