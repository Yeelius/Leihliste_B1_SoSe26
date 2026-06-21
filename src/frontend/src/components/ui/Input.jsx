import "./ui.css";

// icon (optional, links), placeholder, type, disabled, value/onChange (durchgereicht).
// ariaLabel ist nötig, wenn kein sichtbares Label existiert (z. B. Suchfeld).
export default function Input({
  icon = null,
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled = false,
  ariaLabel,
  id,
}) {
  return (
    <div className={`input${disabled ? " input--disabled" : ""}`}>
      {icon && <span className="input__icon" aria-hidden="true">{icon}</span>}
      <input
        id={id}
        className="input__field"
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
      />
    </div>
  );
}
