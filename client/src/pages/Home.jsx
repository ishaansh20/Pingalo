import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import WhyShorter from "../components/sections/WhyShorter";
import CTA from "../components/sections/CTA";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <WhyShorter />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
