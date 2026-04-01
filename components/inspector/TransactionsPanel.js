import styles from "./inspector.module.css";
import PanelShell from "./PanelShell";
import { formatNumber } from "@/lib/inspector/format";

export default function TransactionsPanel({ result, isLoading }) {
  const badge = result?.ok ? result.data.length : "...";

  return (
    <PanelShell title="transactions" badge={badge}>
      {isLoading ? (
        <div className={styles.loading}>fetching...</div>
      ) : result?.ok ? (
        result.data.length > 0 ? (
          result.data.map((transaction) => (
            <div className={styles.txRow} key={transaction.signature}>
              <span className={styles.txSig}>{transaction.signature}</span>
              <span className={styles.txSlot}>
                slot {formatNumber(transaction.slot)}
              </span>
              <span
                className={`${styles.txStatus} ${
                  transaction.err ? styles.txStatusError : styles.txStatusOk
                }`}
              >
                {transaction.err ? "fail" : "ok"}
              </span>
            </div>
          ))
        ) : (
          <div className={styles.empty}>no transactions found</div>
        )
      ) : (
        <div className={styles.errorMessage}>x {result?.error}</div>
      )}
    </PanelShell>
  );
}
