interface planetData {
  name?: string;
  population?: number | string;
  climate?: string;
  terrain?: string;
}

interface peopleData {
  name?: string;
  birthYear?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: planetData;
}