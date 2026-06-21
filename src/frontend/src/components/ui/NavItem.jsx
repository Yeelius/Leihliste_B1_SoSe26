import "./ui.css";

// Link für die Sidebar-Navigation. active = hervorgehobener Zustand.
// aria-current="page" sagt dem Screenreader, welche Seite aktiv ist.
export default function NavItem({ href = "#", icon = null, active = false, children }) {
  return (
    <a
      href={href}
      className={`nav-item${active ? " nav-item--active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {icon && <span className="nav-item__icon" aria-hidden="true">{icon}</span>}
      <span className="nav-item__label">{children}</span>
    </a>
  );
}
