import { useMemo } from 'react';
import type { DynamicColorProps } from "@/store/createPalette";

// 内部計算用の型定義
interface RenderBlock {
  color: string;
  width: string;
  height: string;
  top: string;
  left: string;
}

export function DynamicColorGrid({ colorData }: DynamicColorProps) {

  const blocks = useMemo(() => {
    // 1. 比率が0より大きい有効なデータだけを抽出
    const validItems = colorData.filter(item => item.ratio > 0);
    const totalRatio = validItems.reduce((sum, item) => sum + item.ratio, 0);

    if (!validItems.length || totalRatio === 0) return [];

    const resultBlocks: RenderBlock[] = [];

    // 初期状態：全体の範囲（0% 〜 100%）
    let x = 0;
    let y = 0;
    let w = 100;
    let h = 100;

    // 2. 配列をループしながら、縦・横に交互にナイフで切り分けていく
    validItems.forEach((item, index) => {
      const isLast = index === validItems.length - 1;
      
      // 今回の要素が全体の残りのうち、どれだけの割合を占めるか
      const currentItemsTotal = validItems.slice(index).reduce((sum, i) => sum + i.ratio, 0);
      const percentage = item.ratio / currentItemsTotal;

      if (isLast) {
        // 最後の要素は、残ったスペースをすべて埋める
        resultBlocks.push({
          color: item.color,
          width: `${w}%`,
          height: `${h}%`,
          left: `${x}%`,
          top: `${y}%`,
        });
      } else {
        // インデックスの偶数・奇数で「縦切り」と「横切り」を交互に行う（これで田の字型・タイル型になる）
        const splitHorizontally = index % 2 === 0;

        if (splitHorizontally) {
          // 横に切る（上下に分割）
          const currentH = h * percentage;
          resultBlocks.push({
            color: item.color,
            width: `${w}%`,
            height: `${currentH}%`,
            left: `${x}%`,
            top: `${y}%`,
          });
          y += currentH; // 次の要素の開始位置を下へずらす
          h -= currentH; // 残りの高さを減らす
        } else {
          // 縦に切る（左右に分割）
          const currentW = w * percentage;
          resultBlocks.push({
            color: item.color,
            width: `${currentW}%`,
            height: `${h}%`,
            left: `${x}%`,
            top: `${y}%`,
          });
          x += currentW; // 次の要素の開始位置を右へずらす
          w -= currentW; // 残りの幅を減らす
        }
      }
    });

    return resultBlocks;
  }, [colorData]);

  if (blocks.length === 0) return <div style={{ width: '200px', height: '200px' }} />;

  return (
    <div 
      style={{
        position: 'relative', // 子要素を絶対配置(absolute)するため
        width: '200px',
        height: '200px',
        overflow: 'hidden',
      }}
    >
      {blocks.map((block, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            backgroundColor: block.color,
            width: block.width,
            height: block.height,
            left: block.left,
            top: block.top,
            transition: 'all 0.2s ease', // データの切り替え時にふわっと動かしたい場合
          }}
        />
      ))}
    </div>
  );
}
