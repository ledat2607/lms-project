"use client";
import { ModeToggle } from "@/components/themeToggle";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FeatureProps {
  title: string;
  description: string;
  icon: string;
}

const features: FeatureProps[] = [
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content that makes learning fun and effective.",
    icon: "📚",
  },
  {
    title: "Gaming Learning",
    description:
      "Engage with interactive content that makes learning fun and effective.",
    icon: "🎮",
  },
];

export default function HomePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center gap-4 space-y-8">
          <Badge>The Future Of Online Study</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover a new way to learn with our innovative platform. Join us
            today and unlock your potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              className={buttonVariants({ variant: "default", size: "lg" })}
              href="/courses"
            >
              Get Started
            </Link>
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href="/login"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
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
