import { Footer } from "./components/Footer";
import Header from "./components/Header";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-500 ">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
