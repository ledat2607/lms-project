import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const user = await requireUser();
  try {
    const { courseId, rating, comment } = await req.json();


    if (!courseId || !rating) {
      return Response.json(
        { error: "Thiếu courseId hoặc rating." },
        { status: 400 }
      );
    }

    // Kiểm tra user đã mua khoá học chưa
    const enrolled = await prisma.errollment.findFirst({
      where: {
        userId: user.id,
        courseId,
        status: "Active",
      },
    });

    if (!enrolled) {
      return Response.json(
        { error: "Bạn chưa mua khóa học này nên không thể đánh giá." },
        { status: 403 }
      );
    }

    // Check review tồn tại chưa
    const existed = await prisma.review.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    let review;

    if (existed) {
      // update
      review = await prisma.review.update({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId,
          },
        },
        data: {
          rating,
          comment,
        },
      });
    } else {
      // create
      review = await prisma.review.create({
        data: {
          rating,
          comment,
          userId: user.id,
          courseId,
        },
      });
    }

    return Response.json(
      {
        message: existed
          ? "Cập nhật đánh giá thành công"
          : "Đánh giá thành công",
        review,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Review Error:", error);
    return Response.json({ error: "Lỗi server" }, { status: 500 });
  }
}
