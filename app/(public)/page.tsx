"use client";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import AuroraBackground from "@/components/AuroraBackground";

interface FeatureProps {
  title: string;
  description: string;
  icon: string;
}

const features: FeatureProps[] = [
  {
    title: "Học Tập Tương Tác",
    description:
      "Tham gia vào nội dung học tập tương tác giúp việc học trở nên thú vị và hiệu quả hơn.",
    icon: "📚",
  },
  {
    title: "Học Tập Qua Trò Chơi",
    description:
      "Biến việc học thành trò chơi với các thử thách thú vị, giúp bạn ghi nhớ kiến thức tốt hơn.",
    icon: "🎮",
  },
  {
    title: "Giảng Viên Chuyên Gia",
    description:
      "Học hỏi từ các chuyên gia đầu ngành và những người có chứng chỉ chuyên môn.",
    icon: "👩‍🏫",
  },
  {
    title: "Truy Cập Mọi Lúc, Mọi Nơi",
    description:
      "Học theo tốc độ của riêng bạn, bất cứ khi nào và ở bất cứ đâu.",
    icon: "⏰",
  },
];

export default function HomePage() {
  const { data: session } = authClient.useSession();

  return (
    <>
      <AuroraBackground />

      <section className="relative py-24 px-4 flex flex-col items-center text-center gap-4 space-y-8">
        <Badge className="text-base px-4 py-1">
          🚀 Tương Lai Của Học Trực Tuyến
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Nâng Tầm Trải Nghiệm Học Tập Của Bạn
        </h1>

        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Khám phá cách học mới với nền tảng sáng tạo của chúng tôi. Tham gia
          ngay hôm nay để khai phá tiềm năng của bạn.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            className={buttonVariants({ variant: "default", size: "lg" })}
            href="/courses"
          >
            Bắt đầu học
          </Link>

          {!session?.user?.id && (
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href="/login"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 container mx-auto px-4 pb-24">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="hover:shadow-xl transition-all border border-border/60 bg-background/80 backdrop-blur"
          >
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
