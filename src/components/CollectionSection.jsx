import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import chainsImg from "@/assets/collection-chains.jpeg";
import haramsImg from "@/assets/collection-harams1.jpeg";
import banglesImg from "@/assets/collection-bangles1.jpeg";
import ladiesbraceletsImg from "@/assets/collection-bracelets1.jpeg";
import gentsbraceletsImg from "@/assets/collection-bracelets2.jpeg";
import gentsringsImg from "@/assets/collection-rings1.jpeg";
import ladiesringsImg from "@/assets/collection-rings2.jpeg";
import earringsImg from "@/assets/collection-earrings.jpeg";
import chokersImg from "../assets/chokers.jpg"

const collections = [
  { name: "Chains", description: "Elegant daily wear and premium designs", image: chainsImg, category: "Chains" },
  { name: "Harams & Necklaces", description: "Grand traditional styles for weddings and functions", image: haramsImg, category: "Harams & Necklaces" },
  { name: "Bangles", description: "Classic and contemporary patterns", image: banglesImg, category: "Bangles" },
  { name: "Ladies Bracelets", description: "Stylish designs for a modern look", image: ladiesbraceletsImg, category: "Ladies Bracelets" },
  { name: "Ladies Rings", description: "Perfect blend of tradition and trend", image: ladiesringsImg, category: "Ladies Rings" },
  { name: "Studs & Earrings", description: "Lightweight and festive collections", image: earringsImg, category: "Studs & Earrings" },
  { name: "Gents Bracelets", description: "Stylish designs for a modern look", image: gentsbraceletsImg, category: "Gents Bracelets" },
  { name: "Gents Rings", description: "Perfect blend of tradition and trend", image: gentsringsImg, category: "Gents Rings" },
  { name: "Chokers", description: "Elegant choker collection", image: chokersImg, category: "chokers" }
];

const CollectionSection = () => {
  const navigate = useNavigate();

  const handleCollectionClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="relative bg-white py-24 md:py-32">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          {/* <span className="font-script text-[#bf7d1d] font-semibold text-3xl md:text-4xl block mb-4">
            Our Collection
          </span> */}
          <h2 className="font-serif font-medium text-main-heading text-2xl md:text-3xl lg:text-4xl tracking-[0.2em] uppercase mb-8">
            Exquisite Craftsmanship
          </h2>
          <div className="w-16 h-px bg-primary/60 mx-auto mb-8" />
          <p className="font-serif font-medium text-gray-600 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed italic">
            Explore our exclusive range of 18kt & 22kt gold jewellery, crafted with precision and inspired by timeless traditions and modern elegance. Each piece reflects superior craftsmanship and the latest design trends.
          </p>
        </motion.div>

        {/* Featured Collections Title */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-bold text-main-heading text-xl md:text-2xl tracking-[0.15em] uppercase text-center mb-12"
        >
          Our Featured Collections
        </motion.h3>

        {/* Collection Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: 0.1 * index,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group relative overflow-hidden border border-primary/20 bg-card/50 hover:border-primary/40 transition-all duration-500 cursor-pointer"
              onClick={() => handleCollectionClick(collection.category)}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40 transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-primary/60" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40 transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-primary/60" />

                <h4 className="font-serif text-foreground text-lg md:text-xl tracking-wider mb-2 group-hover:text-primary transition-colors duration-300">
                  {collection.name}
                </h4>
                <p className="font-serif text-muted-foreground text-sm md:text-base italic leading-relaxed">
                  {collection.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

export default CollectionSection;
