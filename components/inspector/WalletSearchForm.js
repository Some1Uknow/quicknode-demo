import styles from "./inspector.module.css";

export default function WalletSearchForm({
  walletAddress,
  setWalletAddress,
  onSubmit,
  isLoading,
}) {
  return (
    <form className={styles.inputRow} onSubmit={onSubmit}>
      <input
        type="text"
        value={walletAddress}
        onChange={(event) => setWalletAddress(event.target.value)}
        placeholder="enter any solana wallet address..."
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "loading..." : "inspect →"}
      </button>
    </form>
  );
}
