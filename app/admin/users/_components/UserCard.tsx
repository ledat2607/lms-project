"use client";
import { banUserAction, Unbanned } from "@/app/data/admin/bann-user";
import { UserAdminType } from "@/app/data/admin/user-function";
import { Badge } from "@/components/ui/badge";
import { useConstrucUrl } from "@/hooks/use-construct";
import { useTransition } from "react";
import { toast } from "sonner";
import { BanFormData, BanUserForm } from "./BanDialog";
import { Button } from "@/components/ui/button";

interface UserCardProps {
  user: UserAdminType;
}

export default function UserCard({ user }: UserCardProps) {
  const imageURL = useConstrucUrl(user?.image as string);
  const [isPending, startTransition] = useTransition();

  const handleBan = (data: BanFormData) => {
    startTransition(async () => {
      try {
        await banUserAction({
          userId: user.id,
          banReason: data.reason,
          banExpires: data.banExpires,
        });
        toast.success(`Đã ban ${user.name}`);
      } catch (error) {
        console.error(error);
        toast.error("Ban user thất bại");
      }
    });
  };

  const handleUnban = () => {
    startTransition(async () => {
      try {
        await Unbanned({ userId: user.id });
        toast.success(`Đã bỏ ban ${user.name}`);
      } catch (error) {
        console.error(error);
        toast.error("Un-Ban user thất bại");
      }
    });
  };

  return (
    <div className="border w-full p-4 rounded-xl mt-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center w-3/4 justify-between">
        <img src={imageURL} alt="img" className="w-16 h-16 rounded-full" />
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <Badge className="text-gray-100">
          Amount:{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(user.amount)}
        </Badge>
        <p className="text-xl font-bold">Total enrolled courses: 5</p>
      </div>
      {user.banned ? (
        <div className="flex items-center gap-2">
          <Button onClick={handleUnban}>Un-banned</Button>
        </div>
      ) : (
        <BanUserForm onConfirm={handleBan} />
      )}
    </div>
  );
}
