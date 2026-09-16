export function Footer() {
  return <footer className="mt-24 border-t border-white/10 bg-[#0d0d0d]">
    <div className="container-x grid gap-10 py-14 md:grid-cols-3">
      <div><h3 className="text-xl font-bold">Luxury <span className="gold">Tiffins</span></h3><p className="mt-3 text-sm text-white/60">Luxury. Freshness. Hygiene. Quality. Convenience. Trust.</p></div>
      <div><h4 className="font-semibold">Explore</h4><div className="mt-3 grid gap-2 text-sm text-white/60"><a href="/menu">Menu</a><a href="/subscriptions">Subscriptions</a><a href="/faq">FAQ</a></div></div>
      <div><h4 className="font-semibold">Legal</h4><div className="mt-3 grid gap-2 text-sm text-white/60"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms & Conditions</a><a href="/refund-policy">Refund Policy</a></div></div>
    </div>
    <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">© {new Date().getFullYear()} Luxury Tiffins. All rights reserved.</div>
  </footer>;
}