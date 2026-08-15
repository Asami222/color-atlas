import { Logo } from "@/components/ui/Logo";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[94%] mx-auto md:max-w-3xl xl:max-w-240">
      <div className="block md:hidden mt-5 mb-10">
        <Logo />
      </div>

      <main className="w-full my-4 mx-auto px-4 pb-20 md:pt-20 md:pb-10">
        {children}
      </main>
    </div>
  );
}