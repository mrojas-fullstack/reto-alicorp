"use client"
import { Bot, PanelRightOpen } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"
import { NavHistory } from "./nav-history"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createChat } from "@/services/chats";
import { ChatStore } from "@/interfaces/chat.interface"
import { Separator } from "./ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"

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
  const isMobile = useIsMobile();
  const { setOpenMobile} = useSidebar();
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
                <span className="flex justify-between items-center w-full">
                  SOLUTION TECH
                  {isMobile && <PanelRightOpen className="w-4 h-4" onClick={() => setOpenMobile(false)}/>}
                </span>
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