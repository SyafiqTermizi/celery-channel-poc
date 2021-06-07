interface PlanetData {
  name?: string;
  population?: number | string;
  climate?: string;
  terrain?: string;
}

interface PeopleData {
  name?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: PlanetData;
}