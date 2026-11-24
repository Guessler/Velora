import SellerHeader from "@/components/ui/seller/SellerHeader";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SellerHeader />
      <div className="max-w-screen-2xl mx-auto">{children}</div>
    </main>
  );
}
