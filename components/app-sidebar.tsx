"use client";

import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Bảng điều khiển",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Khóa học",
      url: "/admin/courses",
      icon: IconListDetails,
    },

    {
      title: "Người dùng",
      url: "/admin/users",
      icon: IconUsers,
    },
  ],

  navSecondary: [
    {
      title: "Cài đặt",
      url: "/admin/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">LMS Store</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}></NavMain>
        <div className="flex items-center gap-2">
          {" "}
          <Separator className="flex-1" /> <Separator className="flex-1" />
        </div>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
