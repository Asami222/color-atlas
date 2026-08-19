import * as SliderPrimitive from "@radix-ui/react-slider";
import { Icon } from "@/components/ui/Icon";
import { Tooltip } from "@/components/ui/Tooltip";

type ColorCountSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function ColorCountSlider({
  value,
  onChange,
  min = 2,
  max = 64, // 上限をとりあえず64に設定（必要に応じて30などに下げてもOK）
  step = 1,
}: ColorCountSliderProps) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <div className="flex justify-between text-sm text-neutral-600 font-medium">
        <Tooltip content="抽出できる色の最大数です。色数が多いほど、より細かい色の違いを抽出できます。" side="bottom">
        <div className="inline-flex justify-center items-center gap-1">
        <span>抽出する最大色数</span>
        
          <Icon name="help" size="sm" color="help" className="cursor-pointer"/>
        
        </div>
        </Tooltip>
        <span className="font-bold text-neutral-900">{value} 色</span>
      </div>
      
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
        value={[value]} // 配列として渡す
        onValueChange={(values) => onChange(values[0])} // 0番目の値を取り出す
        min={min}
        max={max}
        step={step}
      >
        {/* スライダーの線（背景） */}
        <SliderPrimitive.Track className="bg-neutral-600 relative grow rounded-full h-1.5">
          {/* 選択されている部分のハイライト線 */}
          <SliderPrimitive.Range className="absolute bg-primary rounded-full h-full" />
        </SliderPrimitive.Track>
        
        {/* つまみ（丸） */}
        <SliderPrimitive.Thumb 
          className="block w-6 h-6 bg-primary rounded-full hover:scale-110" 
          aria-label="最大色数"
        />
      </SliderPrimitive.Root>
    </div>
  );
}