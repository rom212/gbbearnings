import { lookups } from "../../constants";

import styles from "./outputs.module.css";

function Outputs(props) {
  const { displayResults } = props;

  if (!displayResults) {
    return;
  }

  const displayResultsArray = Array.from(Object.entries(displayResults));

  return (
    <section className={styles.container}>
      <h2>Insights from the presentation deck</h2>
      <ul>
        {displayResultsArray.map((result, idx) => {
          return <ResultLine result={result} />;
        })}
      </ul>
    </section>
  );
}

export default Outputs;

function ResultLine(props) {
  const { result } = props;
  const attribute = result[0];
  const value = result[1];

  return (
    <li>
      <span>{lookups[attribute]}</span> <span>{value}</span>
    </li>
  );
}
