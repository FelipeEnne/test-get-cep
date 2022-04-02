import React from "react";

import "./App.css";
import CEPPage from "./components/cep/CEPPage";

const App: React.FC = () => {
  return (
    <div className="app">
      <CEPPage />
    </div>
  );
};

export default App;
