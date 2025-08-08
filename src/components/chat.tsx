"use client";
import { useEffect, useState } from "react";
import { UploadFile } from "./upload-file";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ChatMessage {
  user: string;
  message: string;
}

// Funciones de API
async function getMessages(): Promise<ChatMessage[]> {
  const res = await fetch("/api/messages");
  if (!res.ok) throw new Error("Error al obtener mensajes");
  return res.json();
}

async function sendMessageAPI(message: string): Promise<void> {
  await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: "Yo", message }),
  });
}

export default function Chat() {
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  // Query para traer mensajes
  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    refetchInterval: 1500, // auto-refresh cada 1.5s
  });

  // Mutation para enviar mensajes
  const mutation = useMutation({
    mutationFn: sendMessageAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const sendMessage = () => {
    if (!input.trim()) return;
    mutation.mutate(input);
    setInput("");
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="bg-muted/50 min-h-min flex rounded-xl md:min-h-min p-10 flex-col justify-center gap-2">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          messages?.map((msg, idx) => (
            <div
              key={idx}
              style={{
                textAlign: msg.user === "Yo" ? "right" : "left",
                margin: "4px 0",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: 12,
                  background: msg.user === "Yo" ? "#4cafef" : "#ddd",
                  color: msg.user === "Yo" ? "white" : "black",
                }}
              >
                <strong>{msg.user}:</strong> {msg.message}
              </span>
            </div>
          ))
        )}
        
      </div>
      <div className="flex items-center justify-center gap-2 w-full bg-primary/5 p-2 rounded-lg">
        <UploadFile/>
        <div className="relative flex w-full min-w-0 flex-col p-2 py-0">
          <div className="w-full text-sm relative">
            <Input
              id="search"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Search the docs..."
              className="bg-background h-8 w-full shadow-none pl-8"
            />
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          </div>
        </div>
        <Button onClick={sendMessage}>Enviar</Button>
      </div>
    </div>
  );
}
