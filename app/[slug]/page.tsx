import BlogContent from "@/components/BlogContent";

import { fetchPageBySlug } from "@/lib/fetchPage";

type Props = {
  params: {
    slug: string;
  };
};


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
