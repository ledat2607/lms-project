"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { usePaymentConfetti } from "@/hooks/payment-confetti";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const { triggerPaymentConfetti } = usePaymentConfetti();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      toast.success("Send email successfull");
      e.currentTarget.reset();
      triggerPaymentConfetti();
      setLoading(false);
    } else {
      setStatus("❌ Something went wrong.");
    }
  }

  return (
    <div className="container mx-auto mt-10 px-4 max-w-5xl">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Liên hệ với chúng tôi
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Nếu bạn có câu hỏi hoặc cần trợ giúp, đội ngũ của chúng tôi luôn sẵn
          sàng hỗ trợ bạn. Hãy liên hệ qua biểu mẫu bên dưới hoặc thông tin liên
          hệ của chúng tôi.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact form */}
        <Card>
          <CardHeader>
            <CardTitle>Gửi tin nhắn cho chúng tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" placeholder="Tên của bạn" required />
              <Input
                name="email"
                type="email"
                placeholder="Email của bạn"
                required
              />
              <Textarea
                name="message"
                placeholder="Tin nhắn của bạn"
                rows={5}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Đang gửi..." : "Gửi tin nhắn"}
              </Button>
              {status && <p className="text-sm mt-2">{status}</p>}
            </form>
          </CardContent>
        </Card>

        {/* Contact details */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-500" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">support@yourlms.com</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-500" />
              <CardTitle>Điện thoại</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">+84 123 456 789</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <CardTitle>Địa chỉ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                123 Main Street, Thu Dau Mot City, Binh Duong, Vietnam
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
