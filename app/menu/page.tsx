import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
export default async function MenuPage() {
  const products = await db.product.findMany({where:{active:true}, orderBy:{name:"asc"}});
  return <main className="container-x py-16">
    <p className="gold text-xs uppercase tracking-[0.3em]">
      The menu</p>
      <h1 className="mt-3 text-5xl font-bold">
        Choose your meal.</h1>
        <p className="mt-4 max-w-2xl text-white/60">
        Daily tiffins, 
        premium feasts, 
        healthy meals and family combinations.
        </p>
  <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {
    products.map((p: Awaited<ReturnType<typeof db.product.findMany>>[number])=>
    <ProductCard
    product={{...p,price:Number(p.price)}} />)
    }
    </div>
    </main>;
}