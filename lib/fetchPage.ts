export async function fetchPageBySlug(slug: string) {
  const res = await fetch(
    `https://campusify.io/wp-json/wp/v2/pages?slug=${slug}`,
    { next: { revalidate: 3600 } } // ISR
  );

  if (!res.ok) throw new Error("Failed to fetch page");

  const data = await res.json();

  return data[0];
}
