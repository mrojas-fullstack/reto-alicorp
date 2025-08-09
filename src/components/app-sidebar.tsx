"use client"
import { Bot } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"
import { NavHistory } from "./nav-history"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createChat } from "@/services/chats";
import { ChatStore } from "@/interfaces/chat.interface"
import { Separator } from "./ui/separator"

type Props = {
  store: ChatStore | undefined;
};
// Menu items.
const data = {
  user: {
    name: "Miguel Rojas",
    email: "mrojas.fullstack@gmail.com",
    avatar: "/avatar.png",
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
            <SidebarMenuButton asChild>
              <div className="cursor-pointer flex items-center gap-2">
                <Bot />
                <span>SOLUTION TECH</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator
        orientation="horizontal"
        className="mb-2 data-[orientation=horizontal]:w-full"
      />
      <SidebarContent>
        <NavMain onClick={() => createChatMutation.mutate()} store={store}/>
        <NavHistory history={Object.keys(store?.chats || {})} activeChatId={store?.currentChatId}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}