export default function DarkModeToggle() {
  return (
    <button
      className="btn btn-outline-secondary"
      onClick={() => document.body.classList.toggle("dark")}
    >
      <i className="bi bi-moon" />
    </button>
  );
}
