import { Metadata } from "next";

import { fetchPageBySlug } from "@/lib/fetchPage";
import { cleanHTML } from "@/lib/sanitizeHtml";
import BlogContent from "@/components/BlogContent";

type Props = {
  params: {
    slug: string;
  };
};

/**
 * Generates dynamic SEO metadata for the page.
 *
 * Fetches the WordPress page using the slug.
 * Uses Yoast SEO data if available, otherwise falls back to default title/description.
 *
 * @param params - Contains the dynamic slug
 * @returns Metadata object for Next.js head
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await fetchPageBySlug(params.slug);

  // Fallback metadata if page or Yoast SEO data is unavailable
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

/**
 * Generates static paths for all WordPress pages.
 *
 * Used by Next.js for pre-rendering pages at build time (SSG).
 *
 * @returns Array of objects with `slug` for each page
 */

export async function generateStaticParams() {
  const res = await fetch("https://campusify.io/wp-json/wp/v2/pages");
  const pages = await res.json();

  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}

/**
 * Dynamic Page component for rendering a WordPress page.
 *
 * Fetches page content based on slug, cleans the HTML, and renders it.
 *
 * @param params - Contains the dynamic slug
 * @returns JSX element with cleaned page content
 */

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);

  // Clean HTML content to remove unwanted CSS, inline styles, and add lazy loading to images
  const cleanContent = cleanHTML(page.content.rendered);

  return (
    <main className="mt-20">
      <BlogContent content={cleanContent} />
    </main>
  );
}
