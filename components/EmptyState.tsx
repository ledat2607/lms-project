import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  actionVariant?: "default" | "destructive" | "outline" | "secondary"; // tùy biến button nếu cần
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  actionVariant = "default",
}: EmptyStateProps) {
  return (
    <Card className="w-full max-w-md mx-auto text-center py-10">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {actionLabel && (
          <Link
            href={actionHref}
            className={buttonVariants({ variant: actionVariant })}
          >
            {actionLabel}
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
