import { DataContextProvider } from "entities/DataProvider";
import Routes from "pages";
import React from "react";

const App = () => (
  <DataContextProvider>
    <Routes />
  </DataContextProvider>
);

export default App;
