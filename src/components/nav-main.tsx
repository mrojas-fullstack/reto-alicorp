"use client"
import { Search, SquarePen } from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "./ui/dialog"
import { Input } from "./ui/input"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { selectChat } from "@/services/chats";

export function NavMain({
  store,
  onClick,
}: {
  onClick?: () => void
  store?: any
}) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const { setOpenMobile} = useSidebar();

  const selectChatMutation = useMutation({
    mutationFn: selectChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const filteredChats = Object.keys(store?.chats || {}).filter((chatId) => {
    const lastMessage =
      store?.chats[chatId]?.[store.chats[chatId].length - 1]?.message || "";
    const term = search.toLowerCase();
    return (
      chatId.toLowerCase().includes(term) ||
      lastMessage.toLowerCase().includes(term)
    );
  });

  const handleNewChat = () => {
    if (onClick) {
      onClick();
    }
    setOpenMobile(false);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <div onClick={handleNewChat} className="cursor-pointer">
              <SquarePen />
              <span>Nuevo chat</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <SidebarMenuButton asChild>
                    <div className="cursor-pointer">
                      <Search />
                      <span>Buscar chats</span>
                    </div>
                  </SidebarMenuButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Buscar Chats</DialogTitle>
                    <DialogDescription>
                      <Input 
                        id="search" 
                        name="search" 
                        placeholder="Buscar chats..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </DialogDescription>
                  </DialogHeader>
                  {filteredChats.length === 0 ? (
                      <p className="text-xs text-gray-600">
                        No se encontraron chats.
                      </p>
                    ) : (
                      filteredChats.map((chatId) => {
                        const lastMessage = store?.chats[chatId]?.[store.chats[chatId].length - 1]?.message || "";
                        return (
                          <div key={chatId} className="flex justify-between items-center p-2 mb-2 rounded-md">
                            <DialogClose asChild>
                              <div
                                className="flex-1 cursor-pointer"
                                onClick={() => selectChatMutation.mutate(chatId)}
                              >
                                <div className="font-bold">{chatId}</div>
                                {lastMessage && (
                                  <div className="text-xs text-nowrap overflow-hidden overflow-ellipsis text-gray-600">
                                    {lastMessage}
                                  </div>
                                )}
                              </div>
                            </DialogClose>
                          </div>
                        );
                      })
                    )}
                </DialogContent>
              </form>
            </Dialog>
          </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
