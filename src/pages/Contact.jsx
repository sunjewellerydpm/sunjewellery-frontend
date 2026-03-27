import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Clock } from "lucide-react";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | SUN Jewellery</title>
        <meta name="description" content="Get in touch with SUN Jewellery - Dharapuram's most preferred Gold & Silver Jewellery store" />
      </Helmet>
      <main className="min-h-screen pt-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-serif text-accent text-center mb-8 font-semibold">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-accent mb-8 font-semibold">Get in Touch</h2>

              <div className="flex gap-4 p-6 bg-white border border-accent/20 rounded-lg hover:border-accent/50 hover:shadow-md transition-all duration-300">
                <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-accent font-serif font-semibold mb-1">Phone</p>
                  <a href="tel:+917010842174" className="text-black font-medium hover:text-accent transition-colors">+91 70108 42174</a>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-white border border-accent/20 rounded-lg hover:border-accent/50 hover:shadow-md transition-all duration-300">
                <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-accent font-serif font-semibold mb-1">Service Team</p>
                  <a href="tel:+918807666300" className="text-black font-medium hover:text-accent transition-colors">+91 8807 666 300</a>
                  <p className="text-black/60 text-sm font-medium mt-1">For complaints & service queries</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-white border border-accent/20 rounded-lg hover:border-accent/50 hover:shadow-md transition-all duration-300">
                <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-accent font-serif font-semibold mb-1">Location</p>
                  <p className="text-black font-medium">101, Big Bazaar Street</p>
                  <p className="text-black font-medium">Dharapuram, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-white border border-accent/20 rounded-lg hover:border-accent/50 hover:shadow-md transition-all duration-300">
                <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-accent font-serif font-semibold mb-1">Business Hours</p>
                  <p className="text-black font-medium">Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p className="text-black text-sm font-medium">Sun: Closed</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Section */}
            <div className="flex flex-col items-center justify-center bg-white border border-accent/20 rounded-lg p-8 shadow-sm">
              <div className="text-center mb-8">
                <img
                  src="https://res.cloudinary.com/dktx1ebxg/image/upload/v1772038121/whatsapp_jq2sp6.png"
                  alt="WhatsApp"
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h2 className="text-2xl font-serif text-accent mb-3 font-semibold">
                  Chat with Us on WhatsApp
                </h2>
                <p className="text-black/60 font-medium max-w-sm mx-auto">
                  Have a question about our jewellery? Need help with an order? Reach out to us directly on WhatsApp for quick assistance.
                </p>
              </div>

              <a
                href="https://wa.me/919894692739"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-sm bg-[#25D346] hover:bg-[#20bd3e] text-white font-serif py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold shadow-md hover:shadow-lg"
              >
                <img
                  src="https://res.cloudinary.com/dktx1ebxg/image/upload/v1772038121/whatsapp_jq2sp6.png"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
                Message Us on WhatsApp
              </a>

              <p className="text-black/40 text-sm font-medium mt-4">
                We typically respond within minutes
              </p>

              {/* Service info */}
              <div className="mt-8 pt-8 border-t border-accent/20 w-full text-center">
                <p className="text-black/60 font-medium text-sm">
                  For product servicing & complaints, contact our Service Team
                </p>
                <a href="tel:+918807666300" className="text-accent font-semibold text-lg hover:underline mt-1 inline-block">
                  8807 666 300
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
