export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-wide">
          LUXURY <span className="gold">TIFFINS</span>
        </a>
        <nav className="hidden gap-6 md:flex text-sm text-white/80">
          <a href="/">Home</a>
          <a href="/menu">Menu</a>
          <a href="/subscriptions">Subscriptions</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <a className="rounded-full border border-white/15 px-4 py-2" href="/account">
            Account
          </a>
          <a className="gold-bg rounded-full px-4 py-2 font-semibold" href="/cart">
            Cart
          </a>
        </div>
      </div>
    </header>
  );
}