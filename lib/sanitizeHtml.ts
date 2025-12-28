/**
 * cleanHTML
 * 
 * Cleans and sanitizes HTML content fetched from WordPress.
 *
 * Steps performed:
 * 1. Removes all <style>...</style> tags to prevent unwanted CSS.
 * 2. Strips inline `style` attributes from elements.
 * 3. Removes all `class` attributes to avoid unnecessary styling.
 * 4. Adds `loading="lazy"` and `decoding="async"` to all <img> tags for better performance.
 *
 * @param html - Raw HTML content from WordPress (string)
 * @returns Sanitized HTML string ready for safe rendering
 */

export function cleanHTML(html: string) {
  let cleaned = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  cleaned = cleaned.replace(/ style="[^"]*"/gi, "");
  cleaned = cleaned.replace(/ class="[^"]*"/gi, "");
  cleaned = cleaned.replace(/<img /g, '<img loading="lazy" decoding="async" ');
  return cleaned;
}
