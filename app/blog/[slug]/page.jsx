import BlogDetailClient from "./BlogDetailClient";
import { blogPostingSchema } from "@/lib/seo";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getBlogData(slug) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch blog post data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getBlogData(slug);
  const post = data?.blog;

  if (!post) {
    return {
      title: "Blog Post Not Found | Get Credit Blog",
      robots: { index: false },
    };
  }

  const title = `${post.title} | Get Credit Blog`;
  const description = post.excerpt || post.summary || (post.content ? post.content.substring(0, 155) : "");

  return {
    title,
    description,
    alternates: {
      canonical: `https://get-credit.in/blog/${post.slug || slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://get-credit.in/blog/${post.slug || slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Get Credit Team'],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    }
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/api/blogs`);
    const data = await res.json();
    return (data.blogs || []).map((blog) => ({
      slug: blog.slug || blog._id,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blogData = await getBlogData(slug);

  return (
    <>
      {blogData?.blog && (
        <script
          id="blog-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema(blogData.blog)) }}
        />
      )}
      <BlogDetailClient initialData={blogData} />
    </>
  );
}
