import type { DynamicColorProps } from "@/store/createPalette";


export function DynamicColorChip({ colorData }: DynamicColorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 items-center w-40 h-50">
      {colorData.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: item.color,
            width: '100%',
            height: '100%'
          }}
        />
      ))}
    </div>
  )
}