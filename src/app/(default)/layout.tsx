import { Logo } from "@/components/ui/Logo";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[94%] mx-auto max-w-143">
      <div className="block md:hidden mt-5 mb-10">
        <Logo />
      </div>

      <main className="w-full my-4 mx-auto px-4 pb-20 md:pt-20 md:pb-10">
        {children}
      </main>
    </div>
  );
}