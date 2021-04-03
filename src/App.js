import React from "react";
import { TrelloProvider } from "./context/trelloContext";
import List from "./components/List";
import Header from "./components/Header";
import TeamInfo from "./components/TeamInfo";

function App() {
  return (
    <TrelloProvider>
      <div className="App">
        <Header />
        <div className="myHero">
          <TeamInfo />
          <List />
        </div>
      </div>
    </TrelloProvider>
  );
}

export default App;
