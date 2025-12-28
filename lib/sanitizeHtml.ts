export function cleanHTML(html: string) {
  let cleaned = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  cleaned = cleaned.replace(/ style="[^"]*"/gi, "");
  cleaned = cleaned.replace(/ class="[^"]*"/gi, "");
  cleaned = cleaned.replace(/<img /g, '<img loading="lazy" decoding="async" ');
  return cleaned;
}
