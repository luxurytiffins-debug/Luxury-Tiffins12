'use client';

// @ts-expect-error React is provided by the project runtime
import { useEffect, useState } from 'react';

type CartItem = {
  productId: string | number;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedItems = JSON.parse(localStorage.getItem('luxury-cart') ?? '[]') as CartItem[];
      setItems(Array.isArray(storedItems) ? storedItems : []);
    } catch {
      setItems([]);
    }
  }, []);

  const total = items.reduce((sum: number, item: CartItem): number => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);

    return Number.isFinite(price) && Number.isFinite(quantity)
      ? sum + price * quantity
      : sum;
  }, 0);

  function save(next: CartItem[]) {
    setItems(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('luxury-cart', JSON.stringify(next));
    }
  }

  return (
    <main className="container-x py-16">
      <h1 className="text-4xl font-bold">Your Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {items.length ? (
          <>
            <div className="space-y-3">
              {items.map((item: CartItem, index: number) => (
                <div key={item.productId} className="card flex items-center justify-between p-5">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-white/50">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="border rounded px-3"
                      onClick={() => {
                        const nextItems = [...items];
                        nextItems[index].quantity = Math.max(1, nextItems[index].quantity - 1);
                        save(nextItems);
                      }}
                    >
                      −
                    </button>
                    <button
                      className="border rounded px-3"
                      onClick={() => {
                        const nextItems = [...items];
                        nextItems[index].quantity += 1;
                        save(nextItems);
                      }}
                    >
                      +
                    </button>
                    <button
                      className="border rounded px-3"
                      onClick={() => save(items.filter((_: CartItem, itemIndex: number) => itemIndex !== index))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="card h-fit p-6">
              <h2 className="font-semibold">Summary</h2>
              <div className="mt-5 flex justify-between">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="mt-3 flex justify-between text-white/60">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <a href="/checkout" className="gold-bg mt-7 block rounded-full py-3 text-center font-semibold">
                Proceed to checkout
              </a>
            </aside>
          </>
        ) : (
          <div className="py-20 text-center text-white/50">Your cart is empty.</div>
        )}
      </div>
    </main>
  );
}