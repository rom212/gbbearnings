import styles from "./head.module.css";

function Head() {
  return (
    <section className={styles.container}>
      <img src="/getsitelogoSmall.png" alt="ai gbb logo"></img>
      <h1>AI GBB earnings analysis</h1>
    </section>
  );
}

export default Head;
