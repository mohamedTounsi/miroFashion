"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative bg-navy-900 overflow-hidden md:py-9">
      {/* Navy blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-blue-900" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-20">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left md:w-1/2"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Élégance Marine avec{" "}
            <span className="text-blue-300">MiroFashion</span>
          </h1>

          <p className="text-blue-100 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
            Plongez dans l'univers du style marin. Découvrez des collections
            sophistiquées où le bleu marine rencontre l'élégance contemporaine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.button
              onClick={() => router.push("/shop")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-blue-400 transition-all duration-300 border border-blue-400"
            >
              Explorer la Collection
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center md:justify-start gap-8 mt-12"
          ></motion.div>
        </motion.div>

        {/* Right image with nautical elements */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mt-12 md:mt-0 md:w-1/2 relative"
        >
          {/* Decorative nautical elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-blue-400 rounded-full opacity-20"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-blue-300 rounded-full opacity-30"></div>

          <div className="relative">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <Image
                src="/mirologo4.png"
                alt="Collection Marine MiroFashion"
                width={500}
                height={500}
                className="rounded-2xl object-cover shadow-2xl border-4 border-blue-400 border-opacity-30"
              />
            </motion.div>

            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -left-6 bg-blue-500 text-white p-3 rounded-lg shadow-lg z-20"
            ></motion.div>
          </div>
        </motion.div>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12 text-navy-800"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-current"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-current"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-current"
          ></path>
        </svg>
      </div>
    </section>
  );
}
