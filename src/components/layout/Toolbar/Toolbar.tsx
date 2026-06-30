import { IconButton, IconLink } from "@/components/ui/IconWrapper";
import { Tooltip } from "@/components/ui/Tooltip";

export type ToolbarProps = {
  icon: "close_small" | "search"
}

export type ToolbarButtonProps = ToolbarProps & { onClick?: () => void }
export type ToolbarLinkProps = ToolbarProps & { href: string }

export function ToolbarButton({onClick}: ToolbarButtonProps) {
  return (
    <Tooltip content="前の画面へ" side="top">
      <div className="flex w-full max-w-7xl justify-center items-center py-2 bg-background-secondary">
        <IconButton icon="close_small" label="閉じる" variant="sub" onClick={onClick}/>
      </div>
    </Tooltip>
  )
}

export function ToolbarLink({href}: ToolbarLinkProps) {
  return (
    <Tooltip content="カラー検索" side="top">
      <div className="flex w-full max-w-7xl justify-center items-center py-2 bg-background-secondary">
        <IconLink icon="search" label="検索" variant="sub" href={href}/>
      </div>
    </Tooltip>
  )
}