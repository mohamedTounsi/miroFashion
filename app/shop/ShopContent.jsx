"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Filter, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter, useSearchParams } from "next/navigation";

const produits = [
  {
    id: 1,
    nom: "Espadrille Samba Noir",
    prix: 120,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri1.png",
    note: 4.5,
  },
  {
    id: 2,
    nom: "Espadrille Adidas Noir",
    prix: 180,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri2.png",
    note: 4.8,
  },
  {
    id: 3,
    nom: "Espadrille Adidas Noir",
    prix: 60,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri6.png",
    note: 4.2,
  },
  {
    id: 4,
    nom: "Espadrille Nike Uptempo Noir",
    prix: 90,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri4.png",
    note: 4.6,
  },
  {
    id: 5,
    nom: "Pantalon Cargo Beige",
    prix: 70,
    categorie: "Hommes",
    type: "Pantalon",
    image: "/serwel1.png",
    note: 4.3,
  },
  {
    id: 6,
    nom: "Pantalon Cargo Vert",
    prix: 70,
    categorie: "Hommes",
    type: "Pantalon",
    image: "/serwel2.png",
    note: 4.4,
  },
];

export default function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorieParam = searchParams.get("categorie");

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const buttonHover = { scale: 1.05 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      {/* HEADER */}
      <div className="fixed top-0 right-0 left-0 z-800">
        <Navbar />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="mx-auto pt-32 md:pt-28 flex flex-col md:flex-row px-5 gap-8 pb-10">
        {/* BARRE LATÉRALE */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-md border border-gray-200 p-5 md:sticky md:top-28 self-start transition-all duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-r from-gray-500 to-gray-700 rounded-xl shadow-sm">
              <Filter className="text-white w-5 h-5" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Filtres & Tri
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-5">
            {/* Collection */}
            <div>
              <label className="block font-medium text-gray-700 mb-2 text-sm uppercase tracking-wide">
                Collection
              </label>
              <select
                value={filtreCategorie}
                onChange={(e) => setFiltreCategorie(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-700 text-sm shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              >
                <option value="Tous">Toutes les collections</option>
                <option value="Femmes">Femmes</option>
                <option value="Hommes">Hommes</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block font-medium text-gray-700 mb-2 text-sm uppercase tracking-wide">
                Type
              </label>
              <select
                value={filtreType}
                onChange={(e) => setFiltreType(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-700 text-sm shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              >
                <option value="Tous">Tous les types</option>
                <option value="T-shirt">T-shirt</option>
                <option value="Robe">Robe</option>
                <option value="Pantalon">Pantalon</option>
                <option value="Espadrille">Espadrille</option>
              </select>
            </div>

            {/* Prix */}
            <div>
              <label className="block font-medium text-gray-700 mb-2 text-sm uppercase tracking-wide">
                Trier par prix
              </label>
              <select
                value={triPrix}
                onChange={(e) => setTriPrix(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-700 text-sm shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              >
                <option value="Aucun">Ordre par défaut</option>
                <option value="Croissant">Prix croissant</option>
                <option value="Décroissant">Prix décroissant</option>
              </select>
            </div>
          </div>
        </aside>

        {/* GRILLE DE PRODUITS */}
        <main className="md:w-3/4 lg:w-4/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produitsFiltres.map((produit) => (
              <motion.div
                key={produit.id}
                variants={cardVariants}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group"
              >
                {/* IMAGE CONTAINER - Full visible image without background */}
                <div
                  className="relative w-full md:h-100 overflow-hidden cursor-pointer bg-transparent"
                  onClick={() => router.push(`/shop/${produit.id}`)}
                >
                  <img
                    src={produit.image}
                    alt={produit.nom}
                    className="w-full h-full object-cover transition-transform duration-500 "
                  />
                </div>

                {/* PRODUCT INFO */}
                <div className="p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">
                      {produit.nom}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xl text-zinc-600 font-sm">
                      {produit.prix} TND
                    </p>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => router.push(`/shop/${produit.id}`)}
                      className="flex-1 cursor-pointer hover:text-zinc-800 hover:bg-transparent  py-3 rounded-2xl font-md  transition-all duration-200 border text-white bg-zinc-500 border-zinc-600 "
                    >
                      Acheter
                    </motion.button>
                    <motion.button className="flex items-center justify-center p-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200 shadow-md hover:shadow-lg">
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {produitsFiltres.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">😔</div>
              <p className="text-gray-600 text-lg font-medium">
                Aucun produit trouvé avec ces filtres.
              </p>
              <p className="text-gray-500 mt-2">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
