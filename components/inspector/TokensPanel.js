import styles from "./inspector.module.css";
import PanelShell from "./PanelShell";
import { shortAddress } from "@/lib/inspector/format";

export default function TokensPanel({ result, isLoading }) {
  const badge = result?.ok ? result.data.length : "...";

  return (
    <PanelShell title="spl tokens" badge={badge}>
      {isLoading ? (
        <div className={styles.loading}>fetching...</div>
      ) : result?.ok ? (
        result.data.length > 0 ? (
          result.data.map((token) => (
            <div className={styles.tokenRow} key={token.mint}>
              <span className={styles.tokenMint}>{shortAddress(token.mint)}</span>
              <span className={styles.tokenAmount}>{token.amount}</span>
            </div>
          ))
        ) : (
          <div className={styles.empty}>no spl tokens found</div>
        )
      ) : (
        <div className={styles.errorMessage}>x {result?.error}</div>
      )}
    </PanelShell>
  );
}
