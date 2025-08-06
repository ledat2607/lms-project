"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Uploader } from "@/components/file-uploader/Uploader";
import { useConstrucUrl } from "@/hooks/use-construct";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/use-confetti";

interface EditProfileModalProps {
  user: {
    name: string;
    image: string;
    email: string;
  };
  children: React.ReactNode;
  onSave: (data: { name: string; image: string; email: string }) => void;
}

export function EditProfileModal({
  user,
  children,
  onSave,
}: EditProfileModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image);
  const [email, setEmail] = useState(user.email);

  const [isPending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

 const handleSubmit = async () => {
   startTransition(async () => {
     try {
       await onSave({ name, image, email });
       triggerConfetti(); // 🎉
       toast.success("Profile updated!");
       setOpen(false); // ✅
     } catch (error) {
       toast.error("Update failed");
     }
   });
 };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Uploader
            value={image}
            onChange={(value) => setImage(value)}
            fileAccepted="image"
          />
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isPending}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
