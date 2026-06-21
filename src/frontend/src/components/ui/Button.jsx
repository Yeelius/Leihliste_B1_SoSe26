import "./ui.css";

// variant : primary | secondary | ghost | danger
// size    : md | sm
// icon    : SVG-Element vor dem Text (optional)
// iconOnly: true = nur Icon (dann ist ariaLabel PFLICHT)
// disabled, type, onClick: Standard-Button-Props (Verhalten kommt später)
export default function Button({
  variant = "primary",
  size = "md",
  icon = null,
  iconOnly = false,
  disabled = false,
  type = "button",
  ariaLabel,
  onClick,
  children,
}) {
  const className = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    iconOnly ? "btn--icon-only" : "",
  ].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      aria-label={iconOnly ? ariaLabel : undefined}
    >
      {icon && <span className="btn__icon" aria-hidden="true">{icon}</span>}
      {!iconOnly && <span className="btn__label">{children}</span>}
    </button>
  );
}
