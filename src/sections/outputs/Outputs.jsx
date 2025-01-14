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

function postProcessValue(attribute, value) {
  if (attribute === "q_growth" || attribute === "a_growth") {
    return value * 100 + "%";
  } else if (attribute === "q_revenue" || attribute === "a_revenue") {
    return "$" + value + "B";
  } else {
    return value;
  }
}

function ResultLine(props) {
  const { result } = props;
  const attribute = result[0];
  const value = result[1];

  return (
    <li>
      <span>{lookups[attribute]}</span>{" "}
      <span>{postProcessValue(attribute, value)}</span>
    </li>
  );
}
