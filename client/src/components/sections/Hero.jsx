import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const Hero = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 pb-20 px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"
    >
      {/* Subtle Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 -right-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"
      />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl leading-tight font-bold text-gray-900">
            Make Your URL{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded italic">
                Short
              </span>
            </span>
            <br />
            <span className="font-bold italic">Branded And Practical</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
            Link Management Platform with all features you need in one place.
            Shorten, brand, manage and track your links the easy way.
          </p>

          <div className="pt-4">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="font-semibold"
            >
              Register For Free!
            </Button>
          </div>
        </motion.div>

        {/* RIGHT ILLUSTRATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <motion.img
            src="/hero.svg"
            alt="URL Shortener Illustration"
            className="w-full max-w-[520px] drop-shadow-xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
