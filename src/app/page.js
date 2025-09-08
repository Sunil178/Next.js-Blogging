import { Layout } from "antd";
import Hero from "@/components/layout/Hero";
import Features from "@/components/layout/Features";
import Articles from "@/components/layout/Articles";
import Footer from "@/components/layout/Footer";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout>
        <Hero />
        <Features />
        <Articles />
      <Footer />
    </Layout>
  );
}
