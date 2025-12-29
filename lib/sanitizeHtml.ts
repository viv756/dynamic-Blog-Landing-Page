import sanitizeHtml from "sanitize-html";

/**
 * Cleans and sanitizes HTML content coming from a controlled CMS source.
 *
 * Goals:
 * - Remove unsafe or unnecessary HTML (e.g., <style> tags)
 * - Strip inline styles and classes
 * - Remove empty elements that cause unwanted spacing
 * - Preserve semantic structure
 * - Improve performance by lazy-loading images
 */
export function cleanHTML(html: string): string {
  return sanitizeHtml(html, {
    // Allow only semantic and content-related HTML tags
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "ul", "ol", "li",
      "strong", "em",
      "a", "img", "blockquote", "br",
    ],

    // Restrict allowed attributes to safe, required ones
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "loading", "decoding"],
    },

    // Completely discard disallowed tags instead of escaping them
    disallowedTagsMode: "discard",

    // Modify specific tags to enforce best practices
    transformTags: {
      // Add performance-related attributes to images
      img: (tagName, attribs) => ({
        tagName: "img",
        attribs: {
          ...attribs,
          loading: "lazy",
          decoding: "async",
        },
      }),

      // Ensure links open safely in a new tab
      a: (tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    },

    // Custom filter to remove unwanted or empty nodes
    exclusiveFilter(frame) {
      // Remove <style> tags entirely
      if (frame.tag === "style") return true;

      // Remove empty elements (prevents excessive vertical spacing)
      const text = frame.text?.trim();
      const hasImage = frame.tag === "img";

      if (!hasImage && !text) {
        return true;
      }

      // Strip inline styles and class attributes
      if (frame.attribs) {
        delete frame.attribs.style;
        delete frame.attribs.class;
      }

      return false;
    },
  });
}
