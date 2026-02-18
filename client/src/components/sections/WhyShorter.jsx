import { motion } from "framer-motion";
import Card from "../../ui/Card";

const stats = [
  {
    number: "86.5%",
    label: "Number of Click Improvement",
  },
  {
    number: "78,855",
    label: "Link Shortened",
  },
  {
    number: "24.5%",
    label: "Total Clicks",
  },
];

const WhyShorter = () => {
  return (
    <section
      id="why"
      className="py-20 px-6 bg-gradient-to-br from-teal-100/40 via-blue-50/30 to-green-100/40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT - Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">
                Short URL
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                SHORT IS BETTER <span className="inline-block">🚀</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Now, tell a the first impression you give of yourself and your
                company on the web end on social networks the shorter a link is,
                the more it will be considered reliable, easy to remember and
                even more useful to share.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Imagine seeing a very long url, formed by a long string of
                letters, numbers and characters wished to you and to Instagram
                or in an email - clever!
              </p>
            </div>

            {/* Stats Display */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-4 text-center bg-white">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-gray-500 italic mt-6">
              So what are you looking for? Shorten your links! SHORT IS BETTER
              🚀
            </p>
          </motion.div>

          {/* RIGHT CONTENT - Illustration/Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.img
              src="/features-illustration.svg"
              alt="Analytics Illustration"
              className="w-full max-w-md mx-auto drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyShorter;
