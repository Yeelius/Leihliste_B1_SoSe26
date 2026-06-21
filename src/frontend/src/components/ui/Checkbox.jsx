import "./ui.css";
import { IconCheck } from "./icons";

// Natives <input type="checkbox">, visuell gestylt.
// Das echte Input ist versteckt, aber fokussierbar.
// label sichtbar ODER ariaLabel (z. B. in einer Tabellenzeile).
export default function Checkbox({ label, checked, defaultChecked, onChange, disabled = false, ariaLabel, id }) {
  return (
    <label className={`checkbox${disabled ? " checkbox--disabled" : ""}`}>
      <input
        id={id}
        className="checkbox__input"
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        aria-label={label ? undefined : ariaLabel}
      />
      <span className="checkbox__box" aria-hidden="true"><IconCheck /></span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
}
