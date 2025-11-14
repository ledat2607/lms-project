"use client";

import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavCloudItem {
  title: string;
  url: string;
  icon?: Icon;
  items?: {
    title: string;
    url: string;
  }[];
}

export function NavDev({ items }: { items: NavCloudItem[] }) {
  const pathName = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActiveParent =
              pathName === item.url ||
              item.items?.some((child) => child.url === pathName);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`flex items-center gap-2 ${
                    isActiveParent ? "bg-primary text-white font-semibold" : ""
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <Link href={item.url}>{item.title}</Link>
                </SidebarMenuButton>

                {/* render children nếu có */}
                {item.items && item.items.length > 0 && (
                  <SidebarMenu className="ml-6 mt-1 space-y-1">
                    {item.items.map((child) => {
                      const isActiveChild = pathName === child.url;
                      return (
                        <SidebarMenuItem key={child.title}>
                          <SidebarMenuButton
                            tooltip={child.title}
                            className={`${
                              isActiveChild
                                ? "bg-primary/80 text-white"
                                : "text-gray-600"
                            }`}
                          >
                            <Link href={child.url}>{child.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
