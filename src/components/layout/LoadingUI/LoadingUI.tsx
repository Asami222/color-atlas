import { Spinner } from "@/components/ui/Spinner";
import { Logo } from "@/components/ui/Logo";

export function LoadingUI() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="my-16 flex justify-center md:hidden">
        <Logo />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Spinner
          size={64}
          color="var(--color-border-disabled)"
        />
      </div>
    </div>
  );
}