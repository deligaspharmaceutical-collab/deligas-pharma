import Hero from "@/components/hero/Hero";
import ProductShowcase from "@/components/ProductShowcase";

export default function Home() {
  return (
    <main className="pt-32">
      <section>
        <Hero />
      </section>
      <ProductShowcase />
    </main>
  );
}
