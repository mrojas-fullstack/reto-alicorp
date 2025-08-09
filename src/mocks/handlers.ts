import { ChatMessage, ChatStore } from "@/interfaces/chat.interface";
import { getFileFromDB, saveFileToDB } from "@/utils/db";
import { http, HttpResponse } from "msw";

function loadStore(): ChatStore {
  if (typeof localStorage === "undefined") {
    return { chats: {}, currentChatId: null };
  }
  const stored = localStorage.getItem("chatStore");
  return stored ? JSON.parse(stored) : { chats: {}, currentChatId: null };
}

function saveStore(store: ChatStore) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("chatStore", JSON.stringify(store));
  }
}

let messageId = 1;

async function createMessage(user: string, message: string, file:File | null): Promise<ChatMessage> {
  let fileId: string | undefined;
  let fileType: string | undefined;

  if (file) {
    fileId = `${Date.now()}-${file.name}`;
    fileType = file.type;
    await saveFileToDB(fileId, file);
  }

  return {
    id: messageId++,
    user,
    message,
    fileId: fileId,
    fileType: fileType,
    time: new Date().toLocaleTimeString()
  };
}

const autoReplies = [
  "¡Interesante lo que dices!",
  "Entiendo 🤔",
  "¿Podrías explicarlo un poco más?",
  "Me gusta esa idea 💡",
  "👍",
  "¡Claro que sí!"
];

export const handlers = [
  // Obtener todos los chats
  http.get("/api/chats", () => {
    const store = loadStore();
    return HttpResponse.json(store);
  }),

  // Crear un chat nuevo
  http.post("/api/chats", async () => {
    const store = loadStore();
    const newId = `chat-${Date.now()}`;
    const welcomeMessage = {
      id: messageId++,
      user: "Servidor",
      message: "¡Bienvenido al nuevo chat! 😊",
      time: new Date().toISOString(),
    };
    store.chats[newId] = [welcomeMessage];
    store.currentChatId = newId;
    saveStore(store);
    return HttpResponse.json({ success: true, chatId: newId });
  }),

  // Eliminar un chat
  http.delete("/api/chats/:id", ({ params }) => {
    const store = loadStore();
    const id = params.id as string;
    delete store.chats[id];
    if (store.currentChatId === id) {
      store.currentChatId = Object.keys(store.chats)[0] || null;
    }
    saveStore(store);
    return HttpResponse.json({ success: true });
  }),

  // Seleccionar chat activo
  http.post("/api/chats/:id/select", ({ params }) => {
    const store = loadStore();
    store.currentChatId = params.id as string;
    saveStore(store);
    return HttpResponse.json({ success: true });
  }),

  // Cambiar de chat activo
  http.post("/api/chats/select", async ({ request }) => {
    const store = loadStore();
    const { chatId } = await request.json() as any;
    if (store.chats[chatId]) {
      store.currentChatId = chatId;
      saveStore(store);
      return HttpResponse.json({ status: "ok" });
    }
    return HttpResponse.json({ error: "Chat no encontrado" }, { status: 404 });
  }),

  // Obtener mensajes de un chat
  http.get("/api/messages", async () => {
    const store = loadStore();
    const messages = store.currentChatId
      ? store.chats[store.currentChatId] || []
      : [];

    // Recuperar blobs como URLs
    const enriched = await Promise.all(
      messages.map(async (msg: any) => {
        if (msg.fileId) {
          const blob = await getFileFromDB(msg.fileId);
          if (blob) {
            return { ...msg, fileUrl: URL.createObjectURL(blob) };
          }
        }
        return msg;
      })
    );

    return HttpResponse.json(enriched);
  }),

  // Enviar mensaje al chat activo
  http.post("/api/messages", async ({ request }) => {
    const store = loadStore();
    const formData = await request.formData();
    const user = formData.get("user") as string;
    const message = formData.get("message") as string;
    const file = formData.get("file") as File | null;

    if (!store.currentChatId) return HttpResponse.json({ error: "No hay chat activo" }, { status: 400 });

    const newMsg = await createMessage(user, message, file);
    store.chats[store.currentChatId].push(newMsg);
    saveStore(store);

    // Simular "typing"
    const typingMsg = await createMessage("Servidor", "___TYPING___", file);
    store.chats[store.currentChatId].push(typingMsg);
    saveStore(store);

    setTimeout(async () => {
      if (store.currentChatId) {
        store.chats[store.currentChatId] = store.chats[store.currentChatId].filter(m => m.message !== "___TYPING___");
        const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        const replyMsg = await createMessage("Servidor", reply, file);
        store.chats[store.currentChatId].push(replyMsg);
        saveStore(store);
      }
    }, 1500);

    return HttpResponse.json({ status: "ok" });
  }),
];