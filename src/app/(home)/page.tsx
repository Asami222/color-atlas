"use client";

//import { RandomMessageChip } from "./_components/Chip/RandomMessageChip";
import dynamic from "next/dynamic";
import { useState } from 'react';
import { useAtom } from "jotai";
import { createPaletteAtom, type PaletteItem } from "@/store/createPalette";
import { InputImage } from "@/components/ui/InputImage";
import { ShapeButton, type ShapeType } from "@/components/ui/ShapeButton/ShapeButton";
import { Button } from "@/components/ui/Button";
import { Vibrant } from 'node-vibrant/browser';
import { ColorCountSlider } from "./_components/ColorCountSlider";
import { useRouter } from 'next/navigation';
import { 
  DynamicColorGrid, 
  DynamicHorizontalStripe, 
  DynamicRadial, 
  DynamicColorTriangle, 
  DynamicColorChip
} from "@/components/ShapeStyle";


const RandomMessageChip = dynamic(
  () => import("./_components/Chip/RandomMessageChip").then(m => m.RandomMessageChip),
  { ssr: false }
);

export default function Home() {

  const router = useRouter()
  const [palette, setPalette] = useState<PaletteItem[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeType>("grid");
  const [selectedCount, setSelectedCount] = useState<number>(20); // 2〜10色（初期値5）
  const [currentFile, setCurrentFile] = useState<File | null>(null); // 再抽出用にFileも保持しておくと便利
  const [createPalette, setCreatePalette] = useAtom(createPaletteAtom);
  
    // 画像が読み込まれたとき、または色数が変わったときに実行する関数
    const extractColors = async (file: File, count: number) => {

      console.log("file", file, "count", count);
      // 💡 一時的な画像URL（blob:http://...）を作成
      const imageUrl = URL.createObjectURL(file);
      try {
        // 1. node-vibrant のビルダーに、File ではなく imageUrl(文字列) を渡す！
        
        const v = Vibrant.from(imageUrl).maxColorCount(count); // ここで2〜10の色数を動的に指定！
  
        // 2. 画像を解析してパレットを取得
        const paletteObj = await v.getPalette();
  
        // 3. 有効なスウォッチ（色の塊）を集め、総ピクセル数を計算
        const swatches = Object.values(paletteObj).filter(swatch => swatch !== null);
        const totalPopulation = swatches.reduce((sum, swatch) => sum + (swatch?.population || 0), 0);
  
        // 4. 指定された形式の配列に変換（割合を計算）
        const extractedData: PaletteItem[] = swatches.map(swatch => ({
          color: swatch?.hex || '#FFFFFF', // "#E2C2BF" のようなHEX値
          ratio: totalPopulation > 0 ? (swatch?.population || 0) / totalPopulation : 0 // 割合（0.00 〜 1.00）
        }));
  
        // 割合が大きい順にソートしてStateに保存
        const sortedData = extractedData.sort((a, b) => b.ratio - a.ratio);
        setPalette(sortedData);
  
      } catch (error) {
        console.error("カラー抽出に失敗しました:", error);
      } finally {
        // 💡 メモリリークを防ぐため、作成した一時的なURLを解放する
        URL.revokeObjectURL(imageUrl);
      }
    };

    // スライダーの値が変更されたときのハンドラー
      const handleSliderChange = (newCount: number) => {
        setSelectedCount(newCount);
        // もしすでに画像が選択されていれば、新しい色数で即座に再抽出する
        if (currentFile) {
          extractColors(currentFile, newCount);
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
          className="w-84 h-63 md:w-104 md:h-78"
          onChange={async (file) => {
          if (!file) {
            setPalette([]);
            setCurrentFile(null);
            return;
          }
          setCurrentFile(file); // ファイルを保持
          await extractColors(file, selectedCount); // 現在の色数で抽出
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
        <div className="flex items-center justify-center mx-auto w-84 h-63 md:w-104 md:h-78 rounded-default border-2 border-dashed border-disabled bg-background-secondary">
        { selectedShape === "column" && <DynamicHorizontalStripe colorData={palette}/> }
        { selectedShape === "grid" && <DynamicColorGrid colorData={palette} /> }
        { selectedShape === "chips" && <DynamicColorChip colorData={palette} /> }
        { selectedShape === "circle" && < DynamicRadial colorData={palette} /> }
        { selectedShape === "triangle" && <DynamicColorTriangle colorData={palette}/> }
        </div>
        <div className="flex items-center space-around">
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
