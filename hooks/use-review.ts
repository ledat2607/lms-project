"use client";

import { useState } from "react";
import { toast } from "sonner";

export function useReviewCourse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReview = async (
    courseId: string,
    rating: number,
    comment: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/data/user/review-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, rating, comment }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Có lỗi xảy ra khi gửi đánh giá");
        return null;
      }

      return data.review;
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi gửi đánh giá");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitReview, loading, error };
}
