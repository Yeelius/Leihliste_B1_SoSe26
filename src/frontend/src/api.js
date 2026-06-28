const API_URL = import.meta.env.VITE_API_URL;

export async function getAlleExemplare() {
  const res = await fetch(`${API_URL}/api/inventory/alle-exemplare/`);
  if (!res.ok) throw new Error("Fehler beim Laden der Exemplare");
  return res.json();
}