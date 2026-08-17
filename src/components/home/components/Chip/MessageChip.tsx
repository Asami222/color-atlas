import { Icon } from "@/components/ui/Icon";
import type { IconName } from "../../constants/messages";

type Props = {
  message: string;
  icon: IconName;
};

export function MessageChip({ message, icon }: Props) {
  return (
    <div
      className="
        flex items-center gap-2
        rounded-default
        bg-background-default
        px-3 py-2
        shadow-md
      "
    >
      <Icon name={icon} />

      <p className="text-xs">
        {message}
      </p>
    </div>
  );
}