"use client";

//import { RandomMessageChip } from "./_components/Chip/RandomMessageChip";
import dynamic from "next/dynamic";
import { useState } from 'react';
import { useAtom } from "jotai";
import { createPaletteAtom, type PaletteItem } from "@/store/createPalette";
import { InputImage } from "@/components/ui/InputImage";
import { ShapeButton, type ShapeType } from "@/components/ui/ShapeButton/ShapeButton";
import { Button } from "@/components/ui/Button";
import { ColorCountSlider } from "./components/ColorCountSlider";
import { extractPalette } from "./hooks/extractPalette";
import { useRouter } from 'next/navigation';
import { shapeMap } from "@/components/PaletteShape/type";

const RandomMessageChip = dynamic(
  () => import("./components/Chip/RandomMessageChip").then(m => m.RandomMessageChip),
  { ssr: false }
);

export function HomeClient() {

  const router = useRouter()
  const [palette, setPalette] = useState<PaletteItem[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeType>("grid");
  const [selectedCount, setSelectedCount] = useState<number>(20); // 2〜10色（初期値5）
  const [currentFile, setCurrentFile] = useState<File | null>(null); // 再抽出用にFileも保持しておくと便利
  const [createPalette, setCreatePalette] = useAtom(createPaletteAtom);
  const ShapeComponent = shapeMap[selectedShape];
  
    // 画像が読み込まれたとき、または色数が変わったときに実行する関数
    // スライダーの値が変更されたときのハンドラー
      const handleSliderChange = (newCount: number) => {
        setSelectedCount(newCount);
        // もしすでに画像が選択されていれば、新しい色数で即座に再抽出する
        if (currentFile) {
          extractPalette(currentFile, newCount, setPalette);
        }
      };

      const handleClick = () => {
        setCreatePalette({
          shape: selectedShape,
          colors: palette,
        });
        router.push("/create");
      }
  
  return (
    <div>
      <div className="flex justify-center items-center">
        <RandomMessageChip />
      </div>
      {/* ページ本体 */}
      <div className="flex flex-col items-center justify-center gap-14 my-4">
        <InputImage 
          hasError={false}
          className="w-full aspect-4/3"
          onChange={async (file) => {
          if (!file) {
            setPalette([]);
            setCurrentFile(null);
            return;
          }
          setCurrentFile(file); // ファイルを保持
          await extractPalette(file, selectedCount, setPalette); // 現在の色数で抽出
        }}
        />
        <ShapeButton selectedShape={selectedShape} onShapeChange={setSelectedShape}/>
         {/* ★ Radix UIベースのSliderを配置 */}
        <ColorCountSlider 
          value={selectedCount} 
          onChange={handleSliderChange}
          min={2}
          max={40} // 2〜40色程度にしておくとUI的にも扱いやすいです
        />
        <div className="flex items-center justify-center mx-auto w-full aspect-4/3 max-w-104 max-h-78 rounded-default border-2 border-dashed border-amber-300 bg-background-secondary p-4">
        {ShapeComponent && (
          <div className="w-50"><ShapeComponent colorData={palette} /></div>
        )}
        </div>
        <div className="flex items-center mx-auto">
          <Button size="Small" onClick={handleClick}>
            決定
          </Button>
          {/** 
          <Button variant="Outline" onClick={() => console.log("Secondary button clicked")}>
            やり直し
          </Button>
          */}
        </div>
      </div>
    </div>
  );
}
