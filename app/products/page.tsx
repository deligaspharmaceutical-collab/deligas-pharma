import { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = {
  title: "Products Catalog - Deligas Pharma",
  description: "Explore our premium range of certified laboratory grade injection pharmaceuticals. View complete dosage, volume, formulation, and administration details for our range.",
};

export default function ProductsPage() {
  return (
    <main className="pt-32 bg-background min-h-screen transition-colors duration-300">
      <ProductsClient />
    </main>
  );
}
