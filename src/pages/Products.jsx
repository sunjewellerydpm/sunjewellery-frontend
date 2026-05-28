import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const API_BASE = import.meta.env.VITE_API_BASE;

const categories = [
  { name: "All", endpoint: `${API_BASE}/products` },
  { name: "Chains", endpoint: `${API_BASE}/category/chains` },
  { name: "Harams & Necklaces", endpoint: `${API_BASE}/category/harams-necklaces` },
  { name: "Bangles", endpoint: `${API_BASE}/category/bangles` },
  { name: "Ladies Bracelets", endpoint: `${API_BASE}/category/ladies-bracelets` },
  { name: "Gents Bracelets", endpoint: `${API_BASE}/category/gents-bracelets` },
  { name: "Ladies Rings", endpoint: `${API_BASE}/category/ladies-rings` },
  { name: "Gents Rings", endpoint: `${API_BASE}/category/gents-rings` },
  { name: "Studs & Earrings", endpoint: `${API_BASE}/category/studs-earrings` },
  { name: "Mangalyam", endpoint: `${API_BASE}/category/mangalyam` },
  { name: "Chokers", endpoint: `${API_BASE}/category/chokers` },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addedItems, setAddedItems] = useState({});
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categories.some(c => c.name === categoryFromUrl)) {
      return categoryFromUrl;
    }
    return "All";
  });

  const fetchProducts = async (pageNum = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const category = categories.find((c) => c.name === activeCategory);
      const response = await fetch(`${category.endpoint}?page=${pageNum}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      if (append) {
        setProducts(prev => [...prev, ...(data.products || [])]);
      } else {
        setProducts(data.products || []);
      }

      setPage(data.page || pageNum);
      setTotalPages(data.totalPages || 1);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setTotalPages(1);
    fetchProducts(1, false);
  }, [activeCategory]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchProducts(nextPage, true);
  };

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const hasMore = page < totalPages;

  return (
    <>
      <Helmet>
        <title>Products | SUN Jewellery</title>
        <meta name="description" content="Browse our exquisite collection of 22kt gold jewellery" />
      </Helmet>
      <main className="min-h-screen pt-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Collection Header Section */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-accent text-center mb-4 font-semibold">
              Our Collection
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif text-black text-center mb-6 font-light">
              Exquisite Craftsmanship
            </h2>
            <p className="text-black text-center mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              Explore our exclusive range of 22kt gold jewellery, crafted with precision and inspired by timeless traditions and modern elegance. Each piece reflects superior craftsmanship and the latest design trends.
            </p>
          </div>

          {/* Featured Collections Title */}
          <h3 className="text-3xl md:text-4xl font-serif text-accent text-center mb-6 font-semibold">
            Our Featured Collections
          </h3>

          {/* Category Filter Buttons */}
          <div className="mb-12 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2 justify-center min-w-max px-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-5 py-2.5 cursor-pointer rounded-full text-md font-semibold whitespace-nowrap transition-all duration-300 border ${activeCategory === category.name
                    ? "bg-[#bf7d1d] text-white border-accent shadow-lg shadow-accent/30"
                    : "bg-white text-accent border-accent/30 hover:border-accent hover:bg-accent/10"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleViewDetails(product.id)}
                    className="group relative cursor-pointer bg-white border border-accent/20 rounded-lg overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-square flex items-center justify-center overflow-hidden p-6">
  
  {/* Blurred Background */}
  {product.images && product.images.length > 0 && (
    <div
      className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-25"
      style={{
        backgroundImage: `url(${product.images[0]})`,
      }}
    />
  )}

  {/* Optional Overlay */}
  <div className="absolute inset-0 bg-white/40" />

  {/* Main Image */}
  {product.images && product.images.length > 0 ? (
    <img
      src={product.images[0]}
      alt={product.name}
      className="relative z-10 max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
    />
  ) : (
    <span className="relative z-10 text-6xl text-accent/20">✦</span>
  )}
</div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif text-accent mb-2 font-semibold">
                        {product.name || `Premium Collection ${product.id}`}
                      </h3>
                      <p className="text-black text-sm mb-4 font-medium line-clamp-2">
                        {product.description || "Exquisite 22kt gold jewellery piece"}
                      </p>
                      {product.weight && (
                        <p className="text-accent font-semibold mb-4">
                          {product.weight} Grams
                        </p>
                      )}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(product.id);
                          }}
                          className="flex-1 bg-[#8e5d14] hover:bg-[#bf7d1d] cursor-pointer text-white border border-accent/30 hover:border-accent/50 py-2 rounded-lg transition-all duration-300 font-serif text-sm">
                          View Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                            setAddedItems(prev => ({ ...prev, [product.id]: true }));
                            setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 1500);
                          }}
                          className={`px-3 py-2 rounded-lg cursor-pointer border transition-all duration-300 font-serif text-sm justify-center flex items-center gap-1.5 ${addedItems[product.id]
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-[#8e5d14] border-[#8e5d14] hover:bg-[#8e5d14] hover:text-white"
                            }`}
                        >
                          {addedItems[product.id] ? (
                            <>✓ Added</>
                          ) : (
                            <><ShoppingBag className="h-4 w-4" /> Add to cart</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-8 py-3 bg-[#8e5d14] hover:bg-[#bf7d1d] text-white font-serif text-lg rounded-lg border border-accent/30 hover:border-accent/50 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Loading...
                      </>
                    ) : (
                      "Load More Products"
                    )}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl text-accent/20 block mb-4">✦</span>
              <p className="text-black/60 text-lg">No products available at the moment.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
