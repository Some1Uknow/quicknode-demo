import styles from "./inspector.module.css";
import PanelShell from "./PanelShell";
import { formatNumber } from "@/lib/inspector/format";

export default function NetworkPanel({ result, isLoading }) {
  return (
    <PanelShell title="network">
      {isLoading ? (
        <div className={styles.loading}>fetching...</div>
      ) : result?.ok ? (
        <div className={styles.netGrid}>
          <div className={styles.netCell}>
            <div className={styles.netLabel}>current slot</div>
            <div className={styles.netValue}>
              {formatNumber(result.data.slot)}
            </div>
          </div>

          <div className={styles.netCell}>
            <div className={styles.netLabel}>est. tps</div>
            <div className={`${styles.netValue} ${styles.netValueAccent}`}>
              {formatNumber(result.data.tps)}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.errorMessage}>x {result?.error}</div>
      )}
    </PanelShell>
  );
}
