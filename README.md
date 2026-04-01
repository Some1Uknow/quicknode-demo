# Solana Inspector

A simple Next.js example that inspects a Solana wallet with a QuickNode RPC endpoint.

It shows:

- SOL balance
- SPL tokens
- recent transactions
- basic network stats

The frontend calls `/api/inspect`. The API route calls Solana JSON-RPC on the server. Your RPC URL stays in `.env.local`.

## Quick start

```bash
npm install
cp .env.example .env.local
```

Add your QuickNode endpoint to `.env.local`:

```bash
QUICKNODE_RPC_URL=https://your-endpoint.solana-mainnet.quiknode.pro/your-token/
```

```bash
npm run dev
```

Open `http://localhost:3000`.

Build for production:

```bash
npm run build
npm run start
```

## API example

```bash
curl "http://localhost:3000/api/inspect?address=7vfCXTUXx5W6PqKeLh4gYh4v6Qw4K8rL8U2rJ7n3B1yH"
```

## Core RPC example

```js
export async function callSolanaRpc(method, params = []) {
  const response = await fetch(process.env.QUICKNODE_RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  });

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error.message);
  }

  return json.result;
}
```

## Files to read

- `app/api/inspect/route.js`
- `lib/solana/rpc.js`
- `lib/solana/inspector.js`
- `components/inspector/InspectorApp.js`

## RPC methods used

- `getBalance`
- `getTokenAccountsByOwner`
- `getSignaturesForAddress`
- `getSlot`
- `getRecentPerformanceSamples`

## Docs

- [QuickNode Solana Quickstart](https://www.quicknode.com/docs/solana/quickstart)
- [QuickNode Solana API Overview](https://www.quicknode.com/docs/solana/api-overview)
- [Solana `getBalance` RPC docs](https://solana.com/docs/rpc/http/getbalance)
- [Next.js App Router docs](https://nextjs.org/docs/app)

## Notes

- If `QUICKNODE_RPC_URL` is missing, the app falls back to `https://api.mainnet-beta.solana.com`.
- The address check is intentionally simple so the example stays easy to follow.
- Each panel can fail independently, so one RPC error does not hide the rest of the page.
