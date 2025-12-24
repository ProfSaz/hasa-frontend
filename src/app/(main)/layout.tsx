
import Footer from "@/components/Nav/Footer";
import Header from "@/components/Nav/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Header />
      <main className="min-h-screen pt-16 bg-black/80">{children}</main>
    <Footer />
    </>
  );
}
