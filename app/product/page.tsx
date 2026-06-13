import { Metadata } from "next";
import ProductShowcase from "@/components/ProductShowcase";

export const metadata: Metadata = {
  title: "Products - Deligas Pharma",
  description: "Explore our premium, lab-tested pharmaceutical grade products.",
};

export default function ProductPage() {
  return (
    <main className="bg-background transition-colors duration-300">
      <ProductShowcase />
    </main>
  );
}
