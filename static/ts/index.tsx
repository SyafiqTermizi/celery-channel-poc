import * as React from "react";
import * as ReactDOM from "react-dom";

import { CreateCharacterForm } from "./components/CharacterForm";
import { CreatePlanetForm } from "./components/PlanetForm";

const App = () => (
  <>
    <CreateCharacterForm />
    <CreatePlanetForm />
  </>
);

ReactDOM.render(<App />, document.getElementById("people-form"));
