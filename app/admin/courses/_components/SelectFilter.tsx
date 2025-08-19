"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courseStatus } from "@/lib/zodShema";

export function CourseFilter({ status }: { status?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <Select value={status} onValueChange={handleChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        {courseStatus.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
