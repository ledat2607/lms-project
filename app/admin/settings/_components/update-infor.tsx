"use client";

import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

// helper xử lý ảnh
function getUserImageUrl(image?: string | null) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `https://lms-project-datn.t3.storage.dev/${image}`;
}
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ProfileSettingsPage({ user }: { user: any }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    amount: user?.amount || 0,
    image: getUserImageUrl(user?.image),
    rawImageKey: user?.image || "", // giữ key để update DB
  });
  const [loading, setLoading] = useState(false);
  const [uploading] = useState(false);

  // upload ảnh lên S3
  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Gọi API lấy presignedUrl
      const res = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          image: true,
        }),
      });

      if (!res.ok) throw new Error("Failed to get presigned URL");
      const { presignedUrl, key } = await res.json();

      // Upload ảnh trực tiếp lên S3
      await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // Cập nhật DB với key ảnh
      const updateRes = await fetch("/api/data/admin/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image: key }),
      });

      if (!updateRes.ok) throw new Error("Failed to update profile with image");
      // const data = await updateRes.json();

      // Cập nhật state hiển thị
      setForm((prev) => ({
        ...prev,
        image: getUserImageUrl(key),
      }));

      toast.success("Avatar updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update avatar");
    }
  }

  async function handleSave() {
    try {
      setLoading(true);

      const payload = {
        name: form.name,
        email: form.email,
        amount: form.amount,
        image: form.rawImageKey, // chỉ lưu key, DB sẽ kết hợp prefix domain
      };

      const res = await fetch("/api/data/admin/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      toast.success(
        `Hi ${data.user.name}, your profile was updated successfully!`
      );
    } catch (error) {
      console.error(error);
      toast.error(`Failed`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
      <p className="text-muted-foreground">
        Update your personal information and account details
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={form.image} alt={form.name} />
              <AvatarFallback>
                {form.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <Button
                variant="outline"
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? "Uploading..." : "Change Avatar"}
              </Button>
              <p className="text-sm text-muted-foreground">
                JPG, PNG, less than 5MB
              </p>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
