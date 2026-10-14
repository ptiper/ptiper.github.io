// Formulaire de contact : envoi vers Google Forms en no-cors, puis message de remerciement.
// Sans JavaScript, le formulaire est posté vers l'iframe cachée "gform-sink".
(() => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;
  const button = form.querySelector("button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const done = () => {
      form.hidden = true;
      status.textContent = form.dataset.thanks;
      status.focus();
    };

    // Champ piège : un humain ne le voit pas, un robot le remplit. On fait semblant d'envoyer.
    if (form.elements.website.value) {
      done();
      return;
    }

    const body = new URLSearchParams();
    for (const [key, value] of new FormData(form)) {
      if (key.startsWith("entry.")) body.append(key, value.trim());
    }

    button.disabled = true;
    try {
      await fetch(form.action, { method: "POST", mode: "no-cors", body });
      done();
    } catch {
      button.disabled = false;
      status.textContent = form.dataset.error;
    }
  });
})();
