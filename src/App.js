import React from "react";
import { TrelloProvider } from "./context/trelloContext";
import List from "./components/List";
import Header from "./components/Header";

function App() {
  return (
    <TrelloProvider>
      <div className="App">
        {/*         <Header /> */}
        <div className="container mx-auto  text-base	">
          <List />
        </div>
      </div>
    </TrelloProvider>
  );
}

export default App;
