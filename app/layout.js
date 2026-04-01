import "./globals.css";

export const metadata = {
  title: "Solana Inspector",
  description: "A simple QuickNode-powered Solana inspector example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
