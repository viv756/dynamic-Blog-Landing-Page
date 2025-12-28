import { cache } from "react";

export const fetchPageBySlug = cache(async (slug: string) => {
  const res = await fetch(
    `https://campusify.io/wp-json/wp/v2/pages?slug=${slug}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data[0];
});
