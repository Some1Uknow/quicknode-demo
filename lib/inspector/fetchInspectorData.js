export async function fetchInspectorData(address) {
  const url = `/api/inspect?${new URLSearchParams({ address }).toString()}`;

  const response = await fetch(url, { cache: "no-store" });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load inspector data.");
  }

  return data;
}
