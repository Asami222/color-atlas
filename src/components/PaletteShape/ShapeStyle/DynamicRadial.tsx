import { useMemo } from 'react';
import type { DynamicColorProps } from "../type";


export function DynamicRadial({ colorData }: DynamicColorProps) {
  
  const { backgroundStyle } = useMemo(() => {
    const validData = colorData.filter(item => item.ratio > 0);
    if (!validData.length) return { backgroundStyle: 'none' };

    // 💡 提示いただいたコードと同じ安全な擬似シャッフルロジック
    const pseudoShuffled = [...validData].sort((a, b) => {
      const hashA = a.color.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + a.ratio;
      const hashB = b.color.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + b.ratio;
      return (hashA % 7) - (hashB % 7) || hashA - hashB;
    });

    const totalRatio = pseudoShuffled.reduce((sum, item) => sum + item.ratio, 0);

    // 💡 各カラーの比率を円の「開始%」と「終了%」のステップに変換する
    let currentPercent = 0;
    const gradientSteps = pseudoShuffled.map((item) => {
      const start = currentPercent;
      // 全体の合計に対する比率（%）を計算
      const end = start + (item.ratio / totalRatio) * 100;
      currentPercent = end;
      
      // 同じ%位置で色を繋ぐことで、グラデーションをぼかさずクッキリした境界線にします
      return `${item.color} ${start.toFixed(2)}%, ${item.color} ${end.toFixed(2)}%`;
    });

    // 中心から広がる円背景のCSSを生成
    return {
      backgroundStyle: `radial-gradient(circle, ${gradientSteps.join(', ')})`
    };
  }, [colorData]);

  if (!colorData.length) return <div style={{ width: `100%`, aspectRatio: `1/1` }} />;

  return (
    <div 
      style={{
        width: `100%`,
        aspectRatio: `1/1`,
        background: backgroundStyle, // 生成した円グラデーションを適用
        borderRadius: '50%', // 💡 外枠も綺麗な正円にする
        overflow: 'hidden'
      }}
    />
  );
}
