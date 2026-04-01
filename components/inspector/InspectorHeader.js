import styles from "./inspector.module.css";
import QuickNodeLogo from "./QuickNodeLogo";

export default function InspectorHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoMark} />
        <h1 className={styles.title}>solana-inspector</h1>
      </div>

      <div className={styles.poweredBy}>
        <span className={styles.poweredByLabel}>{"// powered by"}</span>
        <span className={styles.quickNodeLogo}>
          <QuickNodeLogo />
        </span>
      </div>
    </header>
  );
}
