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
    nom: "Espadrille Samba Noir",
    prix: 120,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri1.jpeg",
  },
  {
    id: 2,
    nom: "Espadrille Adidas Noir",
    prix: 180,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri2.jpeg",
  },
  {
    id: 3,
    nom: "Espadrille Adidas Noir",
    prix: 60,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri3.jpeg",
  },
  {
    id: 4,
    nom: "Espadrille Nike Uptempo Noir",
    prix: 90,
    categorie: "Hommes",
    type: "Espadrille",
    image: "/spadri4.jpeg",
  },
  {
    id: 5,
    nom: "Pantalon Cargo Beige",
    prix: 70,
    categorie: "Hommes",
    type: "Pantalon",
    image: "/serwel.jpeg",
  },
  {
    id: 6,
    nom: "Pantalon Cargo Vert",
    prix: 70,
    categorie: "Hommes",
    type: "Pantalon",
    image: "/serwel1.jpeg",
  },
];

export default function ShopPage() {
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

  const containerVariants = {
    hidden: {},
    show: {},
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const buttonHover = { scale: 1.05 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-zinc-100 to-blue-200 text-gray-800">
      {/* --- HEADER --- */}
      <div className="fixed top-0 right-0 left-0 z-50">
        <Navbar />
      </div>

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="mx-auto pt-32 md:pt-28 flex flex-col md:flex-row px-5 gap-8 pb-10">
        {/* --- BARRE LATÉRALE --- */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 md:sticky md:top-28 self-start">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Filter className="text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">
              Filtres & Tri
            </h2>
          </div>

          <div className="flex flex-wrap gap-5 md:gap-0 md:flex-col md:space-y-6 text-sm">
            {/* Catégories */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Collection :
              </label>
              <select
                value={filtreCategorie}
                onChange={(e) => setFiltreCategorie(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none text-sm"
              >
                <option value="Tous">Tous</option>
                <option value="Femmes">Femmes</option>
                <option value="Hommes">Hommes</option>
              </select>
            </div>

            {/* Types */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Type :
              </label>
              <select
                value={filtreType}
                onChange={(e) => setFiltreType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none text-sm"
              >
                <option value="Tous">Tous</option>
                <option value="T-shirt">T-shirt</option>
                <option value="Robe">Robe</option>
                <option value="Pantalon">Pantalon</option>
                <option value="Espadrille">Espadrille</option>
              </select>
            </div>

            {/* Tri par prix */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Trier par prix :
              </label>
              <select
                value={triPrix}
                onChange={(e) => setTriPrix(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none text-sm"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produitsFiltres.map((produit) => (
              <motion.div
                key={produit.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className="relative w-full h-64 overflow-hidden group"
                  onClick={() => router.push(`/shop/${produit.id}`)}
                >
                  <img
                    src={produit.image}
                    alt={produit.nom}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110 bg-gray-50"
                  />
                </div>

                <div className="p-4 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {produit.nom}
                  </h3>
                  <p className="text-blue-600 font-bold text-base mb-4">
                    {produit.prix} TND
                  </p>

                  <div className="mt-auto flex gap-2">
                    <motion.button
                      whileHover={buttonHover}
                      onClick={() => router.push(`/shop/${produit.id}`)}
                      className="flex-1 border border-blue-500 text-blue-500 py-2 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-200"
                    >
                      Acheter
                    </motion.button>
                    <motion.button
                      whileHover={buttonHover}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-xl hover:bg-gray-200 transition"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
