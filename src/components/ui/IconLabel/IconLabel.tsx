import { Icon } from "../Icon/Icon";

export type IconLabelProps = {
  label: string;
  iconName: "palette" | "calendar_clock" | "landscape_2" | "edit_note";
  helperText?: string;
  htmlFor?: string
}

export function IconLabel({ label, iconName, helperText, htmlFor }: IconLabelProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <Icon name={iconName}/>
        <label htmlFor={htmlFor} className="font-medium text-xl">{label}</label>
      </div>
      {helperText && <p className="text-xs">{helperText}</p>}
    </div>
  )
}