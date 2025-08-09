"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createChat, fetchMessages, sendMessageWithFile } from "@/services/chats";
import { Plus, Paperclip } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  currentChatId: string | null;
};

export default function Chat({ currentChatId }: Props) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", currentChatId],
    queryFn: fetchMessages,
    enabled: !!currentChatId,
    refetchInterval: 1000,
  });

  const createChatMutation = useMutation({
      mutationFn: createChat,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chats"] }),
    });

  const sendMessageMutation = useMutation({
    mutationFn: () => sendMessageWithFile(input, file || undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", currentChatId] });
      setInput("");
      setFile(null);
    },
  });

  const handleSend = () => {
    if (!input.trim() && !file) return;
    if(currentChatId === null) {
      createChatMutation.mutate();
      sendMessageMutation.mutate();
    } else {
      sendMessageMutation.mutate();
    }
  };

  const renderMessage = (msg: any) => {
    if (msg.fileUrl) {
      if (msg.fileType?.startsWith("image/")) {
        return <img src={msg.fileUrl} alt="Imagen adjunta" style={{ maxWidth: "200px", borderRadius: 8 }} />;
      }
      if (msg.fileType === "application/pdf") {
        <a href={msg.fileUrl} target="_blank" download={`archivo-${msg.id}`} rel="noopener noreferrer" style={{ color: "#007bff" }}>
          Descargar PDF
        </a>
      }
      if (msg.fileType === "video/mp4") {
        <a href={msg.fileUrl} target="_blank" download={`archivo-${msg.id}`} rel="noopener noreferrer" style={{ color: "#007bff" }}>
          Descargar Video
        </a>
      }
      return (
        <a href={msg.fileUrl} target="_blank" download={`archivo-${msg.id}`} rel="noopener noreferrer" style={{ color: "#007bff" }}>
          Descargar archivo
        </a>
      );
    }
    return msg.message;
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 justify-between items-center">
      {!currentChatId ? (
        <div className="flex flex-col items-center justify-center gap-4 p-10 max-w-6xl">
          <h1 className="text-xl">Presentamos Chat MSW</h1>
          <p className="text-center">
            Chat MSW ahora cuenta con nuestro modelo más inteligente, rápido y útil hasta la fecha, con razonamiento integrado, para que siempre obtengas la mejor respuesta.
          </p>
        </div>
      ) : (
        <div className="bg-muted/50 w-full h-full flex rounded-xl md:min-h-min p-10 flex-col justify-start gap-2">
          {isLoading  ? (
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
                  className="inline-block rounded-2xl px-2.5 py-1.5"
                  style={{
                    background: msg.user === "Yo" ? "#4cafef" : "#ddd",
                    color: msg.user === "Yo" ? "white" : "black",
                  }}
                >
                  <strong>{msg.user}:</strong>{" "}
                  {msg.message === "___TYPING___" ? (
                    <span style={{ fontStyle: "italic", color: "#888" }}>
                      está escribiendo...
                    </span>
                  ) : (
                    <>
                      {renderMessage(msg)}
                    </>
                  )}
                </span>
              </div>
            ))
          )}
        </div>
      )}
      <div className="flex items-center justify-center gap-2 w-full bg-primary/5 p-2 rounded-lg">
        <Popover>
          <PopoverTrigger><Plus/></PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex items-center gap-2">
              <Paperclip/>
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                style={{ flex: "0 0 auto" }}
              />
            </div>
          </PopoverContent>
        </Popover>
        <div className="relative flex w-full min-w-0 flex-col p-2 py-0">
          <div className="w-full text-sm relative">
            <Input
              id="search"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessageMutation.mutate()}
              placeholder="Search the docs..."
              className="bg-background h-8 w-full shadow-none pl-8"
            />
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          </div>
        </div>
        <Button onClick={handleSend} disabled={sendMessageMutation.isPending}>
          {sendMessageMutation.isPending ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
}
