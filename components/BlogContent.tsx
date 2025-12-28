const blogProse = `
  prose
    prose-lg
    max-w-none

    prose-h1:text-gray-900
    prose-h1:font-extrabold
    prose-h1:tracking-tight
    prose-h1:mb-6

    prose-h2:text-gray-900
    prose-h2:font-semibold
    prose-h2:mt-12
    prose-h2:mb-4

    prose-h3:text-gray-800
    prose-h3:font-semibold

    prose-p:text-gray-700
    prose-p:leading-relaxed
    prose-p:mb-6

    prose-a:text-blue-600
    prose-a:no-underline
    hover:prose-a:underline

    prose-ul:pl-6
    prose-li:marker:text-gray-400

    prose-img:rounded-xl
    prose-img:shadow-md
    prose-img:mx-auto
  
    prose-img:my-10
`;
export default function BlogContent({ content }: { content: string }) {
  return <article className={blogProse} dangerouslySetInnerHTML={{ __html: content }} />;
}
