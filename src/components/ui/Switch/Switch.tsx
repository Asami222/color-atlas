import * as Switch from "@radix-ui/react-switch";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (open: boolean) => void;
}

export function SwitchButton({checked, onCheckedChange}: SwitchProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch.Root
        className="w-10.5 h-6.25 bg-neutral-600 rounded-full relative shadow-inner data-[state=checked]:bg-primary outline-none cursor-pointer"
        id="airplane-mode"
        checked={checked}
        onCheckedChange={onCheckedChange} 
      >
        <Switch.Thumb className="block w-5.25 h-5.25 bg-white rounded-full shadow-md transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
    </div>
  )
};
