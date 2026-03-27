import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
    const {
        cartItems,
        cartCount,
        isCartOpen,
        closeCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    } = useCart();
    const navigate = useNavigate();

    const handleOrderOnWhatsApp = () => {
        if (cartItems.length === 0) return;

        let table = `---------------------
No Item           Qty
---------------------
`;

        cartItems.forEach((item, index) => {
            const name = item.name.length > 14
                ? item.name.slice(0, 14) + "… "
                : item.name.padEnd(16, " ");

            const qty = String(item.quantity).padEnd(3, " ");

            const no = String(index + 1).padEnd(3, " ");

            table += `${no}${name}${qty}\n`;
        });

        table += `---------------------`;

        let message = `Hi, I'm interested in ordering:

Products:\`\`\`
${table}
\`\`\`
Links:
`;

        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name}: https://sunjewellery.pages.dev/products/${item.id}\n`;
        });

        message += `
Please provide pricing and ordering details. Thank you!`;

        const whatsappUrl = `https://wa.me/919894692739?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const handleViewProduct = (id) => {
        closeCart();
        navigate(`/products/${id}`);
    };

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isCartOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeCart}
            />

            {/* Sidebar Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[70] shadow-2xl transition-transform duration-400 ease-in-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#bf7d1d]/20">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="h-6 w-6 text-[#bf7d1d]" />
                        <h2 className="text-xl font-serif font-semibold text-black">
                            Your Cart
                            {cartCount > 0 && (
                                <span className="ml-2 text-sm font-normal text-black/50">
                                    ({cartCount} {cartCount === 1 ? "item" : "items"})
                                </span>
                            )}
                        </h2>
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 rounded-lg cursor-pointer hover:bg-black/5 transition-colors duration-200"
                        aria-label="Close cart"
                    >
                        <X className="h-6 w-6 text-black" />
                    </button>
                </div>

                {/* Cart Content */}
                {cartItems.length === 0 ? (
                    /* Empty State */
                    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-[#bf7d1d]/10 flex items-center justify-center mb-6">
                            <ShoppingBag className="h-10 w-10 text-[#bf7d1d]/40" />
                        </div>
                        <h3 className="text-lg font-serif font-semibold text-black mb-2">
                            Your cart is empty
                        </h3>
                        <p className="text-black/50 text-sm mb-6 font-serif">
                            Browse our exquisite collection and add pieces you love
                        </p>
                        <button
                            onClick={() => {
                                closeCart();
                                navigate("/products");
                            }}
                            className="bg-[#8e5d14] hover:bg-[#bf7d1d] text-white px-6 py-2.5 rounded-lg cursor-pointer font-serif text-sm transition-colors duration-300"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 p-3 rounded-lg border border-[#bf7d1d]/15 bg-[#fdf8f0] hover:border-[#bf7d1d]/30 transition-colors duration-200"
                                >
                                    {/* Product Image */}
                                    <div
                                        className="w-20 h-20 min-w-[80px] rounded-lg overflow-hidden bg-gradient-to-br from-[#bf7d1d]/10 to-transparent cursor-pointer border border-[#bf7d1d]/10"
                                        onClick={() => handleViewProduct(item.id)}
                                    >
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-2xl text-[#bf7d1d]/20">✦</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4
                                            className="text-sm font-serif font-semibold text-black truncate cursor-pointer hover:text-[#bf7d1d] transition-colors"
                                            onClick={() => handleViewProduct(item.id)}
                                        >
                                            {item.name}
                                        </h4>
                                        {item.weight && (
                                            <p className="text-xs text-black/50 font-serif mt-0.5">
                                                {item.weight}
                                            </p>
                                        )}
                                        {item.product_code && (
                                            <p className="text-xs text-black/40 font-serif">
                                                Code: {item.product_code}
                                            </p>
                                        )}

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1 border border-[#bf7d1d]/20 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                    className="p-1.5 hover:bg-[#bf7d1d]/10 cursor-pointer transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="h-3 w-3 text-[#bf7d1d]" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-semibold text-black font-serif">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    className="p-1.5 hover:bg-[#bf7d1d]/10 cursor-pointer transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="h-3 w-3 text-[#bf7d1d]" />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 cursor-pointer rounded-lg transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Actions */}
                        <div className="border-t border-[#bf7d1d]/20 px-6 py-5 space-y-3 bg-white">
                            {/* Order on WhatsApp */}
                            <button
                                onClick={handleOrderOnWhatsApp}
                                className="w-full bg-[#25D346] hover:bg-[#20bd3e] text-white font-serif py-3 px-6 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 text-base font-semibold shadow-md hover:shadow-lg"
                            >
                                <img
                                    src="https://res.cloudinary.com/dj7qqxqph/image/upload/v1770573538/2_rz9gyy.png"
                                    alt="whatsapp"
                                    className="h-5 w-5"
                                />
                                Order On WhatsApp
                            </button>

                            {/* Clear Cart */}
                            <button
                                onClick={clearCart}
                                className="w-full text-black/40 hover:text-red-500 font-serif py-2 text-sm cursor-pointer transition-colors duration-200"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Transition Style */}
            <style>{`
        .duration-400 {
          transition-duration: 400ms;
        }
      `}</style>
        </>
    );
};

export default CartSidebar;
