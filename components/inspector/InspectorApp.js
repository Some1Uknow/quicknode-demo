"use client";

import { useState } from "react";
import styles from "./inspector.module.css";
import BalancePanel from "./BalancePanel";
import InspectorHeader from "./InspectorHeader";
import NetworkPanel from "./NetworkPanel";
import TokensPanel from "./TokensPanel";
import TransactionsPanel from "./TransactionsPanel";
import WalletSearchForm from "./WalletSearchForm";
import { fetchInspectorData } from "@/lib/inspector/fetchInspectorData";
import { looksLikeSolanaAddress } from "@/lib/solana/validation";

function createEmptyResults() {
  return {
    balance: null,
    tokens: null,
    transactions: null,
    network: null,
  };
}

export default function InspectorApp() {
  const [walletAddress, setWalletAddress] = useState("");
  const [results, setResults] = useState(createEmptyResults);
  const [formError, setFormError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const cleanAddress = walletAddress.trim();

    if (!looksLikeSolanaAddress(cleanAddress)) {
      setFormError("Enter a real Solana wallet address to inspect.");
      return;
    }

    setFormError("");
    setHasSearched(true);
    setIsLoading(true);
    setResults(createEmptyResults());

    try {
      const nextResults = await fetchInspectorData(cleanAddress);
      setResults(nextResults);
    } catch (error) {
      setResults({
        balance: { ok: false, error: error.message },
        tokens: { ok: false, error: error.message },
        transactions: { ok: false, error: error.message },
        network: { ok: false, error: error.message },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <InspectorHeader />

        <WalletSearchForm
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {formError ? <p className={styles.errorMessage}>{formError}</p> : null}

        {hasSearched ? (
          <div className={styles.panels}>
            <div className={styles.leftColumn}>
              <BalancePanel result={results.balance} isLoading={isLoading} />
              <TokensPanel result={results.tokens} isLoading={isLoading} />
              <NetworkPanel result={results.network} isLoading={isLoading} />
            </div>

            <div className={styles.rightColumn}>
              <TransactionsPanel
                result={results.transactions}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
