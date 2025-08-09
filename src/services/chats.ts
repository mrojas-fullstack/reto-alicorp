import { ChatMessage, ChatStore } from "@/interfaces/chat.interface";

//Obtener todos los chats y el chat activo
export async function fetchChats(): Promise<ChatStore> {
  const res = await fetch("/api/chats");
  if (!res.ok) throw new Error("Error al obtener chats");
  return res.json();
}

//Crear un nuevo chat y devolver su ID
export async function createChat(): Promise<{ chatId: string }> {
  const res = await fetch("/api/chats", { method: "POST" });
  if (!res.ok) throw new Error("Error al crear chat");
  return res.json();
}

//Eliminar un chat por ID
export async function deleteChat(chatId: string): Promise<void> {
  const res = await fetch(`/api/chats/${chatId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar chat");
}

//Seleccionar un chat activo
export async function selectChat(chatId: string): Promise<void> {
  const res = await fetch("/api/chats/select", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId }),
  });
  if (!res.ok) throw new Error("Error al seleccionar chat");
}

//Obtener mensajes del chat activo
export async function fetchMessages(): Promise<ChatMessage[]> {
  const res = await fetch("/api/messages");
  if (!res.ok) throw new Error("Error al obtener mensajes");
  return res.json();
}

//Enviar mensaje con o sin archivo adjunto
export async function sendMessageWithFile(
  message: string,
  file?: File
): Promise<void> {
  const formData = new FormData();
  formData.append("user", "Yo");
  formData.append("message", message);
  if (file) {
    formData.append("file", file);
  }

  const res = await fetch("/api/messages", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Error al enviar mensaje o archivo");
}