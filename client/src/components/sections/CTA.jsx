import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const CTA = () => {
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
    <section id="cta" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl border border-gray-200 shadow-lg px-12 py-16 text-center">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl leading-tight font-bold text-gray-900 mb-6">
                Make your URLs stand out with{" "}
                <span className="block mt-2 italic">the link shortener</span>
              </h2>

              <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                Create memorable, shareable links that drive engagement and
                track performance in real-time.
              </p>

              <Button
                size="lg"
                onClick={handleGetStarted}
                className="font-semibold"
              >
                Explore Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
