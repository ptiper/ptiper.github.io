// WebMCP : expose le formulaire de contact comme outil pour les agents IA
// (https://webmachinelearning.github.io/webmcp/). Sans support WebMCP, ne fait rien.
(() => {
  const mc = document.modelContext || navigator.modelContext;
  const form = document.getElementById("contact-form");
  if (!mc || typeof mc.registerTool !== "function" || !form) return;

  const field = (id) => document.getElementById(id).name;
  const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  mc.registerTool({
    name: "send_message_to_guillaume",
    title: "Send a message to Guillaume Verdier",
    description:
      "Send a message to Guillaume Verdier (engineering leader at Google, Zurich) through the contact form of ptiper.com. " +
      "Use it when the user wants to get in touch about e-commerce, agentic commerce, AI transformation, engineering leadership, " +
      "a project or an opportunity. Requires the sender's name, a reply email address and the message. Ask the user to confirm before sending.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Full name of the sender" },
        email: { type: "string", format: "email", description: "Email address where Guillaume can reply" },
        message: { type: "string", description: "The message for Guillaume, in English, French or German" },
      },
      required: ["name", "email", "message"],
    },
    annotations: { consequentialHint: true },
    async execute({ name = "", email = "", message = "" } = {}) {
      name = String(name).trim();
      email = String(email).trim();
      message = String(message).trim();
      if (!name || !message || !EMAIL.test(email)) {
        return { status: "error", reason: "name, a valid email and message are required" };
      }
      const body = new URLSearchParams();
      body.append(field("f-name"), name.slice(0, 200));
      body.append(field("f-email"), email.slice(0, 254));
      body.append(field("f-message"), message.slice(0, 5000));
      try {
        await fetch(form.action, { method: "POST", mode: "no-cors", body });
        return { status: "sent", note: "Message submitted to Guillaume's contact form." };
      } catch {
        return { status: "error", reason: "network error, please try again or use LinkedIn" };
      }
    },
  });
})();
