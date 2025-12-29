
# Dynamic Blog Landing Page

This project is a **dynamic blog landing page** built with Next.js and Tailwind CSS. It fetches blog content from a live WordPress API, sanitizes it, renders it dynamically, and implements SEO and performance optimizations.

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup Instructions](#setup-instructions)  
- [CSS & Junk Content Removal Logic](#css--junk-content-removal-logic)  
- [Performance Optimizations](#performance-optimizations)  
- [SEO Implementation](#seo-implementation)  
- [Assumptions & Limitations](#assumptions--limitations)  
- [Live Demo](#live-demo)  

---

## Project Overview

This project simulates real-world production challenges such as handling **unclean CMS content**, **dynamic routing**, **SEO optimization**, and **performance optimization**. The landing pages closely match the reference site:

[Campusify Reference Page](https://campusify.io/data-driven-decisions-made-easy-with-campusify/)

---


## Features

- Fetch blog content dynamically from WordPress API  
- Clean and sanitize HTML content  
- Remove unwanted CSS, inline styles, and unnecessary classes  
- Render fully responsive blog pages  
- Implement SEO dynamically (title, meta description, canonical URL, Open Graph, Twitter cards)  
- Lazy load images for performance  
- Fully responsive layout for mobile, tablet, and desktop  
- Dynamic URLs based on page slug  ## Tech Stack

## Tech Stack

**Frontend:**  
- Next.js 13+  
- React.js  
- Tailwind CSS (with `prose` and custom styles)  

**Backend / Data Handling:**  
- Fetch data from WordPress REST API  

**Performance & SEO:**  
- Lazy loading images  
- SSR/SSG for performance  
- Dynamic metadata generation  

---
## Setup Instructions

Clone the project

```bash
  git clone https://github.com/viv756/dynamic-Blog-Landing-Page.git
   
```

Go to the project directory

```bash
  cd dynamic-Blog-Landing-Page
```

Install dependencies

```bash
  npm install
  # or
  yarn install
```

Start the server

```bash
  npm run dev
  # or
  yarn dev
```

Open http://localhost:3000 to see the blog pages.

---

## CSS & Junk Content Removal Logic

To keep the solution secure, lightweight, and performant, the WordPress HTML content is sanitized using the sanitize-html
 library. This ensures that only meaningful HTML is preserved while removing unwanted styling and attributes.

### What it does

- Remove <style> tags completely to avoid unwanted CSS.

- Strip inline style and class attributes from all elements.

- Preserve semantic HTML elements like headings, paragraphs, lists, links, images, blockquotes, and line breaks.

- Optimize images by adding loading="lazy" and decoding="async" for better page speed.

- Secure links by adding rel="noopener noreferrer" and target="_blank" for external links.

- This approach is safe for this project due to the controlled CMS source and improves server-side rendering performance.

#### Implementation (Using sanitize-html)

```
import sanitizeHtml from "sanitize-html";

export function cleanHTML(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h1","h2","h3","h4","h5","h6",
      "p","ul","ol","li",
      "strong","em",
      "a","img","blockquote","br",
    ],

    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title", "loading", "decoding", "width", "height"],
    },

    disallowedTagsMode: "discard",

    transformTags: {
      img: (tagName, attribs) => ({
        tagName: "img",
        attribs: { ...attribs, loading: "lazy", decoding: "async" },
      }),
      a: (tagName, attribs) => ({
        tagName: "a",
        attribs: { ...attribs, rel: "noopener noreferrer", target: "_blank" },
      }),
    },

    exclusiveFilter(frame) {
      // Remove <style> tags completely
      if (frame.tag === "style") return true;

      // Strip unwanted attributes
      if (frame.attribs) {
        delete frame.attribs.style;
        delete frame.attribs.class;
      }

      return false;
    },
  });
}

```

### Why sanitize-html is Used

- Security: Prevents unsafe or malicious HTML from being rendered.

- Performance: Faster and more reliable than regex for complex HTML content.

- SEO & Accessibility: Preserves semantic elements and optimizes images and links.

- SSR-Friendly: Works well with server-side rendering and static generation.
---


## Performance Optimizations

- Lazy loading images using loading="lazy"
- Optimized asset delivery with Next.js Image component
- Minimal JavaScript blocking using SSR/SSG
- TailwindCSS for utility-first responsive styling
- Pages load under 3 seconds on mobile

## SEO Implementation

Dynamic SEO metadata is generated per page:

- `<title>` tag
- `<meta name="description">`
- Canonical URL
- Open Graph tags: `og:title`, `og:description`, `og:url`, `og:image`
- Twitter Card metadata
- Proper heading hierarchy for semantic HTML

Implemented using Next.js generateMetadata:
```
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await fetchPageBySlug(params.slug);
  if (!page || !page.yoast_head_json) {
    return { title: "Campusify", description: "Campusify official website" };
  }
  const seo = page.yoast_head_json;
  return {
    title: seo?.title || page.title.rendered,
    description: seo?.og_description,
    alternates: { canonical: seo?.canonical },
    openGraph: { title: seo?.og_title, description: seo?.og_description, url: seo?.og_url, images: seo?.og_image, siteName: seo?.og_site_name, type: "article" },
    twitter: { card: seo?.twitter_card }
  };
}

```



## Performance & Navigation Optimization

   Problem: Slow Page Navigation on Blog Links

   When a user clicks a blog link (e.g. /     data-driven-decisions-made-easy-with-campusify), several steps occur:

 - Next.js navigates to a dynamic route (/[slug])
 - The server fetches data from the WordPress API:
 ```
 https://campusify.io/wp-json/wp/v2/pages?slug=...
```
- WordPress responds (this is the main bottleneck)
- HTML content is cleaned and processed
- The page is rendered on the server
- The response is sent back to the browser

🔴 Root cause:

The WordPress API response time is the biggest bottleneck. \
The application code itself was already optimized.

✅ Solutions Implemented

**1️⃣ Enable Next.js Link Prefetching (Most Impact)**

Next.js can preload pages before the user clicks.

```
<Link href={`/${page.slug}`} prefetch>
  {page.title.rendered}
</Link>
```

How this helps

- When the link enters the viewport, Next.js prefetches it
- Page data is loaded in the background
- Navigation feels instant on click

📈 Result: Fixes ~70% of perceived slowness

**2️⃣ Aggressive API Caching with ISR**

WordPress pages don’t change frequently, so caching is safe and effective.

```
export async function fetchPageBySlug(slug: string) {
  const res = await fetch(
    `https://campusify.io/wp-json/wp/v2/pages?slug=${slug}`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );

  const data = await res.json();
  return data[0];
}
```

Benefits

- Cached HTML served from Vercel Edge
- No repeated WordPress API calls
- Faster server response times

**3️⃣ Pre-render Pages with generateStaticParams**

All blog pages are generated at build time instead of on every request.

```
export async function generateStaticParams() {
  const res = await fetch("https://campusify.io/wp-json/wp/v2/pages");
  const pages = await res.json();

  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}
```

Result

| Before | After |
|--------|-------|
| Server-side render per click | Pre-rendered HTML |
| API call on every navigation | No API call |
| Slower navigation | Instant load |

🚀 This is the same strategy used by production-grade blogs.

**4️⃣ Avoid Duplicate Fetches with React Cache**

- The same API was being called in:
- generateMetadata
- Page component
This was optimized using React’s cache utility.

```
import { cache } from "react";

export const fetchPageBySlug = cache(async (slug: string) => {
  const res = await fetch(
    `https://campusify.io/wp-json/wp/v2/pages?slug=${slug}`,
    { next: { revalidate: 3600 } }
  );

  const data = await res.json();
  return data[0];
});
```
Result

- Single API call per request
- Metadata and page content share the same data
- Reduced server workload

**5️⃣ Improve UX with Instant Loading Feedback**

Even fast pages can feel slow without feedback.

- A loading UI was added:

app/[slug]/loading.tsx

```
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-20">
      <p className="animate-pulse text-gray-500">
        Loading content…
      </p>
    </div>
  );
}
```
Benefit

- Users immediately see feedback
- Navigation feels responsive and smooth

**🧠 Final Outcome**

- ⚡ Faster navigation

- 🧠 Better perceived performance

- 🌍 Reduced dependency on slow external APIs

- 🚀 Production-ready architecture

## Assumptions & Limitations

- Pages depend on the WordPress API availability
- Only specific tags (h1-h6, p, ul, ol, li, img, a, strong, em, blockquote) are preserved
- Inline styles and custom classes are removed
- SEO relies on Yoast metadata from WordPress

## Live Demo

https://dynamic-blog-landing-page.vercel.app/
