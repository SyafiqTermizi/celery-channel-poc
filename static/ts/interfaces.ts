interface planetData {
  name?: string;
  population?: number | string;
  climate?: string;
  terrain?: string;
}

interface peopleData {
  name?: string;
  birthYear?: string;
  gender?: string;
  homeworld?: planetData;
}