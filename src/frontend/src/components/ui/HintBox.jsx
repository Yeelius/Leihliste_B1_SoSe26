import "./ui.css";
import { IconInfo } from "./icons";

// Neutraler Hinweis für leere Zustände oder Informationen,
// z. B. "keine Filter-Treffer" oder "noch keine Anfragen".
export default function HintBox({ title, message, children }) {
  return (
    <div className="hint-box" role="status">
      <span className="hint-box__icon"><IconInfo /></span>
      <div className="hint-box__content">
        {title && <p className="hint-box__title">{title}</p>}
        {message && <p className="hint-box__message">{message}</p>}
        {children}
      </div>
    </div>
  );
}
