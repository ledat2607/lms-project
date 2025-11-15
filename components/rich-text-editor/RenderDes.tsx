"use client";

import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { generateHTML } from "@tiptap/react";
import parse from "html-react-parser";

export function RenderDescription({ json }: { json: JSONContent }) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const generated = generateHTML(json, [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ]);
      setHtml(generated);
    }
  }, [json]);

  if (!html) return null;

  return (
    <div className="prose dark:prose-invert prose-li:marker:text-primary">
      {parse(html)}
    </div>
  );
}
