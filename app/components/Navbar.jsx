"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Acceuil", href: "/" },
    { name: "Femmes", href: "/shop?categorie=Femmes" },
    { name: "Hommes", href: "/shop?categorie=Hommes" },
    { name: "Boutique", href: "/shop" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.0001 }}
      className={` transition-all bg-white duration-300 py-3 ${
        isScrolled ? "bg-white " : "bg-white "
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Image
              src="/mriofashionlogo1.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <a
                  href={link.href}
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    link.highlight
                      ? "text-rose-500 hover:text-rose-600"
                      : "text-gray-700 hover:text-rose-500"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </a>
                {/* Hover underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
              aria-label="Shopping cart"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-200 hover:shadow-xl transition-all">
                <ShoppingBag className="w-5 h-5" />
              </div>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-rose-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-6 py-4 space-y-4 text-black">
              {/* Mobile Nav Links */}
              <div className="space-y-2 text-black">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`block py-3 px-4 rounded-lg text-black font-medium transition-colors hover:bg-gray-50`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name} {/* ← Added text here */}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
