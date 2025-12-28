import { Metadata } from "next";

import { fetchPageBySlug } from "@/lib/fetchPage";
import { cleanHTML } from "@/lib/sanitizeHtml";
import BlogContent from "@/components/BlogContent";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await fetchPageBySlug(params.slug);
  if (!page || !page.yoast_head_json) {
    return {
      title: "Campusify",
      description: "Campusify official website",
    };
  }

  const seo = page.yoast_head_json;

  return {
    title: seo?.title || page.title.rendered,
    description: seo?.og_description,
    alternates: {
      canonical: seo?.canonical,
    },
    openGraph: {
      title: seo?.og_title,
      description: seo?.og_description,
      url: seo?.og_url,
      images: seo?.og_image?.map((img: any) => ({
        url: img.url,
        width: img.width,
        height: img.height,
      })),
      siteName: seo?.og_site_name,
      type: "article",
    },
    twitter: {
      card: seo?.twitter_card,
    },
  };
}

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
