import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | SUN Jewellery</title>
        <meta name="description" content="Learn about SUN Jewellery - Dharapuram's most preferred Gold & Silver Jewellery store since 2004" />
      </Helmet>
      <main className="min-h-screen pt-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-serif text-accent text-center mb-4 font-semibold">
            About Us
          </h1>
          <p className="text-center text-black/60 font-medium mb-12">
            22+ Years of Trust & Excellence
          </p>

          <div className="space-y-8">
            {/* Our Story */}
            <section className="bg-white border border-accent/20 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-2xl font-serif text-accent mb-4 font-semibold">Our Story</h2>
              <p className="text-black leading-relaxed mb-4 font-medium">
                In the year 2004, when other Traditional Jewellery stores had no stock and took orders with only Catalogues, <span className="text-accent font-semibold">NATARAJAN VELUSAMY</span> started SUN JEWELLERY with beautifully curated ready-made designs — <span className="italic">First in Dharapuram</span>. From then on, SUN JEWELLERY became the most preferred Gold & Silver Jewellery store in Dharapuram.
              </p>
              <p className="text-black leading-relaxed font-medium">
                With over <span className="text-accent font-semibold">22 YEARS OF EXPERIENCE</span> and more than <span className="text-accent font-semibold">10,000 SATISFIED CUSTOMERS</span> — Sun Jewellery is a prominent Jewellery Destination.
              </p>
            </section>

            {/* Our Collections */}
            <section className="bg-white border border-accent/20 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-2xl font-serif text-accent mb-4 font-semibold">Our Collections</h2>
              <p className="text-black leading-relaxed mb-6 font-medium">
                With designs ranging from <span className="font-semibold">Traditional Handmade</span> to <span className="font-semibold">New Age Trendy Nagas, Antique & Temple Designs</span>, we have a wide variety of exclusive collections.
              </p>
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 text-center">
                <p className="text-accent font-serif font-semibold text-lg mb-1">Visit Our Store</p>
                <p className="text-black font-medium">101, Big Bazaar Street, Dharapuram</p>
                <p className="text-black/60 text-sm font-medium mt-1">Experience our latest collections in person</p>
              </div>
            </section>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: "22+", label: "Years of Experience" },
                { value: "10,000+", label: "Satisfied Customers" },
                { value: "Since 2004", label: "Established" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-6 border border-accent/20 rounded-lg bg-white hover:bg-accent/5 transition-all duration-300">
                  <p className="text-3xl text-accent font-serif font-bold mb-1">{stat.value}</p>
                  <p className="text-black/60 font-medium text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* 100% Transparency */}
            <section className="bg-white border border-accent/20 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-2xl font-serif text-accent mb-4 font-semibold">100% Transparency</h2>
              <p className="text-black leading-relaxed font-medium">
                We are an ethical company and we adhere to the highest code of conduct and business practice. All the products undergo stringent quality checking. Each product is open to scrutiny. Each product's weight, wastage and MC are openly shared with you.
              </p>
            </section>

            {/* Customer Support */}
            <section className="bg-white border border-accent/20 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-2xl font-serif text-accent mb-4 font-semibold">Customer Support</h2>
              <p className="text-black leading-relaxed mb-4 font-medium">
                We not only sell Gold & Silver products but also have a dedicated Service Team. If you face any complaints or issues on the jewellery purchased from us — we assure you that we will service the product within <span className="text-accent font-semibold">24 hours</span> from getting the product in our hands.
              </p>
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 flex items-center gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-black/60 text-sm font-medium">Service Team</p>
                  <a href="tel:+918807666300" className="text-accent font-semibold text-lg hover:underline">
                    8807 666 300
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
