export function getRpcUrl() {
  return process.env.QUICKNODE_RPC_URL;
}

export async function callSolanaRpc(method, params = []) {
  const response = await fetch(getRpcUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`RPC request failed with status ${response.status}.`);
  }

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error.message || "RPC returned an error.");
  }

  return json.result;
}
