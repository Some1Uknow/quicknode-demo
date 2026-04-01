export function shortAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatNumber(value) {
  return Number(value).toLocaleString();
}

export function formatSol(value) {
  return `${Number(value).toFixed(4)} SOL`;
}
