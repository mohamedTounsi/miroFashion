"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, MessageCircle, ZoomIn, X } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const produits = [
  {
    id: 1,
    nom: "Espadrille Samba Noir",
    prix: 120,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri1.jpeg",
    sizes: ["39", "40", "41", "42", "43"],
  },
  {
    id: 2,
    nom: "Espadrille Adidas Noir",
    prix: 180,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri2.jpeg",
    sizes: ["39", "40", "41", "42", "43"],
  },
  {
    id: 3,
    nom: "Espadrille Adidas Noir",
    prix: 60,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri3.jpeg",
    sizes: ["39", "40", "41", "42", "43"],
  },
  {
    id: 4,
    nom: "Espadrille Nike Uptempo Noir",
    prix: 90,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri4.jpeg",
    sizes: ["39", "40", "41", "42", "43"],
  },
  {
    id: 5,
    nom: "Pantalon Cargo Beige",
    prix: 70,
    categorie: "Hommes",
    type: "Pantalon",
    image: "/serwel.jpeg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    nom: "Pantalon Cargo Vert",
    prix: 70,
    categorie: "Hommes",
    type: "Pantalon",
    image: "/serwel1.jpeg",
    sizes: ["S", "M", "L", "XL"],
  },
];

export default function ProductPage() {
  const handleFacebookShare = () => {
    const profileId = "61582440057997"; // your Facebook profile ID
    const message = encodeURIComponent(
      `Bonjour! Je suis intéressé par le produit "${product.nom}". Image: ${window.location.origin}${product.image}`
    );
    const messengerLink = `https://m.me/${profileId}?text=${message}`;
    window.open(messengerLink, "_blank");
  };

  const { id } = useParams();
  const product = produits.find((p) => p.id === parseInt(id));

  const [zoomImage, setZoomImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100">
        <p className="text-gray-600 text-lg">Produit non trouvé.</p>
      </div>
    );
  }

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `👋 Bonjour ! Je suis intéressé par le produit "${product.nom}".`
    );
    window.open(`https://wa.me/YOUR_PHONE_NUMBER?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 text-gray-800 py-15">
      <div className="fixed top-0 right-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Zoom Image Modal */}
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
              className="absolute top-4 right-4 text-white hover:text-sky-300 transition-colors"
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
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:w-1/2 flex flex-col items-center"
        >
          <div className="relative group">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-sky-100 overflow-hidden">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.4 }}
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
            </div>

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
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:w-1/2 flex flex-col gap-6 py-4"
        >
          <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-2">
            {product.type}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {product.nom}
          </h1>

          <p className="text-3xl font-extrabold text-sky-600">
            {product.prix} TND
          </p>

          <div className="space-y-4 mt-4">
            <label className="font-semibold text-gray-700 text-lg">
              Tailles disponibles :
            </label>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="px-5 py-2 bg-white border-2 border-sky-200 text-sky-700 rounded-xl font-medium shadow-sm"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFacebookShare}
              className="flex-1 py-4 rounded-2xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-3"
            >
              <Facebook size={24} />
              Envoyer sur Messenger
            </motion.button>
          </div>
        </motion.div>
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
