import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* Navigation Bar - Dynamic background on scroll */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 w-full ${isScrolled
          ? "bg-white shadow-lg"
          : "bg-black/60 shadow-none"
          } ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="max-w-full h-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Centered */}
            <div className="flex-1 flex justify-center">
              <div className="flex flex-col items-center gap-1">
                <img
                  src="https://res.cloudinary.com/dktx1ebxg/image/upload/v1768282931/logo_ibjz9b.png"
                  alt="SUN Jewellery"
                  className="h-16 pt-3"
                />
                <p className={`text-xs font-serif italic whitespace-nowrap ${isScrolled ? "text-black" : "text-accent/80"}`}>
                  Where Purity meets Precision
                </p>
              </div>
            </div>

            {/* Cart & Menu Buttons */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-accent/10"
                aria-label="Open cart"
              >
                {isScrolled ? (
                  <ShoppingBag className="h-6 w-6" color="#000000" />
                ) : (
                  <ShoppingBag className="h-6 w-6" color="#FFD700" />
                )}
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#bf7d1d] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-bounce-once">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger Menu Button - Gold color */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-accent/10"
                aria-label="Toggle menu"
              >
                {isScrolled ? (
                  <Menu className="h-6 w-6 text-accent" color="#000000" />
                ) : (
                  <Menu className="h-6 w-6 text-accent" color="#FFD700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-all duration-700 ease-in-out ${isOpen
          ? "translate-y-0 opacity-100 visible"
          : "-translate-y-full opacity-0 invisible"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={closeMenu}
          className="absolute top-6 cursor-pointer right-6 z-10 p-2 rounded-lg transition-all duration-300 hover:bg-black/5 active:scale-95"
          aria-label="Close menu"
        >
          <X className="h-8 w-8 text-black" strokeWidth={1.5} />
        </button>

        {/* Menu Content */}
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
          {/* Logo Section */}
          <div className="mb-16 text-center animate-fade-in">
            <img
              src="https://res.cloudinary.com/dktx1ebxg/image/upload/v1768282931/logo_ibjz9b.png"
              alt="SUN Jewellery"
              className="h-32 mx-auto mb-2"
            />
            <p className="text-md text-black font-serif italic">
              Where Purity meets Precision
            </p>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col items-center gap-12 mb-6">
            {links.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`text-5xl md:text-6xl font-serif font-light transition-all duration-300 relative group ${isActive(link.href) ? "text-[#bf7d1d]" : "text-black/80 hover:text-accent"
                  }`}
                style={{
                  animation: isOpen
                    ? `slideInUp 0.6s ease-out ${0.1 * (index + 1)}s both`
                    : "none",
                }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Footer Text */}
          <div className="absolute bottom-8 text-center">
            <p className="text-xs text-black/40 font-serif tracking-widest uppercase">
              Premium • Clean • Royal
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
