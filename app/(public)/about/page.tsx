import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Users, BookOpen, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto mt-10 px-4 max-w-5xl">
      {/* Hero */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Về Các Khóa Học Của Chúng Tôi</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Chúng tôi cung cấp các khóa học trực tuyến chất lượng cao, giúp bạn
          học kỹ năng mới, phát triển sự nghiệp và kết nối với cộng đồng học tập toàn cầu.
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="secondary">Học Linh Hoạt</Badge>
          <Badge variant="secondary">Giảng Viên Chuyên Nghiệp</Badge>
          <Badge variant="secondary">Cộng Đồng Toàn Cầu</Badge>
        </div>
      </div>

      {/* Sứ mệnh & Giá trị */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Sứ Mệnh Của Chúng Tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Chúng tôi hướng tới việc mang giáo dục đến với mọi người. Việc học
              nên linh hoạt, hấp dẫn và mang tính thực tiễn để giúp bạn thành công trong cuộc sống.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Giá Trị Cốt Lõi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Chất lượng và đổi mới trong giáo dục</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Phương pháp học tập lấy người học làm trung tâm</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Hợp tác và hỗ trợ cộng đồng</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Những gì chúng tôi cung cấp */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card>
          <CardHeader className="flex flex-col items-center">
            <BookOpen className="h-10 w-10 text-blue-500 mb-2" />
            <CardTitle>Khóa Học Toàn Diện</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Từ công nghệ, kinh doanh đến thiết kế và phát triển bản thân — chúng tôi
            mang đến các chủ đề đa dạng phù hợp cho mọi cấp độ học viên.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-center">
            <Users className="h-10 w-10 text-purple-500 mb-2" />
            <CardTitle>Giảng Viên Chuyên Gia</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Học hỏi từ những chuyên gia trong ngành với nhiều năm kinh nghiệm và kiến thức thực tế.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-center">
            <Globe className="h-10 w-10 text-emerald-500 mb-2" />
            <CardTitle>Cộng Đồng Toàn Cầu</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Tham gia vào mạng lưới đa dạng của người học và chuyên gia trên khắp thế giới —
            cùng nhau chia sẻ ý tưởng và phát triển bản thân.
          </CardContent>
        </Card>
      </div>

      {/* Lời kêu gọi hành động (CTA) */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Sẵn sàng bắt đầu hành trình học tập?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Khám phá danh mục khóa học ngay hôm nay và tìm ra khóa học phù hợp với
          mục tiêu cá nhân và nghề nghiệp của bạn.
        </p>
        <div className="flex justify-center">
          <Badge className="px-4 py-2 text-lg cursor-pointer">
            <Link href={"/courses"}>
              <Button>Xem Các Khóa Học</Button>
            </Link>
          </Badge>
        </div>
      </div>
    </div>
  );
}
