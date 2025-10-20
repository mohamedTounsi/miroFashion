"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative bg-pink-50 overflow-hidden md:py-9">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-pink-50 opacity-80" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-20">
        {/* Texte à gauche */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-pink-700 leading-tight mb-4">
            Découvrez votre style avec{" "}
            <span className="text-pink-500">MiroFashion</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-lg mb-8">
            Explorez les dernières tendances en mode, chaussures et accessoires.{" "}
            <br />
            Exprimez votre personnalité avec des pièces uniques qui vous
            ressemblent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.a
              onClick={() => router.push("/shop")}
              whileHover={{ scale: 1.05 }}
              href="#boutique"
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-pink-600 transition"
            >
              Acheter maintenant
            </motion.a>

            <motion.a
              onClick={() => router.push("/shop")}
              whileHover={{ scale: 1.05 }}
              href="#collection"
              className="border border-pink-400 text-pink-600 px-8 py-3 rounded-full font-medium hover:bg-pink-100 transition"
            >
              Découvrir la collection
            </motion.a>
          </div>
        </motion.div>

        {/* Image à droite */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mt-12 md:mt-0"
        >
          <Image
            src="/fashionhero.jpg" // ton image uploadée
            alt="Mode et style MiroFashion"
            width={500}
            height={500}
            className="rounded-3xl shadow-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
