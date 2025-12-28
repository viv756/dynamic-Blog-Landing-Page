import { fetchPageBySlug } from "@/lib/fetchPage";
import { cleanHTML } from "@/lib/sanitizeHtml";
import BlogContent from "@/components/BlogContent";
import Header from "@/components/Header";

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
    <main className="max-w-7xl mx-auto px-4 ">
      <div className="mt-20">
        <BlogContent content={cleanContent} />
      </div>
    </main>
  );
}
