
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

**Frontend:**  
- Next.js 13+  
- React.js  
- Tailwind CSS (with `prose` and custom styles)  

**Backend / Data Handling:**  
- Fetch data from WordPress REST API  
- DOMPurify for HTML sanitization  

**Performance & SEO:**  
- Lazy loading images  
- SSR/SSG for performance  
- Dynamic metadata generation  

---
## Run Locally

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

Open http://localhost:3000/xpress to see the blog pages.


## CSS & Junk Content Removal Logic

- Remove <style> tags
- Remove inline style attributes
- Remove unnecessary classes
- Preserve meaningful HTML such as headings, paragraphs, lists, images, and links.

```
import DOMPurify from "isomorphic-dompurify";

export function cleanHTML(html: string) {

  const noStyleTags = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  const sanitized = DOMPurify.sanitize(noStyleTags, {
    ALLOWED_TAGS: ["h1","h2","h3","h4","h5","h6","p","ul","ol","li","strong","em","a","img","blockquote","br"],
    ALLOWED_ATTR: ["href","src","alt","title"],
    FORBID_ATTR: ["style","class"],
  });
  
  const lazyImages = sanitized.replace(/<img /g, '<img loading="lazy" ');
  return lazyImages;
}

```


## Performance Optimizations

- Lazy loading images using loading="lazy"
- Optimized asset delivery with Next.js Image component
- Minimal JavaScript blocking using SSR/SSG
- TailwindCSS for utility-first responsive styling
- Pages load under 3 seconds on mobile

## SEO Implementation

Dynamic SEO metadata is generated per page:

- <title> tag
- <meta name="description">
- Canonical URL
- Open Graph tags: og:title, og:description, og:url, og:image
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

## Assumptions & Limitations

- Pages depend on the WordPress API availability
- Only specific tags (h1-h6, p, ul, ol, li, img, a, strong, em, blockquote) are preserved
- Inline styles and custom classes are removed
- SEO relies on Yoast metadata from WordPress

## Live Demo

https://your-live-deployed-site.com
