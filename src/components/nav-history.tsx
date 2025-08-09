"use client"
import { MessageCircleDashed, MessageCircleMore, Trash } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "./ui/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { selectChat, deleteChat } from "@/services/chats";
import { Button } from "./ui/button"

export function NavHistory({
  history,
  activeChatId,
}: {
  history: any
  activeChatId: string | undefined | null
}) {
  const queryClient = useQueryClient();
  const { setOpenMobile} = useSidebar();

  const selectChatMutation = useMutation({
    mutationFn: selectChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const deleteChatMutation = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const handleDeleteChat = (chatId: string) => {
    deleteChatMutation.mutate(chatId);
    setOpenMobile(false);
  };

  const handleHistoryChat = (chatId: string) => {
    selectChatMutation.mutate(chatId)
    setOpenMobile(false);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chats History</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          { history.length > 0 ? 
          history.map((chatId:any) => (
            <SidebarMenuItem key={chatId}>
              <SidebarMenuButton asChild isActive={chatId === activeChatId}>
                <div onClick={() => handleHistoryChat(chatId)} className="cursor-pointer">
                  <MessageCircleMore />
                  <span>{chatId}</span>
                </div>
              </SidebarMenuButton>
              <Dialog>
                <DialogTrigger asChild>
                    <SidebarMenuAction asChild>
                      <Trash className="cursor-pointer"/>
                    </SidebarMenuAction>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>¿Estas seguro de eliminar el chat?</DialogTitle>
                      <DialogDescription>
                        Si eliminas no podras recuperarlo.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={() => handleDeleteChat(chatId)}>Eliminar {chatId}</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
              </Dialog>
            </SidebarMenuItem>
          )): (
            <SidebarMenuButton asChild>
              <div>
                <MessageCircleDashed />
                <p className="text-xs text-gray-600 px-2">
                  No se encontraron chats.
                </p>
              </div>
            </SidebarMenuButton>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
