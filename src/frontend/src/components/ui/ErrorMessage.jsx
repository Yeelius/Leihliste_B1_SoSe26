import "./ui.css";
import { IconAlertTriangle } from "./icons";

// Fehlermeldung: sagt, WAS schiefging und WIE man es behebt.
export default function ErrorMessage({ title = "Fehler", message }) {
  return (
    <div className="error-message" role="alert">
      <span className="error-message__icon"><IconAlertTriangle /></span>
      <div className="error-message__content">
        <p className="error-message__title">{title}</p>
        {message && <p className="error-message__message">{message}</p>}
      </div>
    </div>
  );
}
