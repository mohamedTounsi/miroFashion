"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  MessageCircle,
  ZoomIn,
  X,
  Star,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const produits = [
  {
    id: 1,
    nom: "Espadrille Samba Noir",
    prix: 120,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri1.png",
    sizes: ["39", "40", "41", "42", "43"],
    description:
      "Espadrille classique en cuir véritable avec semelle en caoutchouc naturelle. Confort optimal et style intemporel.",
    features: [
      "Cuir véritable",
      "Semelle en caoutchouc",
      "Confortable",
      "Style classique",
    ],
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    nom: "Espadrille Adidas Noir",
    prix: 180,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri2.png",
    sizes: ["39", "40", "41", "42", "43"],
    description:
      "Espadrille sportive Adidas avec technologie de support moderne. Parfaite pour un usage quotidien.",
    features: [
      "Technologie Adidas",
      "Support moderne",
      "Respirant",
      "Style sportif",
    ],
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    nom: "Espadrille Adidas Noir",
    prix: 60,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri6.png",
    sizes: ["39", "40", "41", "42", "43"],
    description:
      "Espadrille légère et confortable, idéale pour la saison estivale. Design épuré et moderne.",
    features: ["Léger", "Confortable", "Style moderne", "Idéal été"],
    rating: 4.2,
    reviews: 156,
  },
  {
    id: 4,
    nom: "Espadrille Nike Uptempo Noir",
    prix: 90,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri4.png",
    sizes: ["39", "40", "41", "42", "43"],
    description:
      "Espadrille Nike avec design rétro et amorti amélioré. Allie parfaitement style et performance.",
    features: ["Design rétro", "Amorti amélioré", "Style Nike", "Performance"],
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 5,
    nom: "Pantalon Cargo Beige",
    prix: 70,
    categorie: "Hommes",
    type: "Pantalon",
    image: "/serwel1.png",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Pantalon cargo beige en coton résistant. Multiples poches pratiques pour un style utilitaire chic.",
    features: [
      "Coton résistant",
      "Multiples poches",
      "Style utilitaire",
      "Confortable",
    ],
    rating: 4.3,
    reviews: 94,
  },
  {
    id: 6,
    nom: "Pantalon Cargo Vert",
    prix: 70,
    categorie: "Hommes",
    type: "Pantalon",
    image: "/serwel2.png",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Pantalon cargo vert militaire avec coupe moderne. Parfait pour un look casual élégant.",
    features: ["Style militaire", "Coupe moderne", "Durable", "Polyvalent"],
    rating: 4.4,
    reviews: 112,
  },
];

export default function ProductPage() {
  const { id } = useParams();
  const product = produits.find((p) => p.id === parseInt(id));

  const [zoomImage, setZoomImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const handleFacebookShare = async () => {
    const profileId = "61582440057997";
    const message = `👟 Bonjour! Je suis intéressé par le produit "${product.nom}" - ${product.prix} TND. Image: ${window.location.origin}${product.image}`;
    const encodedMessage = encodeURIComponent(message);
    const messengerLink = `https://m.me/${profileId}?text=${encodedMessage}`;

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // iOS blocks ?text= parameter → copy message first
      try {
        await navigator.clipboard.writeText(message);
        alert(
          "💬 Message copié ! Ouvrez Messenger et collez-le dans la conversation."
        );
      } catch {
        alert(
          "Impossible de copier le message. Copiez-le manuellement après ouverture."
        );
      }
      window.open(`https://m.me/${profileId}`, "_blank");
    } else {
      // Android & Desktop can use the ?text parameter
      window.open(messengerLink, "_blank");
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `👋 Bonjour ! Je suis intéressé par le produit "${product.nom}" - ${product.prix} TND. Pouvez-vous me donner plus d'informations ?`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <p className="text-gray-600 text-lg">Produit non trouvé.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-200 via-gray-100 to-zinc-500 text-gray-900 pt-15">
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
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setZoomImage(false)}
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
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
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto mt-32 px-4 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-16 pb-16">
        {/* Product Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 flex flex-col items-center"
        >
          <div className="relative group w-full max-w-2xl">
            <div className="bg-gray-50 rounded-3xl p-4 lg:p-8 overflow-hidden border border-gray-200">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  src={product.image}
                  alt={product.nom}
                  className="w-full h-auto max-h-[600px] object-contain cursor-zoom-in rounded-2xl shadow-lg"
                  onLoad={() => setImageLoaded(true)}
                  onClick={() => setZoomImage(true)}
                />
                {!imageLoaded && (
                  <div className="w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-2xl">
                    <div className="animate-pulse text-gray-400">
                      Chargement de l'image...
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Zoom Button */}
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,1)",
              }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300"
              onClick={() => setZoomImage(true)}
            >
              <ZoomIn size={24} className="text-gray-700" />
            </motion.button>
          </div>
        </motion.div>

        {/* Product Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/2 flex flex-col gap-8 py-4"
        >
          {/* Category & Rating */}
          <div className="flex flex-col gap-4">
            <span className="inline-block px-4 py-2 bg-gray-800 text-white rounded-2xl text-sm font-semibold w-fit">
              {product.type}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            {product.nom}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4">
            <p className="text-4xl font-extrabold text-gray-900">
              {product.prix} TND
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="space-y-4 mt-4">
            <label className="font-semibold text-gray-800 text-xl">
              Tailles disponibles :
            </label>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 rounded-2xl font-semibold text-lg border-2 transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-gray-900 text-white border-gray-900 shadow-md"
                      : "bg-white border-gray-300 text-gray-700 hover:border-gray-500 hover:shadow-md"
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
              <Truck className="w-6 h-6 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">
                Livraison rapide
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
              <Shield className="w-6 h-6 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">
                Paiement sécurisé
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
              <RotateCcw className="w-6 h-6 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">
                Retour facile
              </span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFacebookShare}
              className="flex-1 py-4 rounded-2xl bg-gray-800 hover:bg-gray-900 text-white font-semibold text-lg hover:shadow-lg transition-all duration-300 shadow-md flex items-center justify-center gap-3"
            >
              <Facebook size={24} />
              Commander sur Messenger
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
