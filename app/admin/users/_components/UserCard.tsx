"use client";

import { BanUserForm, BanFormData } from "./BanDialog";
import { banUserAction, Unbanned } from "@/app/data/admin/bann-user";
import { UserAdminType } from "@/app/data/admin/user-function";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ShieldBan, ShieldCheck, Mail, ShoppingCart } from "lucide-react";
import { Crown } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface UserCardProps {
  user: UserAdminType;
  total?: number;
  isTopSpender?: boolean;
}

function getUserImageUrl(image?: string | null) {
  if (!image) return "";
  if (image.startsWith("https")) return image;
  return `https://lms-project-datn.t3.storage.dev/${image}`;
}

export default function UserCard({ user, total, isTopSpender }: UserCardProps) {
  const [, startTransition] = useTransition();

  const handleBan = (data: BanFormData) => {
    startTransition(async () => {
      try {
        await banUserAction({ userId: user.id, banReason: data.reason, banExpires: data.banExpires });
        toast.success(`Đã cấm ${user.name}`);
      } catch {
        toast.error("Cấm người dùng thất bại");
      }
    });
  };

  const handleUnban = () => {
    startTransition(async () => {
      try {
        await Unbanned({ userId: user.id });
        toast.success(`Đã bỏ cấm ${user.name}`);
      } catch {
        toast.error("Bỏ cấm thất bại");
      }
    });
  };

  return (
    <div className="relative">
      {/* Vương miện top spender */}
      {isTopSpender && (
        <Crown className="absolute -top-3 -right-3 text-yellow-400 size-8 drop-shadow-lg z-10" />
      )}

      <Card
        className={`rounded-2xl p-4 transition ${
          user.banned
            ? "border-red-500/40 bg-red-50 dark:bg-red-900/20"
            : "hover:shadow-md hover:border-primary/50"
        }`}
      >
        {/* Header */}
        <CardHeader className="flex flex-row items-center gap-3 p-0">
          <Avatar className="h-14 w-14 rounded-lg">
            <AvatarImage src={getUserImageUrl(user.image ?? "")} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">{user.name}</h2>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="size-4" />
              {user.email ?? "Không có email"}
            </span>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="mt-4 space-y-2 text-sm">
          <Badge variant="secondary" className="w-fit">
            Tổng chi tiêu:{" "}
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(user.amount)}
          </Badge>

          <div className="flex items-center gap-2 text-muted-foreground">
            <ShoppingCart className="size-4" />
            Đã đăng ký: <span className="text-foreground font-medium">{total}</span> khóa học
          </div>

          {user.banned && (
            <p className="text-red-600 font-semibold flex items-center gap-2">
              <ShieldBan className="size-4" /> Tài khoản đang bị cấm
            </p>
          )}
        </CardContent>

        {/* Actions */}
        <CardFooter className="flex justify-start p-0">
          {user.banned ? (
            <Button variant="outline" onClick={handleUnban} className="gap-2">
              <ShieldCheck className="size-4" /> Bỏ cấm
            </Button>
          ) : (
            <BanUserForm onConfirm={handleBan} />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
