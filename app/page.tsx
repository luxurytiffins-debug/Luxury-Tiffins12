import { ProductCard } from "@/components/ProductCard";
import { db } from "@/lib/db";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  category: string;
};

export default async function Home() {
  const products: Product[] = await db.product.findMany({ where:{ active:true }, take:4, orderBy:{ createdAt:"desc" }});
  return <main>
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="container-x grid min-h-[650px] items-center gap-12 py-20 lg:grid-cols-2">
        <div><p className="gold text-sm font-semibold uppercase tracking-[0.35em]">Premium Indian Tiffin</p>
          <h1 className="mt-5 text-5xl font-bold leading-tight sm:text-7xl">Every Meal.<br/>
          <span className="gold">Crafted Like Luxury.</span></h1>
          <p className="mt-6 max-w-xl text-lg text-white/60">Freshly prepared, beautifully packed, and delivered to your doorstep.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="/menu" className="gold-bg rounded-full px-7 py-3 font-semibold">
          Order Now</a>
          <a href="/menu" className="rounded-full border border-white/20 px-7 py-3">
          Explore Menu</a></div>
        </div>
        <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-gradient-to-br from-[#242424] to-[#0e0e0e] p-10 text-center text-8xl shadow-2xl">🍱</div>
      </div>
    </section>
    <section className="container-x py-20"><div className="flex items-end justify-between">
      <div><p className="gold text-xs uppercase tracking-[0.3em]">
        Curated for you</p>
        <h2 className="mt-2 text-3xl font-bold">
          Featured Tiffins</h2>
          </div>
          <a className="text-sm text-white/60" href="/menu">
          View all →</a>
          </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p: Product)=>
        <ProductCard product={{...p,price:Number(p.price)}} />)}
        </div>
    </section>
    <section className="border-y border-white/10 bg-[#0d0d0d]">
    <div className="container-x grid gap-8 py-20 md:grid-cols-3">
      {[["01","Fresh Ingredients"],
    ["02","Hygienic Preparation"],
    ["03","Reliable Delivery"]]
    .map(x=><div key={x[0]}>
      <div className="gold text-sm">{x[0]}
      </div>
    <h3> className="mt-3 text-xl font-semibold"{x[1]}</h3>
    <p className="mt-2 text-sm text-white/50">
    Thoughtfully prepared with a premium everyday experience in mind.
    </p>
    </div>)}
    </div>
    </section>
  </main>;
}