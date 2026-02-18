import { motion } from "framer-motion";
import Card from "../../ui/Card";

const features = [
  {
    icon: "🎯",
    title: "Excellent",
    desc: "Use any links as short as you can, shorten them without limitations",
  },
  {
    icon: "🔥",
    title: "Fast",
    desc: "Create your short link in less than one second",
  },
  {
    icon: "🎨",
    title: "Customize",
    desc: "You can decide what you link has for creating a brand",
  },
  {
    icon: "📊",
    title: "Optimized and Safe",
    desc: "Know if visitors trust your brand with smart QR codes and detailed click stats",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            More than an URL Shortner
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore our features, and <br />
            <span className="italic">what makes our customers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
