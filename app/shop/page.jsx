"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const produits = [
  {
    id: 1,
    nom: "Robe Élégante Rose",
    prix: 120,
    categorie: "Femmes",
    type: "Robe",
    image: "/robe1.png",
  },
  {
    id: 2,
    nom: "Sneakers Blanches",
    prix: 180,
    categorie: "Hommes",
    type: "Sneakers",
    image: "/snakers1.png",
  },
  {
    id: 3,
    nom: "T-shirt Basique",
    prix: 60,
    categorie: "Hommes",
    type: "T-shirt",
    image: "/tshirt1.png",
  },
  {
    id: 4,
    nom: "Robe d'Été",
    prix: 90,
    categorie: "Femmes",
    type: "Robe",
    image: "/dress2.png",
  },
  {
    id: 5,
    nom: "T-shirt Oversize",
    prix: 70,
    categorie: "Femmes",
    type: "T-shirt",
    image: "/tshirtoversized.png",
  },
];

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorieParam = searchParams.get("categorie"); // "Femmes" or "Hommes" or null

  const [filtreCategorie, setFiltreCategorie] = useState(
    categorieParam || "Tous"
  );

  const [filtreType, setFiltreType] = useState("Tous");
  const [triPrix, setTriPrix] = useState("Aucun");

  const produitsFiltres = produits
    .filter((p) =>
      filtreCategorie === "Tous" ? true : p.categorie === filtreCategorie
    )
    .filter((p) => (filtreType === "Tous" ? true : p.type === filtreType))
    .sort((a, b) => {
      if (triPrix === "Croissant") return a.prix - b.prix;
      if (triPrix === "Décroissant") return b.prix - a.prix;
      return 0;
    });

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const buttonHover = { scale: 1.05 };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800">
      {/* --- HEADER --- */}
      <div className="fixed top-0 right-0 left-0 z-50">
        <Navbar />
      </div>

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="mx-auto mt-30 md:mt-16 flex flex-col md:flex-row px-5 gap-8 pb-10">
        {/* --- BARRE LATÉRALE / FILTRES --- */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 md:sticky md:top-30 self-start">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Filter className="text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">
              Filtres & Tri
            </h2>
          </div>

          {/* Mobile: horizontal flex, wrap filters */}
          <div className="flex flex-wrap gap-5 md:gap-0 md:flex-col md:space-y-6 text-sm">
            {/* Catégories */}
            <div className="flex-1 min-w-[120px]">
              <label className="block font-semibold text-gray-700 mb-1 md:mb-2">
                Collection :
              </label>
              <select
                value={filtreCategorie}
                onChange={(e) => setFiltreCategorie(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-2 py-1 md:px-4 md:py-2 focus:ring-2 focus:ring-gray-400 outline-none text-sm"
              >
                <option value="Tous">Tous</option>
                <option value="Femmes">Femmes</option>
                <option value="Hommes">Hommes</option>
              </select>
            </div>

            {/* Types */}
            <div className="flex-1 min-w-[120px]">
              <label className="block font-semibold text-gray-700 mb-1 md:mb-2">
                Type :
              </label>
              <select
                value={filtreType}
                onChange={(e) => setFiltreType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-2 py-1 md:px-4 md:py-2 focus:ring-2 focus:ring-gray-400 outline-none text-sm"
              >
                <option value="Tous">Tous</option>
                <option value="T-shirt">T-shirts</option>
                <option value="Robe">Robes</option>
                <option value="Sneakers">Sneakers</option>
              </select>
            </div>

            {/* Tri par prix */}
            <div className="flex-1 min-w-[120px]">
              <label className="block font-semibold text-gray-700 mb-1 md:mb-2">
                Trier par prix :
              </label>
              <select
                value={triPrix}
                onChange={(e) => setTriPrix(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-2 py-1 md:px-4 md:py-2 focus:ring-2 focus:ring-gray-400 outline-none text-sm"
              >
                <option value="Aucun">Aucun</option>
                <option value="Croissant">Prix croissant</option>
                <option value="Décroissant">Prix décroissant</option>
              </select>
            </div>
          </div>
        </aside>

        {/* --- GRILLE DE PRODUITS --- */}
        <main className="md:w-3/4 lg:w-4/5">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Nos Produits
          </h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {produitsFiltres.map((produit) => (
              <motion.div
                key={produit.id}
                className="bg-white cursor-pointer rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all flex flex-col"
                variants={cardVariants}
              >
                <div className="h-72 w-full relative">
                  <img
                    onClick={() =>
                      router.push(`/shop/${produit.id}`, { product: produit })
                    }
                    src={produit.image}
                    alt={produit.nom}
                    className="w-full h-full object-contain bg-gray-50 p-4"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {produit.nom}
                  </h3>
                  <p className="text-gray-900 font-bold mb-4">
                    {produit.prix} TND
                  </p>
                  <div className="mt-auto flex gap-2">
                    <motion.button
                      whileHover={buttonHover}
                      onClick={() =>
                        router.push(`/shop/${produit.id}`, { product: produit })
                      }
                      className="flex-1 cursor-pointer border border-black text-black py-2 rounded-xl hover:bg-pink-400 hover:text-white hover:border-pink-300 transition-all duration-200 ease-in-out"
                    >
                      Acheter
                    </motion.button>
                    <motion.button
                      whileHover={buttonHover}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-2 rounded-xl hover:bg-gray-300 transition"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {produitsFiltres.length === 0 && (
            <p className="text-center text-gray-600 mt-10">
              Aucun produit trouvé avec ces filtres.
            </p>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
