import { callSolanaRpc } from "@/lib/solana/rpc";

const LAMPORTS_PER_SOL = 1_000_000_000;

// to get all SPL tokens owned by an address, we filter by the token program ID
const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

export async function getBalance(address) {
  const result = await callSolanaRpc("getBalance", [address]);
  const lamports = result.value;

  return {
    sol: lamports / LAMPORTS_PER_SOL,
    lamports,
  };
}

export async function getTokens(address) {
  const result = await callSolanaRpc("getTokenAccountsByOwner", [
    address,
    { programId: TOKEN_PROGRAM_ID },
    { encoding: "jsonParsed" },
  ]);

  const tokens = result.value.map((account) => 
    {
      const info = account.account.data.parsed.info;
      return {
        mint: info.mint,
        amount: info.tokenAmount.uiAmountString,
        decimals: info.tokenAmount.decimals,
    };
  });

  return tokens.filter((token) => Number(token.amount) > 0);
}

export async function getTransactions(address) {
  const result = await callSolanaRpc("getSignaturesForAddress", [
    address,
    { limit: 10 },
  ]);

  return result.map((transaction) => ({
    signature: transaction.signature,
    slot: transaction.slot,
    err: transaction.err !== null,
  }));
}

export async function getNetworkStats() {
  const [currentSlot, recentSamples] = await Promise.all([
    callSolanaRpc("getSlot"),
    callSolanaRpc("getRecentPerformanceSamples", [1]),
  ]);

  const latestSample = recentSamples[0];
  const tps = latestSample
    ? Math.round(latestSample.numTransactions / latestSample.samplePeriodSecs)
    : 0;

  return {
    slot: currentSlot,
    tps,
  };
}

function makePanelResult(result) {
  if (result.status === "fulfilled") {
    return { ok: true, data: result.value };
  }

  return {
    ok: false,
    error: result.reason?.message || "Something went wrong.",
  };
}

export async function getInspectorData(address) {
  // Each request is independent, so we start them together.
  // Promise.allSettled lets one panel fail without hiding the others.
  const results = await Promise.allSettled([
    getBalance(address),
    getTokens(address),
    getTransactions(address),
    getNetworkStats(),
  ]);

  return {
    balance: makePanelResult(results[0]),
    tokens: makePanelResult(results[1]),
    transactions: makePanelResult(results[2]),
    network: makePanelResult(results[3]),
  };
}
