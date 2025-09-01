"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "./context/CartContext";

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "Graphic T-Shirt", price: 29.99, image: "/product1.png", category: "Tops" },
  { id: 2, name: "Leather Bracelet", price: 19.99, image: "/product1.png", category: "Accessories" },
  { id: 3, name: "Poster Artwork", price: 14.99, image: "/product1.png", category: "Posters" },
];

const categories = ["All", "Tops", "Accessories", "Posters"];

export default function HomePage() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "M",
      color: "Black",
      quantity: 1,
    });
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(null), 2500);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 fixed w-full top-0 z-50 bg-transparent">
        <div className="flex space-x-6 text-white">
          <Link href="/" className="hover:text-blue-400 font-medium">Home</Link>
          <a href="#products" className="hover:text-blue-400 font-medium">Products</a>
          <a href="#contact" className="hover:text-blue-400 font-medium">Contact</a>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={110}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative hover:text-blue-400 transition flex items-center text-white"
        >
          <ShoppingBag size={26} />
          {cart.length > 0 && (
            <span className="ml-1 text-xs text-white bg-blue-600 rounded-full px-2 py-0.5 leading-none">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6">
            We’re Crafting Your New Style
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
            Unique pieces, fresh designs, and the perfect vibe to upgrade your look.
          </motion.p>
          <motion.a href="#products" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
            Explore Products
          </motion.a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 px-6 md:px-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>

        {/* Categories */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm transition ${
                selectedCategory === cat ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-xl overflow-hidden shadow-md group"
            >
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={350}
                  className="w-full h-140 object-cover cursor-pointer"
                />
                <div className="absolute top-3 left-3 bg-black/60 text-white px-3 py-1 rounded-md text-sm font-medium">
                  {product.name} – <span className="font-bold">${product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
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
                        onClick={() => removeFromCart(item)}
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
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-10 mt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/">
            <Image src="/logo-white.png" alt="Logo" width={120} height={50} className="object-contain" />
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/#products" className="hover:text-white">Products</Link>
            <Link href="/#contact" className="hover:text-white">Contact</Link>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Your Brand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
