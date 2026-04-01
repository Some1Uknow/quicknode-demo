import styles from "./inspector.module.css";

export default function InspectorHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoMark} />
        <h1 className={styles.title}>solana-inspector</h1>
      </div>

      <p className={styles.tagline}>{"// powered by quicknode rpc"}</p>
    </header>
  );
}
