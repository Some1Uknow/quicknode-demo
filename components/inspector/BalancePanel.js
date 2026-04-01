import styles from "./inspector.module.css";
import PanelShell from "./PanelShell";
import { formatNumber, formatSol } from "@/lib/inspector/format";

export default function BalancePanel({ result, isLoading }) {
  return (
    <PanelShell title="balance">
      {isLoading ? (
        <div className={styles.loading}>fetching...</div>
      ) : result?.ok ? (
        <>
          <div className={styles.statRow}>
            <span className={styles.statKey}>sol balance</span>
            <span className={`${styles.statVal} ${styles.bigStat}`}>
              {formatSol(result.data.sol)}
            </span>
          </div>

          <div className={styles.statRow}>
            <span className={styles.statKey}>lamports</span>
            <span className={styles.statVal}>
              {formatNumber(result.data.lamports)}
            </span>
          </div>
        </>
      ) : (
        <div className={styles.errorMessage}>x {result?.error}</div>
      )}
    </PanelShell>
  );
}
