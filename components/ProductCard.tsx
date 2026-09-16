'use client';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export function ProductCard({ product }: { product: Product }) {
  function add(event: { currentTarget: HTMLButtonElement }) {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem('luxury-cart');
    const current: CartItem[] = stored ? JSON.parse(stored) : [];
    const index = current.findIndex((item) => item.productId === product.id);

    if (index >= 0) {
      current[index].quantity += 1;
    } else {
      current.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    window.localStorage.setItem('luxury-cart', JSON.stringify(current));
    const button = event.currentTarget;
    button.textContent = 'Added ✓';
    window.setTimeout(() => {
      button.textContent = 'Add to cart';
    }, 1200);
  }

  return (
    <article className="card overflow-hidden transition hover:-translate-y-1 hover:border-[#D4AF37]/40">
      <div className="aspect-[4/3] bg-gradient-to-br from-[#272727] to-[#101010] flex items-center justify-center text-5xl">
        🍱
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-widest gold">{product.category}</div>
        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm text-white/60">{product.description}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="gold font-bold">₹{product.price}</span>
          <button
            onClick={add}
            className="rounded-full border border-[#D4AF37]/50 px-4 py-2 text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}