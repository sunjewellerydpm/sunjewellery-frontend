import { motion } from "framer-motion";
import { Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: 'https://res.cloudinary.com/dj7qqxqph/image/upload/v1774630553/location_fzdwvf.png', href: "https://maps.app.goo.gl/4j7j72MahMBYWwp78", label: "Location" },
    { icon: 'https://res.cloudinary.com/dj7qqxqph/image/upload/v1774630228/instagram_u5h1sz.png', href: "https://www.instagram.com/sunjewellerydpm", label: "Instagram" },
    { icon: 'https://res.cloudinary.com/dj7qqxqph/image/upload/v1774630228/whatsapp_avomhr.png', href: "https://wa.me/919894692739", label: "Whatsapp" },
    { icon: 'https://res.cloudinary.com/dj7qqxqph/image/upload/v1774630228/youtube_hbf7it.png', href: "https://www.youtube.com/@sungolddpm", label: "Youtube" },
  ];

  return (
    <footer className="relative bg-card border-t border-primary/20">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center md:text-left"
          >
            <h3 className="font-script text-primary text-3xl md:text-4xl mb-4">
              <img src="https://res.cloudinary.com/dktx1ebxg/image/upload/v1768282931/logo_ibjz9b.png" alt="" className="h-28 mx-auto" />
            </h3>
            <p className="font-serif text-muted-foreground text-sm md:text-base italic leading-relaxed">
              Crafting timeless elegance in gold & silver since generations. Where tradition meets modern sophistication.
            </p>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h4 className="font-serif text-foreground text-lg tracking-[0.15em] uppercase mb-6">
              Contact Us
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <div className="font-serif text-muted-foreground text-sm md:text-base">
                  <a href="tel:+917010842174" className="hover:text-primary transition-colors duration-300">
                    +91 70108 42174
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <div className="font-serif text-muted-foreground text-sm md:text-base">
                  <a href="tel:+917695984677" className="hover:text-primary transition-colors duration-300">
                    +91 76959 84677
                  </a>
                </div>
              </div>

              <div className="flex items-start justify-center gap-3 mt-6">
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <address className="font-serif text-muted-foreground text-sm md:text-base not-italic leading-relaxed">
                  101, Big Bazaar Street<br />
                  Dharapuram – 638 656
                </address>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center md:text-right"
          >
            <h4 className="font-serif text-foreground text-lg tracking-[0.15em] uppercase mb-6">
              Follow Us
            </h4>

            <div className="flex items-center justify-center md:justify-end gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 border border-primary/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
                >
                  <img src={social.icon} alt={social.label} className="w-4 h-4" />
                </a>
              ))}
            </div>

            <p className="font-serif text-muted-foreground text-xs mt-6 italic">
              Follow us for latest designs & offers
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-primary/10"
        >
          <p className="font-serif text-muted-foreground text-xs md:text-sm text-center tracking-wider">
            © {new Date().getFullYear()} SUN Jewellery. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
