import Link from "next/link";

type WPPage = {
  id: number;
  title: { rendered: string };
  slug: string;
};

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
