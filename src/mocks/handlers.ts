import { http, HttpResponse } from "msw";

let messageHistory = [
  { user: "Servidor", message: "Bienvenido al chat 🚀" }
];

export const handlers = [
  http.get("/api/messages", () => {
    return HttpResponse.json(messageHistory);
  }),

  http.post("/api/messages", async ({ request }) => {
    const { user, message } = await request.json() as any;
    messageHistory.push({ user, message });

    // Simular respuesta automática del servidor
    setTimeout(() => {
      messageHistory.push({
        user: "Servidor",
        message: `Recibí tu mensaje: "${message}"`
      });
    }, 1000);

    return HttpResponse.json({ status: "ok" });
  }),
];