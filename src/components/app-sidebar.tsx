"use client"
import { Bot } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"
import { NavHistory } from "./nav-history"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createChat } from "@/services/chats";
import { ChatStore } from "@/interfaces/chat.interface"

type Props = {
  store: ChatStore | undefined;
};
// Menu items.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

export function AppSidebar({ store }: Props) {
  const queryClient = useQueryClient();
  const createChatMutation = useMutation({
    mutationFn: createChat,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chats"] }),
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Bot />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain onClick={() => createChatMutation.mutate()} store={store}/>
        <NavHistory history={Object.keys(store?.chats || {})} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}