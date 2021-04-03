import React from "react";
import { TrelloProvider } from "./context/trelloContext";
import List from "./components/List";

function App() {
  return (
    <TrelloProvider>
      <div className="App">
        {/*         <Header /> */}
        <div className="myHero">
          <List />
        </div>
      </div>
    </TrelloProvider>
  );
}

export default App;
