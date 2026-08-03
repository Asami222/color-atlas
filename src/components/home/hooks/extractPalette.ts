import { Vibrant } from 'node-vibrant/browser';
import type{ PaletteItem } from "@/store/createPalette";

export const extractPalette = async (file: File, count: number, onPaletteChange: (palette: PaletteItem[]) => void) => {
  //console.log("file", file, "count", count);
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
          onPaletteChange(sortedData);
    
        } catch (error) {
          console.error("カラー抽出に失敗しました:", error);
        } finally {
          // 💡 メモリリークを防ぐため、作成した一時的なURLを解放する
          URL.revokeObjectURL(imageUrl);
        }
  
}