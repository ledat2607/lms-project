"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReviewCourse } from "@/hooks/use-review";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  courseTitle: string;
  courseId: string;
  onSubmit?: (data: { rating: number; comment: string }) => void;
}

export function ReviewModal({
  open,
  onClose,
  courseTitle,
  courseId,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { submitReview, loading } = useReviewCourse();

  const handleSubmit = async () => {
    if (!rating) return;

    const review = await submitReview(courseId, rating, comment);

    if (review) {
      onSubmit?.({ rating, comment });
    }

    if (!loading) {
      setRating(0);
      setComment("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Đánh giá khóa học: {courseTitle}</DialogTitle>
        </DialogHeader>

        {/* Rating */}
        <div className="flex items-center gap-1 my-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              className={cn(
                "w-6 h-6 cursor-pointer transition",
                num <= rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-400"
              )}
              onClick={() => setRating(num)}
            />
          ))}
        </div>

        {/* Comment */}
        <Textarea
          placeholder="Nhập nội dung đánh giá..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[120px]"
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0 || loading}>
            {loading ? "Đang gửi..." : "Gửi đánh giá"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
