import ProductShowcase from "@/components/ProductShowcase";
import ProductsClient from "@/components/ProductsClient";

export default function Home() {
  return (
    <main className="bg-background transition-colors duration-300">
      <ProductShowcase />
      <div className="pt-16">
        <ProductsClient />
      </div>
    </main>
  );
}
