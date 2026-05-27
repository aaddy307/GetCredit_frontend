import { blogPostingSchema } from "@/lib/seo";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Not found');
    const data = await res.json();
    const blog = data.blog;

    if (!blog) {
      return {
        title: "Blog Post Not Found",
        robots: { index: false },
      };
    }

    const title = `${blog.title} | Get Credit`;
    const description = blog.excerpt || `Read about ${blog.title} - expert insights and guidance from Get Credit.`;

    return {
      title: blog.title,
      description,
      openGraph: {
        title,
        description,
        url: `https://get-credit.in/blog/${blog.slug}`,
        type: 'article',
        publishedTime: blog.date,
        authors: [blog.author || 'Get Credit Team'],
        images: blog.coverImage ? [{ url: blog.coverImage }] : undefined,
      },
      twitter: {
        title,
        description,
      },
    };
  } catch {
    return {
      title: "Blog Post",
      description: "Read our latest blog post from Get Credit.",
    };
  }
}

export default async function BlogSlugLayout({ children, params }) {
  const { slug } = await params;
  let blog = null;

  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      blog = data.blog;
    }
  } catch {}

  return (
    <>
      {children}
      {blog && (
        <script
          id="blog-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema(blog)) }}
        />
      )}
    </>
  );
}
