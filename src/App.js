import { useState } from "react";
import "./App.css";
import Head from "./sections/head/head";
import Inputs from "./sections/inputs/Inputs";
import Outputs from "./sections/outputs/Outputs";

function App() {
  const [fetchedOutput, setFetchedOutput] = useState();

  console.log(fetchedOutput);

  return (
    <div className="App">
      <header className="App-header">
        <Head />
      </header>
      <main className="App-main">
        <Inputs setResults={setFetchedOutput} />
        <Outputs displayResults={fetchedOutput} />
      </main>
    </div>
  );
}

export default App;
