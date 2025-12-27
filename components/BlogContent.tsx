import React from "react";

export default function BlogContent({ content }: { content: string }) {
  return (
    <div>
      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
