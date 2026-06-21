import "./ui.css";
import { IconChevronDown } from "./icons";

// Natives <select>. children = die <option>-Elemente.
// Der Pfeil ist ein dekoratives Overlay (pointer-events: none).
export default function Select({ value, defaultValue, onChange, disabled = false, ariaLabel, id, children }) {
  return (
    <div className="select">
      <select
        id={id}
        className="select__field"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </select>
      <span className="select__chevron"><IconChevronDown /></span>
    </div>
  );
}
