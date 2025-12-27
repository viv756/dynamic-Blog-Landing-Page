import BlogContent from "@/components/BlogContent";

type Props = {
  params: {
    slug: string;
  };
};

async function fetchPageBySlug(slug: string) {
  const res = await fetch(
    `https://campusify.io/wp-json/wp/v2/pages?slug=${slug}`,
    { next: { revalidate: 3600 } } // ISR
  );

  if (!res.ok) throw new Error("Failed to fetch page");

  const data = await res.json();
  console.log(data);

  return data[0];
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);
  console.log(page);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">{page.title.rendered}</h1>
    </main>
  );
}
