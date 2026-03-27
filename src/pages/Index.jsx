import { Helmet } from "react-helmet-async";
import LuxurySlider from "@/components/slider/LuxurySlider";
import CollectionSection from "@/components/CollectionSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SUN Jewellery</title>
        <meta
          name="description"
          content="SUN Jewellery - Exquisite 22kt gold jewellery crafted with precision. Explore our exclusive range of chains, harams, bangles, and more in Dharapuram."
        />
      </Helmet>
      <main>
        <LuxurySlider />
        <CollectionSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
