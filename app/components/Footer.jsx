"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Heart,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-zinc-300 text-gray-700 border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo and description */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <Image
              src="/mirologo3.png"
              alt="MiroFashion Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </motion.div>
          <p className="text-sm max-w-[250px] text-gray-600 leading-relaxed">
            Découvrez les dernières tendances de la mode féminine et masculine.
            Style, élégance et confort — tout ce dont vous rêvez est ici.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Liens Rapides
          </h3>
          <ul className="space-y-3 text-sm">
            {["Accueil", "Boutique", "Nouveautés", "Collections"].map(
              (link) => (
                <li key={link}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#"
                    className="text-gray-600 hover:text-rose-500 transition-colors duration-200"
                  >
                    {link}
                  </motion.a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-gray-600">
                <div className="p-1.5 bg-gray-100 rounded-lg">
                  <MapPin size={14} className="text-blue-500" />
                </div>
                Tunis, Tunisie
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <div className="p-1.5 bg-gray-100 rounded-lg">
                  <Phone size={14} className="text-blue-500" />
                </div>
                +216 51 852 480
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <div className="p-1.5 bg-gray-100 rounded-lg">
                  <Mail size={14} className="text-blue-500" />
                </div>
                contact@mirofashion.com
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Suivez-nous
            </h3>
            <div className="flex gap-3">
              {[
                { icon: Facebook, color: "hover:bg-blue-500" },
                { icon: Instagram, color: "hover:bg-pink-500" },
                { icon: Twitter, color: "hover:bg-blue-400" },
              ].map(({ icon: Icon, color }, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className={`p-2.5 bg-gray-100 rounded-lg text-gray-600 hover:text-white transition-all duration-200 ${color}`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center w-[80%] mx-auto text-sm text-gray-900 mt-12 pt-6 border-t border-gray-90"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
          <div>
            © {new Date().getFullYear()} MiroFashion. Tous droits réservés.
          </div>
          <p>
            Powered by{" "}
            <a
              className="underline"
              href="https://portfoliomt-kohl.vercel.app/"
            >
              MT
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
