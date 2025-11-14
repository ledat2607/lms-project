"use client";

import { useEffect, useState } from "react";
import { GetCategory } from "@/app/admin/courses/create/action";
import { Button } from "@/components/ui/button";

export default function CategoryList({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    (async () => {
      const data = await GetCategory();
      setCategories(data.categories || []);
    })();
  }, []);

  if (!categories.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant={selected === null ? "default" : "outline"}
        onClick={() => onSelect(null)}
      >
        Tất cả
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selected === cat.id ? "default" : "outline"}
          onClick={() => onSelect(cat.id)}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}
