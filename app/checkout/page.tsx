"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext"; 
import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Totals
  const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;
  const itemCount = cart.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-transparent mt-5">
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:underline">HOME</Link>
          <Link href="/#products" className="hover:underline">PRODUCTS</Link>
          <Link href="/#contact" className="hover:underline">CONTACT</Link>
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
        <button onClick={() => setIsOpen(true)} className="relative flex items-center">
          <FiShoppingBag className="text-2xl" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </nav>

      {/* ✅ Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg p-6 flex flex-col">
            <h2 className="text-lg font-bold mb-4">Your Cart</h2>
            <div className="flex-1 space-y-4 overflow-y-auto">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover w-16 h-16"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.size || ""} {item.color || ""}
                      </p>
                      <p className="text-sm mt-1">
                        {item.quantity} × ${Number(item.price).toFixed(2)}
                      </p>
                      <p className="font-medium">
                        ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Your cart is empty.</p>
              )}
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full bg-black text-white mt-4 py-3 rounded-lg text-center hover:bg-gray-800 transition"
            >
              Go to Checkout
            </Link>
          </div>
        </div>
      )}

      {/* ✅ Checkout Section */}
      <div className="pt-24 px-6 md:px-16 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Left: Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center gap-6 border-b pb-6">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-md object-cover w-28 h-28"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.size || ""} {item.color || ""}
                    </p>
                    <p className="font-bold mt-2">${Number(item.price).toFixed(2)}</p>
                    <p className="text-sm mt-1">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium mt-1">
                      Subtotal: ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>

          {/* Right: Order Summary + Form */}
          <div className="border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items ({itemCount})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Form */}
            <form
              action="https://formsubmit.co/"
              method="POST"
              className="mt-6 space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                required
                className="w-full border rounded-lg px-4 py-2"
              />

              {/* Hidden fields */}
              <input type="hidden" name="cart" value={JSON.stringify(cart)} />
              <input type="hidden" name="_subject" value="New Order" />
              <input type="hidden" name="_captcha" value="false" />

              <button
                type="submit"
                className="w-full bg-black text-white mt-4 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
