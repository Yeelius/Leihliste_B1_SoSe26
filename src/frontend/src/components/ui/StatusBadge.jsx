import "./ui.css";

// Zentrale Zuordnung: Status-Schlüssel -> Anzeigetext + Farbton.
// Töne: success | warning | danger | info | neutral (Farben in ui.css).
const STATUS_CONFIG = {
  // Gegenstände (#18)
  verfuegbar:          { label: "Verfügbar",           tone: "success" },
  ausgeliehen:         { label: "Ausgeliehen",          tone: "warning" },
  reserviert:          { label: "Reserviert",           tone: "info" },
  defekt:              { label: "Defekt",               tone: "danger" },
  // Anfragen (#36 / #125)
  eingereicht:         { label: "Eingereicht",          tone: "info" },
  genehmigt:           { label: "Genehmigt",            tone: "success" },
  abgelehnt:           { label: "Abgelehnt",            tone: "danger" },
  teilweise_abgelehnt: { label: "Teilweise abgelehnt",  tone: "warning" },
  zurueckgezogen:      { label: "Zurückgezogen",        tone: "neutral" },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status];
  // Fallback bei unbekanntem Status: neutral, angezeigter Text = übergebener Wert
  if (!config) {
    return <span className="status-badge status-badge--neutral">{status}</span>;
  }
  return (
    <span className={`status-badge status-badge--${config.tone}`}>
      {config.label}
    </span>
  );
}
