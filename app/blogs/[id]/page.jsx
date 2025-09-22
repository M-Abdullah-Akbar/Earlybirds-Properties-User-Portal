import BlogDetails from "@/components/blogs/BlogDetails";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";

export const metadata = {
  title: "Blog Details || Homez - Real Estate NextJS Template",
  description: "Homez - Real Estate NextJS Template",
};

export default async function page({ params }) {
  const { id } = await params;
  console.log(id);
  return (
    <>
      <Header />
      <BlogDetails blogId={id} />
      <RelatedBlogs />
      <Footer parentClass="style-2" />
    </>
  );
}
