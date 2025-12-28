import Link from "next/link";

type WPPage = {
  id: number;
  title: { rendered: string };
  slug: string;
};

/**
 * Fetches all WordPress pages from the API.
 *
 * Uses Incremental Static Regeneration (ISR) with `revalidate: 60` seconds
 * so the list is updated at most once per minute.
 *
 * @returns Promise resolving to an array of WPPage objects
 * @throws Error if the API request fails
 */

async function getPages(): Promise<WPPage[]> {
  const res = await fetch(
    "https://campusify.io/wp-json/wp/v2/pages",
    { next: { revalidate: 60 } } // ISR
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pages");
  }

  return res.json();
}

/**
 * PagesList component
 *
 * Fetches all WordPress pages and renders them as a list of links.
 * Each link navigates to the page's dynamic route using its slug.
 *
 * Uses Next.js <Link> with `prefetch` enabled for faster navigation.
 */

export default async function PagesList() {
  const pages = await getPages();

  return (
    <main className="max-w-3xl  p-6">
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>
      <ul className="space-y-3">
        {pages.map((page) => (
          <li key={page.id}>
            <Link href={`${page.slug}`} className="text-blue-600 hover:underline" prefetch>
              {page.title.rendered}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
