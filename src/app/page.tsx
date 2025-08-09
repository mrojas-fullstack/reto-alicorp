"use client"
import { AppSidebar } from "@/components/app-sidebar";
import Chat from "@/components/chat";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { fetchChats } from "@/services/chats";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: store, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
    refetchInterval: 1000,
  }) as any;

  if (isLoading) return <p>Cargando...</p>;

  return (
    <SidebarProvider>
      <AppSidebar store={store}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h2>Chat MSW - {store?.currentChatId}</h2>
        </header>
        <Chat currentChatId={store?.currentChatId}/>
      </SidebarInset>
    </SidebarProvider>
  );
}
