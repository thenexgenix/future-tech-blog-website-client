import BlogPostsSection from "@/components/home/BlogPostsSection";
import FeaturedHeader from "@/components/home/FeaturedHeader";
import FeaturedSection from "@/components/home/FeaturedSection";
import Hero from "@/components/home/Hero";
import ResourcesSection from "@/components/home/ResourcesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";


export default function Home() {
  return (
    <div>
      <Hero/>
      <FeaturedHeader/>
      <FeaturedSection/>
      <BlogPostsSection/>
      <ResourcesSection/>
      <TestimonialsSection/>
    </div>
  );
}
