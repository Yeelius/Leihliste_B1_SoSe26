import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestingId, setRequestingId] = useState(null);

  function loadItems() {
    setLoading(true);
    setError("");

    fetch(`${API_URL}/items/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend konnte nicht erreicht werden.");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  function requestLoan(itemId) {
    setRequestingId(itemId);
    setError("");

    fetch(`${API_URL}/items/${itemId}/request-loan/`, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ausleihe konnte nicht angefragt werden.");
        }
        return response.json();
      })
      .then(() => {
        loadItems();
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setRequestingId(null);
      });
  }

  useEffect(() => {
    loadItems();
  }, []);

    return (
    <main>
      <h1>LeihListe</h1>
      <p className="subtitle">
        Walking Skeleton: React-Frontend kommuniziert mit Django-Backend.
      </p>

      {loading && <p>Inventar wird geladen...</p>}

      {error && <p className="error">Fehler: {error}</p>}

      {!loading && !error && (
        <div className="item-list">
          {items.map((item) => (
            <section key={item.id} className="item-card">
              <h2>{item.name}</h2>

              <p>Kategorie: {item.category}</p>
              <p>Standort: {item.location}</p>
              <p>
                Status: <span className="status">{item.status}</span>
              </p>

              <button
                onClick={() => requestLoan(item.id)}
                disabled={item.status !== "available" || requestingId === item.id}
              >
                {requestingId === item.id
                  ? "Wird angefragt..."
                  : "Ausleihe anfragen"}
              </button>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}

export default App;