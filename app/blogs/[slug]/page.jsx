import BlogDetails from "@/components/blogs/BlogDetails";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import { blogAPI } from "@/utils/api";
import { notFound } from "next/navigation";

// Dynamic metadata will be generated using generateMetadata function 
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    // Fetch blog data from backend
    const response = await blogAPI.getBlog(slug);
    
    if (!response.success || !response.data?.blog) {
      return {
        title: "Blog Not Found | Earlybirds Properties",
        description: "The requested blog post could not be found.",
      };
    }

    const blog = response.data.blog;
    
    // Use META information from database for SEO
    return {
      title: blog.metaTitle || `${blog.title} | Earlybirds Properties`,
      description: blog.metaDescription || `Read our latest blog post: ${blog.title}. ${blog.content ? blog.content.substring(0, 150) + '...' : 'Discover insights and updates from Earlybirds Properties.'}`
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Details | Earlybirds Properties",
      description: "Read our latest blog posts and insights on Earlybirds Properties.",
    };
  }
}

export default async function page({ params }) {
  const { slug } = await params;
  
  try {
    // Fetch blog data from backend
    const response = await blogAPI.getBlog(slug);
    
    if (!response.success || !response.data?.blog) {
      notFound();
    }

    const blog = response.data.blog;

    return (
      <>
        <Header />
        <BlogDetails blogId={slug} />
        <RelatedBlogs />
        <Footer parentClass="style-2" />
      </>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }
}
