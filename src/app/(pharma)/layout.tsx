import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PharmaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-grow flex-col">{children}</main>
      <Footer />
    </>
  );
}
