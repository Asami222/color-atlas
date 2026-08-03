import { useMemo } from 'react';
import type { DynamicColorProps } from "../type";


export function DynamicHorizontalStripe({ colorData }: DynamicColorProps) {
  
  // 💡 [修正ポイント]: Math.random() を使わず、色のカラーコードや文字列の特性を利用して
  // 「予測不可能だけど、同じデータなら必ず同じ位置になる（純粋関数としてのルールを守る）」疑似シャッフルを行います。
  const { shuffledData, gridTemplateRows } = useMemo(() => {
    const validData = colorData.filter(item => item.ratio > 0);
    if (!validData.length) return { shuffledData: [], gridTemplateRows: '1fr' };

    // 💡 各アイテムのカラーコード（例: #E8C5C1）の文字列自体をハッシュ値のように扱い、
    // ランダムっぽく並び替えます。これにより、Math.random() を排除しつつ配置をバラバラにできます。
    const pseudoShuffled = [...validData].sort((a, b) => {
      const hashA = a.color.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + a.ratio;
      const hashB = b.color.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + b.ratio;
      // 奇数・偶数などの組み合わせで擬似的に順序を散らす
      return (hashA % 7) - (hashB % 7) || hashA - hashB;
    });

    // 比率文字列の生成
    const rowsStr = pseudoShuffled.map(item => `${item.ratio}fr`).join(' ');

    return {
      shuffledData: pseudoShuffled,
      gridTemplateRows: rowsStr
    };
  // colorDataが更新された時のみ動きます
  }, [colorData]);

  if (!shuffledData.length) return <div style={{ width: `100%`, aspectRatio: `200/160` }} />;

  return (
    <div 
      style={{
        display: 'grid',
        width: `100%`,
        aspectRatio: `200/160`,
        gridTemplateColumns: '1fr', // 横幅はいっぱい
        gridTemplateRows: gridTemplateRows, // 計算した安全なランダム比率を適用
        overflow: 'hidden'
      }}
    >
      {shuffledData.map((item, index) => (
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
  );
}
