"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export function ClearFilterButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status"); // xoá query "status"
    const query = params.toString();
    router.push(query ? `/admin/courses?${query}` : "/admin/courses");
  };

  return (
    <Button variant="default" onClick={handleClear}>
      <XIcon className="mr-2 h-4 w-4" />
      Clear
    </Button>
  );
}
