"use client"
import { MessageCircleMore, Trash } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chats History</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {history.map((chatId:any) => (
            <SidebarMenuItem key={chatId}>
              <SidebarMenuButton asChild isActive={chatId === activeChatId}>
                <div onClick={() => selectChatMutation.mutate(chatId)} className="cursor-pointer">
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
                        <Button onClick={() => deleteChatMutation.mutate(chatId)}>Eliminar {chatId}</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
              </Dialog>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
