import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Luxury Tiffins | Every Meal. Crafted Like Luxury.",
  description: "Freshly prepared, beautifully packed tiffins delivered to your doorstep."
};

type RootLayoutProps = {
  children: any;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}