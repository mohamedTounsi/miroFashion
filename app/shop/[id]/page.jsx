"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, ZoomIn, X } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const produits = [
  {
    id: 1,
    nom: "Robe Élégante Rose",
    prix: 120,
    type: "Robe",
    description:
      "Une robe élégante rose parfaite pour vos soirées. Fabriquée en soie naturelle avec des finitions détaillées pour un look sophistiqué et confortable.",
    image: "/robe1.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    nom: "Sneakers Blanches",
    prix: 180,
    type: "Sneakers",
    description:
      "Des sneakers blanches confortables et stylées. Semelle en caoutchouc durable et intérieur en cuir respirant pour un confort optimal toute la journée.",
    image: "/snakers1.png",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
  },
  {
    id: 3,
    nom: "T-shirt Basique",
    prix: 60,
    type: "T-shirt",
    description:
      "Un T-shirt basique en coton doux. Coupe classique qui convient à toutes les morphologies, parfait pour un usage quotidien ou décontracté.",
    image: "/tshirt1.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
];

export default function ProductPage() {
  const { id } = useParams();
  const product = produits.find((p) => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[2] || "M");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
        <p className="text-gray-600 text-lg">Produit non trouvé.</p>
      </div>
    );
  }

  const buttonHover = { scale: 1.05 };
  const tapEffect = { scale: 0.95 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 text-gray-800 py-15">
      <div className="fixed top-0 right-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setZoomImage(false)}
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 right-4 text-white hover:text-rose-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setZoomImage(false);
              }}
            >
              <X size={32} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={product.image}
              alt={product.nom}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto mt-32 px-4 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Product Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 flex flex-col items-center"
        >
          <div className="relative group">
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-rose-100 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                src={product.image}
                alt={product.nom}
                className="w-full h-[500px] object-contain cursor-zoom-in"
                onLoad={() => setImageLoaded(true)}
                onClick={() => setZoomImage(true)}
              />
              {!imageLoaded && (
                <div className="w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="animate-pulse text-gray-400">
                    Chargement...
                  </div>
                </div>
              )}
            </motion.div>

            {/* Zoom Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
              onClick={() => setZoomImage(true)}
            >
              <ZoomIn size={20} className="text-gray-700" />
            </motion.button>
          </div>
        </motion.div>

        {/* Product Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-1/2 flex flex-col gap-6 py-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium mb-2">
                {product.type}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.nom}
              </h1>
            </div>
          </div>

          <p className="text-3xl font-extrabold text-rose-600 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            {product.prix} TND
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="space-y-4">
            <label className="font-semibold text-gray-700 text-lg">
              Taille :
            </label>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={tapEffect}
                  className={`px-6 py-3 rounded-xl font-semibold border-2 transition-all ${
                    selectedSize === size
                      ? "bg-rose-500 text-white border-rose-500 shadow-lg"
                      : "bg-white text-gray-700 border-gray-300 hover:border-rose-300 hover:text-rose-600"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="space-y-4">
            <label className="font-semibold text-gray-700 text-lg">
              Quantité :
            </label>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={buttonHover}
                whileTap={tapEffect}
                className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xl hover:bg-rose-200 transition-colors"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </motion.button>
              <span className="text-xl font-semibold w-8 text-center">
                {quantity}
              </span>
              <motion.button
                whileHover={buttonHover}
                whileTap={tapEffect}
                className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xl hover:bg-rose-200 transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <motion.button
              whileHover={buttonHover}
              whileTap={tapEffect}
              className="flex-1 py-4 rounded-2xl bg-rose-500 text-white font-semibold text-lg hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <ShoppingCart size={24} />
              Ajouter au panier
            </motion.button>
            <motion.button
              whileHover={buttonHover}
              whileTap={tapEffect}
              className="flex-1 py-4 rounded-2xl border-2 border-rose-500 text-rose-500 font-semibold text-lg hover:bg-rose-500 hover:text-white transition-colors shadow-lg hover:shadow-xl"
            >
              Acheter maintenant
            </motion.button>
          </div>
        </motion.div>
      </main>
      <div className="mt-15">
        <Footer />
      </div>
    </div>
  );
}
