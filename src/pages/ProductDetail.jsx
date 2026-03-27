import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const API_BASE = import.meta.env.VITE_API_BASE;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const { addToCart } = useCart();

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the specific product
        const response = await fetch(`${API_BASE}/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        console.log(data);
        setProduct(data);

        // Fetch all products for related products section
        const allProductsResponse = await fetch(`${API_BASE}/products`);
        if (allProductsResponse.ok) {
          const allProductsData = await allProductsResponse.json();
          const allProducts = allProductsData.products || [];
          // Filter out current product and take first 3
          const related = allProducts.filter(p => p.id !== id && p.id !== parseInt(id)).slice(0, 3);
          setRelatedProducts(related);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <>
        <main className="min-h-screen pt-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <main className="min-h-screen pt-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-300 mb-8"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Products</span>
            </button>
            <div className="text-center py-20">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Product not found
  if (!product) {
    return (
      <>
        <main className="min-h-screen pt-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-300 mb-8"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Products</span>
            </button>
            <p className="text-center text-black/60 text-lg">Product not found</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return null;
    return `₹${price.toLocaleString()}`;
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | SUN Jewellery</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <main className="min-h-screen pt-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Products</span>
          </button>

          {/* Product Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="w-full aspect-square bg-gradient-to-br from-accent/10 to-transparent rounded-lg flex items-center justify-center border border-accent/20 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-9xl text-accent/20">✦</span>
                )}
              </div>
              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImageIndex === index
                        ? 'border-accent shadow-md'
                        : 'border-accent/20 hover:border-accent/50'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              {/* Collection Tag */}
              {product.collection && (
                <div className="inline-block mb-4 w-fit">
                  <span className="text-sm font-serif text-accent bg-accent/10 px-4 py-2 rounded-full border border-accent/30">
                    {product.collection}
                  </span>
                </div>
              )}

              {/* Category Tag (fallback if no collection) */}
              {!product.collection && product.category && (
                <div className="inline-block mb-4 w-fit">
                  <span className="text-sm font-serif text-accent bg-accent/10 px-4 py-2 rounded-full border border-accent/30">
                    {product.category}
                  </span>
                </div>
              )}

              {/* Product Title */}
              <h1 className="text-4xl md:text-5xl font-serif text-accent mb-4 font-semibold">
                {product.name}
              </h1>

              {/* Price */}
              {/* {(product.price || product.discountPrice) && (
                <div className="mb-6 pb-6 border-b border-accent/20">
                  {product.discountPrice ? (
                    <div className="flex items-center gap-3">
                      <p className="text-3xl font-serif text-accent font-semibold">
                        {formatPrice(product.discountPrice)}
                      </p>
                      <p className="text-xl font-serif text-black/40 line-through">
                        {formatPrice(product.price)}
                      </p>
                      <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full font-medium">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </span>
                    </div>
                  ) : (
                    <p className="text-3xl font-serif text-accent font-semibold">
                      {formatPrice(product.price)}
                    </p>
                  )}
                </div>
              )} */}

              {/* Description */}
              {product.description && (
                <p className="text-black text-lg mb-8 leading-relaxed font-medium">
                  {product.description}
                </p>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-serif text-accent font-semibold mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-black font-medium">
                        <span className="h-2 w-2 bg-accent rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Product Details */}
              {product.details && product.details.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-serif text-accent font-semibold mb-4">
                    Product Details
                  </h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-3 text-black font-medium">
                        <span className="h-2 w-2 bg-accent rounded-full"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {(product.weight || product.karat || product.product_code) && (
                <div className="mb-8 p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h3 className="text-xl font-serif text-accent font-semibold mb-4">
                    Specifications
                  </h3>
                  <ul className="space-y-2">
                    {product.karat && (
                      <li className="flex items-center gap-3 text-black font-medium">
                        <span className="h-2 w-2 bg-accent rounded-full"></span>
                        Purity: {product.karat}
                      </li>
                    )}
                    {product.weight && (
                      <li className="flex items-center gap-3 text-black font-medium">
                        <span className="h-2 w-2 bg-accent rounded-full"></span>
                        Weight: {product.weight}
                      </li>
                    )}
                    {product.product_code && (
                      <li className="flex items-center gap-3 text-black font-medium">
                        <span className="h-2 w-2 bg-accent rounded-full"></span>
                        Product Code: {product.product_code}
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    addToCart(product);
                    setAddedToCart(true);
                    setTimeout(() => setAddedToCart(false), 2000);
                  }}
                  className={`flex-1 rounded-xl cursor-pointer font-serif py-3 px-6 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold border-2 ${addedToCart
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-[#8e5d14] text-[#8e5d14] hover:bg-[#8e5d14] hover:text-white"
                    }`}
                >
                  {addedToCart ? (
                    <>✓ Added to Cart</>
                  ) : (
                    <><ShoppingBag className="h-5 w-5" /> Add to Cart</>
                  )}
                </button>
                <button
                  onClick={() => {
                    const priceText = product.discountPrice
                      ? formatPrice(product.discountPrice)
                      : (product.price ? formatPrice(product.price) : '');

                    const message = `Hi, I'm interested in ordering:

Product: ${product.name}  
Code: ${product.product_code || '-'}  
weight: ${product.weight || '-'}  
Link: ${`https://sunjewellery.pages.dev/products/${product.id}`}

Please provide pricing and ordering details. Thank you!`;

                    const whatsappUrl = `https://wa.me/919894692739?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="flex-1 bg-[#25D346] hover:bg-[#25D356] rounded-xl cursor-pointer text-white font-serif py-3 px-6 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold"
                >
                  <img src="https://res.cloudinary.com/dj7qqxqph/image/upload/v1770573538/2_rz9gyy.png" alt="whatsapp" className="h-5 w-5" />
                  Order on WhatsApp
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-accent/20">
                <p className="text-sm text-black/60 font-medium text-center">
                  ✓ Direct WhatsApp Ordering | ✓ Personalized Assistance | ✓ 100% Authentic Guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-accent/20">
              <h2 className="text-3xl font-serif text-accent mb-8 font-semibold text-center">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="group relative bg-white border border-accent/20 rounded-lg overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all duration-300 text-left"
                  >
                    <div
                      className="aspect-square bg-gradient-to-br from-accent/5 to-transparent flex items-center justify-center overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/products/${relatedProduct.id}`)}
                    >
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-6xl text-accent/20">✦</span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif text-accent mb-2 font-semibold">
                        {relatedProduct.name}
                      </h3>
                      {relatedProduct.weight && (
                        <p className="text-black text-sm mb-4 font-medium">
                          {relatedProduct.weight} Grams
                        </p>
                      )}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => navigate(`/products/${relatedProduct.id}`)}
                          className="w-full bg-[#8e5d14] hover:bg-[#bf7d1d] cursor-pointer text-white border border-accent/30 hover:border-accent/50 py-2 rounded-lg transition-all duration-300 font-serif text-sm text-center"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            addToCart(relatedProduct);
                            setAddedItems(prev => ({ ...prev, [relatedProduct.id]: true }));
                            setTimeout(() => setAddedItems(prev => ({ ...prev, [relatedProduct.id]: false })), 1500);
                          }}
                          className={`w-full px-3 py-2 rounded-lg cursor-pointer border transition-all duration-300 font-serif text-sm justify-center flex items-center gap-1.5 ${addedItems[relatedProduct.id]
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-[#8e5d14] border-[#8e5d14] hover:bg-[#8e5d14] hover:text-white"
                            }`}
                        >
                          {addedItems[relatedProduct.id] ? (
                            <>✓ Added</>
                          ) : (
                            <><ShoppingBag className="h-4 w-4" /> Add to Cart</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
