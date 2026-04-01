const BASE58_PATTERN = /^[1-9A-HJ-NP-Za-km-z]+$/;

export function looksLikeSolanaAddress(address) {
  if (!address) {
    return false;
  }

  return (
    address.length >= 32 &&
    address.length <= 44 &&
    BASE58_PATTERN.test(address)
  );
}
