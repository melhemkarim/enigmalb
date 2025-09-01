"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, X, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext"; // ✅ use global cart

export default function ProductDetailsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("/product1.png");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Black");

  const { cart, addToCart, removeFromCart } = useCart();

  const product = {
    id: 1,
    name: "Minimalist Hoodie",
    description: "A clean and modern hoodie for your everyday style.",
    price: 59,
    images: ["/product1.png", "/product2.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
  };

  const recommendations = [
    { id: 2, name: "Graphic Tee", price: 29, image: "/product3.png" },
    { id: 3, name: "Canvas Tote", price: 19, image: "/product4.png" },
    { id: 4, name: "Streetwear Cap", price: 15, image: "/product5.png" },
  ];

  // ✅ fixed to use single selectedImage instead of product.images[]
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: selectedImage,
      size,
      color,
      quantity,
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-transparent mt-5  ">
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/">HOME</Link>
          <Link href="/#products">PRODUCTS</Link>
          <Link href="/#contact">CONTACT</Link>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/">
          <Image
            src="/logo-black.png" // ✅ put your logo file in /public/logo.png
            alt="Logo"
            width={60}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>

        <button onClick={() => setIsCartOpen(true)} className="relative">
          <ShoppingBag size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      {/* ✅ Content */}
      <div className="pt-40 px-6 md:px-16 max-w-6xl mx-auto ">
        <div className="grid md:grid-cols-2 gap-12 items-start border-b pb-12">
          {/* Product Image */}
          <div className="flex flex-col items-center">
            <Image
              src={selectedImage}
              alt={product.name}
              width={300}
              height={300}
              className="w-[300px] h-[300px] object-cover rounded-lg shadow-md"
            />
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <Image
                  key={img + i}
                  src={img}
                  alt="Thumbnail"
                  width={80}
                  height={80}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage === img
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-bold">${product.price}</p>

            {/* Sizes */}
            <div>
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 border rounded-md transition ${
                      size === s
                        ? "bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* ✅ Fixed Colors */}
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 border rounded-md transition ${
                      color === c
                        ? "ring-2 ring-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                    style={{
                      backgroundColor: c.toLowerCase(),
                      color: c === "White" ? "black" : "white",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center gap-3 border rounded-md w-32 justify-between px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1"
                >
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* ✅ Suggestions */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <Link key={rec.id} href={`/product/${rec.id}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative rounded-lg overflow-hidden shadow-md cursor-pointer"
                >
                  <Image
                    src={rec.image}
                    alt={rec.name}
                    width={400}
                    height={400}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                    {rec.name} – <span className="font-bold">${rec.price}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Cart Drawer */}
      {/* Cart Drawer */}
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40" onClick={() => setIsCartOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween" }}
              className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-lg z-50 p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Your Bag</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={24} className="hover:text-red-500" /></button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-500 text-center">Your bag is empty</p>
                </div>
              ) : (
                <div className="flex-1 space-y-4 overflow-y-auto">
                    {cart.map((item) => (
  <div
    key={`${item.id}-${item.size}-${item.color}`}
    className="flex justify-between items-center border-b pb-2"
  >
    <div>
      <h3 className="font-medium">{item.name}</h3>
      <p className="text-sm text-gray-600">
        {item.size} • {item.color} • ${item.price.toFixed(2)}
      </p>
    </div>
    <button
      onClick={() => removeFromCart(item.id, item.size, item.color)}
      className="text-red-500 text-sm hover:underline"
    >
      Remove
    </button>
  </div>
))}
                  </div>
                )}

              {cart.length > 0 && (
                <Link href="/checkout" className="mt-6 w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition">
                  View Cart & Checkout
                </Link>
              )}
            </motion.div>
          </>
        )}
    </div>
  );
}
