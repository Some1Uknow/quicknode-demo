import { NextResponse } from "next/server";
import { getInspectorData } from "@/lib/solana/inspector";
import { looksLikeSolanaAddress } from "@/lib/solana/validation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address")?.trim() || "";

  if (!looksLikeSolanaAddress(address)) {
    return NextResponse.json(
      { error: "That does not look like a valid Solana address." },
      { status: 400 },
    );
  }

  try {
    const data = await getInspectorData(address);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something went wrong while loading data." },
      { status: 500 },
    );
  }
}
