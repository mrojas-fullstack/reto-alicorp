import { ChatMessage } from "@/interfaces/chat.interface";
import { Skeleton } from "./ui/skeleton";

type Props = {
  messages: ChatMessage[] | undefined;
  isLoading: boolean;
};

export default function Meeting({ messages, isLoading }: Props) {
  const renderMessage = (msg: any) => {
    if (msg.fileUrl) {
      if (msg.fileType?.startsWith("image/")) {
        return <img src={msg.fileUrl} alt="Imagen adjunta" style={{ maxWidth: "200px", borderRadius: 8 }} />;
      }
      if (msg.fileType === "application/pdf") {
        return(
          <a href={msg.fileUrl} target="_blank" download={`archivo-${msg.id}`} rel="noopener noreferrer" style={{ color: "#007bff" }}>
            Descargar PDF
          </a>
        )
      }
      if (msg.fileType === "video/mp4") {
        return(
          <a href={msg.fileUrl} target="_blank" download={`archivo-${msg.id}`} rel="noopener noreferrer" style={{ color: "#007bff" }}>
            Descargar Video
          </a>
        )
      }
      return (
        <a href={msg.fileUrl} target="_blank" download={`archivo-${msg.id}`} rel="noopener noreferrer" style={{ color: "#007bff" }}>
          Descargar archivo
        </a>
      );
    }
    return msg.message;
  };

  return(
    <div className="bg-muted/50 w-full h-full flex rounded-xl md:min-h-min p-10 flex-col justify-start gap-2">
      {isLoading  ? (
        <div className="flex flex-col space-y-3 justify-start items-center h-screen">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        messages?.map((msg, idx) => (
          <div
            key={idx}
            className="my-1 mx-0"
            style={{textAlign: msg.user === "Yo" ? "right" : "left"}}
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
                <span className="italic text-gray-500">
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
  )
}