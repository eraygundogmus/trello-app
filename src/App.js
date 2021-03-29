import "./App.css";
import React from "react";
import { TrelloProvider } from "./context/trelloContext";
import List from "./components/List";
import Header from "./components/Header";

function App() {
  return (
    <TrelloProvider>
      <div className="App">
        <Header />
        <List />
      </div>
    </TrelloProvider>
  );
}

export default App;
