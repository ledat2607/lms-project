import { IconMoneybag, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminGetDashboardStat } from "@/app/data/admin/get-data-stats";

export async function SectionCards() {
  const {
    totalAmount,
    totalCourses,
    totalSignups,
    totalCustomers,
    totalLessons,
  } = await adminGetDashboardStat();
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 xl:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="!px-0">Tổng người đăng ký</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalSignups}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Người dùng đăng ký mới <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Trong 6 tháng gần nhất
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="!px-0">Khách hàng mới</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCustomers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +10%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tăng 10% so với kỳ trước <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Cần tập trung hơn vào thu hút
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="!px-0">Khoá học</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {totalCourses} khoá học - {totalLessons} bài học
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tỷ lệ giữ chân cao <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Tương tác vượt mục tiêu</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="!px-0">Doanh thu</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totalAmount)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Hiệu suất tăng trưởng ổn định{" "}
            <IconMoneybag className="size-4" />
          </div>
          <div className="text-muted-foreground">Đạt dự báo tăng trưởng</div>
        </CardFooter>
      </Card>
    </div>
  );
}
