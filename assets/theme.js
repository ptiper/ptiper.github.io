// Bouton clair / sombre. Le choix est mémorisé dans localStorage (si disponible),
// sinon on suit prefers-color-scheme. Le thème initial est posé par un petit script dans le head.
(() => {
  const button = document.querySelector(".theme-toggle");
  if (!button) return;
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const current = () => root.dataset.theme || (media.matches ? "dark" : "light");

  const render = () => {
    const label = current() === "dark" ? button.dataset.toLight : button.dataset.toDark;
    button.setAttribute("aria-label", label);
    button.title = label;
  };

  button.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* stockage indisponible */ }
    render();
  });
  media.addEventListener("change", render);
  render();
})();
