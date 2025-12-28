import DOMPurify from "isomorphic-dompurify";

export function cleanHTML(html: string) {
  // Remove <style> tags
  const noStyleTags = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // Sanitize HTML
  const sanitized = DOMPurify.sanitize(noStyleTags, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "a",
      "img",
      "blockquote",
      "br",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title"],
    FORBID_ATTR: ["style", "class"],
  });

  // Add loading="lazy" to all images
  const lazyImages = sanitized.replace(/<img /g, '<img loading="lazy" ');

  return lazyImages;
}
