import { motion } from "framer-motion";

function QuoteSection() {
  return (
    <section className="bg-[#E4E4E4] py-16 dark:bg-noir-850">
      <div className="mx-auto max-w-fit px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8">
          <p className="mb-2 mx-auto max-w-300 sm:max-w-330 text-2xl sm:text-4xl italic text-center font-['Source_Serif_4']  text-[#A4775B] dark:text-copper-300">
            "Luxury is when it seems flawless, when you reach the right balance between all elements that exist. It's an emotional reaction, standard, and comfort. The home should be the treasure chest of living." — Le Corbusier
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default QuoteSection;