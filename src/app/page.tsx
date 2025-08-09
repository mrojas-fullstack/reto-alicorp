"use client"
import { AppSidebar } from "@/components/app-sidebar";
import Chat from "@/components/chat";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchChats } from "@/services/chats";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: store, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
    refetchInterval: 1000,
  }) as any;

  if (isLoading) return (
    <div className="flex flex-col space-y-3 justify-center items-center h-screen">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );

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
