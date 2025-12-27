import { fetchPageBySlug } from "@/lib/fetchPage";
import { cleanHTML } from "@/lib/sanitizeHtml";
import BlogContent from "@/components/BlogContent";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);
  const cleanContent = cleanHTML(page.content.rendered);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">{page.title.rendered}</h1>
      <BlogContent content={cleanContent} />
    </main>
  );
}
