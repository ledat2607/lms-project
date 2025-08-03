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
    title: "Interactive Learning",
    description:
      "Engage with interactive content that makes learning fun and effective.",
    icon: "📚",
  },
  {
    title: "Gaming Learning",
    description:
      "Gamify your study experience and retain knowledge better through fun challenges.",
    icon: "🎮",
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry leaders and certified professionals.",
    icon: "👩‍🏫",
  },
  {
    title: "Anytime Access",
    description: "Study at your own pace, from anywhere and anytime.",
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
          🚀 The Future Of Online Study
        </Badge>

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

          {!session?.user?.id && (
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href="/login"
            >
              Sign In
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
