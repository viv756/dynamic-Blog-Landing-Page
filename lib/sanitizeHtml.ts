import sanitizeHtml from "sanitize-html";

/**
 * cleanHTML
 *
 * Cleans and sanitizes raw HTML content fetched from WordPress.
 *
 * Steps performed:
 * 1. Preserves only essential HTML tags for content (headings, paragraphs, lists, formatting, links, images, blockquotes, line breaks).
 * 2. Preserves only essential attributes:
 *    - Links: href, title
 *    - Images: src, alt, title, loading, decoding
 * 3. Removes all other tags completely (disallowedTagsMode: 'discard').
 * 4. Transforms <img> tags to add:
 *    - loading="lazy" (for lazy loading)
 *    - decoding="async" (to optimize image decoding)
 * 5. Transforms <a> tags to add:
 *    - rel="noopener noreferrer"
 *    - target="_blank" (open links safely in a new tab)
 * 6. Filters out <style> tags and removes all inline style and class attributes.
 *
 * @param html - Raw HTML content from WordPress
 * @returns Sanitized HTML string ready for safe rendering
 */

export function cleanHTML(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
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

    allowedAttributes: {
      a: ["href", "title"], // Preserve link attributes
      img: ["src", "alt", "title", "loading", "decoding"], // Preserve image attributes
    },

    disallowedTagsMode: "discard", // Remove all other tags

    transformTags: {
      // Optimize images
      img: (tagName, attribs) => ({
        tagName: "img",
        attribs: {
          ...attribs,
          loading: "lazy",
          decoding: "async",
        },
      }),
      // Make links safe
      a: (tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
    },

    exclusiveFilter(frame) {
      // Remove <style> tags completely
      if (frame.tag === "style") return true;

      // Strip style and class attributes from all elements
      if (frame.attribs) {
        delete frame.attribs.style;
        delete frame.attribs.class;
      }

      return false; // Keep the element if not filtered
    },
  });
}
