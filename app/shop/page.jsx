import { Suspense } from "react";
import ShopContent from "./ShopContent";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Chargement de la boutique...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
