import type { DynamicColorProps } from "../type";

export function DynamicColorChip({ colorData }: DynamicColorProps) {
  return (
    <div 
      className="grid grid-cols-3 gap-[3%] items-center"
      style={{
        width: `100%`,
        aspectRatio: `160/200`,
      }}
    >
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