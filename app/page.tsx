import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import dynamic from "next/dynamic";

const Features = dynamic(() => import("@/components/home/Features"), {
  loading: () => <div className="py-24" />,
});
const ChatPreview = dynamic(() => import("@/components/home/ChatPreview"), {
  loading: () => <div className="py-24" />,
});
const CTA = dynamic(() => import("@/components/home/CTA"), {
  loading: () => <div className="py-24" />,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <ChatPreview />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
