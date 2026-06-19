import BlogDetailClient from "./BlogDetailClient";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/seo";

const API_URL = process.env.API_URL || 'http://localhost:5000';

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
  const postUrl = `https://get-credit.in/blog/${post.slug || slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title,
      description,
      url: postUrl,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Get Credit Team'],
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : undefined,
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
  const post = blogData?.blog;
  const postUrl = post ? `https://get-credit.in/blog/${post.slug || slug}` : '';

  const breadcrumbJsonLd = post ? breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug || slug}` },
  ]) : null;

  return (
    <>
      {post && breadcrumbJsonLd && (
        <script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      {post && (
        <script
          id="blog-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema(post)) }}
        />
      )}
      <BlogDetailClient initialData={blogData} />
    </>
  );
}
