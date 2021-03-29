import "./App.css";
import React from "react";
import { TrelloProvider } from "./context/trelloContext";

function App() {
  return (
    <TrelloProvider>
      <div className="App">
        <div>I am creating a trello app</div>
      </div>
    </TrelloProvider>
  );
}

export default App;
