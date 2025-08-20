import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Users, BookOpen, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto mt-10 px-4 max-w-5xl">
      {/* Hero */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          About Our Courses
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We provide high-quality online courses designed to help you gain new
          skills, grow your career, and connect with a global learning
          community.
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="secondary">Flexible Learning</Badge>
          <Badge variant="secondary">Expert Instructors</Badge>
          <Badge variant="secondary">Global Community</Badge>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We aim to make education accessible to everyone. Learning should
              be flexible, engaging, and practical for real-world success.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Quality and innovation in education</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Student-centered learning approach</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Collaboration and community support</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What we offer */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card>
          <CardHeader className="flex flex-col items-center">
            <BookOpen className="h-10 w-10 text-blue-500 mb-2" />
            <CardTitle>Comprehensive Courses</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            From technology and business to design and personal development, we
            cover a wide range of topics for all levels.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-center">
            <Users className="h-10 w-10 text-purple-500 mb-2" />
            <CardTitle>Expert Instructors</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Learn from industry professionals with years of experience and
            hands-on knowledge.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-center">
            <Globe className="h-10 w-10 text-emerald-500 mb-2" />
            <CardTitle>Global Community</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Join a diverse network of learners and professionals worldwide,
            sharing ideas and growing together.
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Ready to start learning?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our catalog today and discover courses that fit your personal
          and professional goals.
        </p>
        <div className="flex justify-center">
          <Badge className="px-4 py-2 text-lg cursor-pointer">
            Browse Courses
          </Badge>
        </div>
      </div>
    </div>
  );
}
