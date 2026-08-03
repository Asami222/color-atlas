import { useMemo } from 'react';
import type { DynamicColorProps } from "../type";


export function DynamicColorTriangle({ colorData }: DynamicColorProps) {
  const polygons = useMemo(() => {
    // 1. 有効なデータの抽出
    const validItems = colorData.filter(item => item.ratio > 0);
    const totalRatio = validItems.reduce((sum, item) => sum + item.ratio, 0);

    if (!validItems.length || totalRatio === 0) return [];

    const size = 200; // 200px
    const count = validItems.length;

    // --- 【対策1】 要素が1個だけなら、単純な正方形の座標を返して終了 ---
    if (count === 1) {
      return [{
        color: validItems[0].color,
        points: `0,0 ${size},0 ${size},${size} 0,${size}`
      }];
    }

    // --- 【対策2】 要素数（高さ）に合わせて、斜めの傾き（オフセット）を動的に調整 ---
    // 要素数が多いほど、1つあたりの高さが狭くなるので、傾きを緩やかに（小さく）します。
    const zigzagOffset = Math.max(10, 40 - count * 5); 

    const result = [];
    let currentY = 0;

    // 各アイテムのベースとなる終了Y座標を計算
    const visualBounds = validItems.map((item) => {
      const height = (item.ratio / totalRatio) * size;
      const start = currentY;
      const end = currentY + height;
      currentY = end;
      return { start, end };
    });

    // 2. 座標の計算
    for (let i = 0; i < count; i++) {
      const item = validItems[i];
      const isFirst = i === 0;
      const isLast = i === count - 1;

      // 上辺の座標計算
      let topLeftY = 0;
      let topRightY = 0;
      if (!isFirst) {
        const prevBounds = visualBounds[i - 1];
        // 奇数・偶数インデックスで上下を反転させ、ジグザグを作る
        topLeftY = prevBounds.end + (i % 2 === 0 ? zigzagOffset : -zigzagOffset);
        topRightY = prevBounds.end + (i % 2 === 0 ? -zigzagOffset : zigzagOffset);
      }

      // 下辺の座標計算
      let bottomLeftY = size;
      let bottomRightY = size;
      if (!isLast) {
        const currentBounds = visualBounds[i];
        bottomLeftY = currentBounds.end + ((i + 1) % 2 === 0 ? zigzagOffset : -zigzagOffset);
        bottomRightY = currentBounds.end + ((i + 1) % 2 === 0 ? -zigzagOffset : zigzagOffset);
      }

      // 境界値が 0〜size(200) の範囲を極端に超えないように丸める（クリッピングの代わり）
      const clamp = (val: number) => Math.max(0, Math.min(size, val));

      // 最初の要素の上辺と、最後の要素の下辺以外は、ジグザグがはみ出ないよう安全に処理
      const pTopLeft = isFirst ? 0 : clamp(topLeftY);
      const pTopRight = isFirst ? 0 : clamp(topRightY);
      const pBottomLeft = isLast ? size : clamp(bottomLeftY);
      const pBottomRight = isLast ? size : clamp(bottomRightY);

      const points = `0,${pTopLeft} ${size},${pTopRight} ${size},${pBottomRight} 0,${pBottomLeft}`;

      result.push({
        color: item.color,
        points,
      });
    }

    return result;
  }, [colorData]);

  if (polygons.length === 0) {
    return <div style={{ width: `100%`, aspectRatio: `1/1` }} />;
  }

  return (
    <svg
      viewBox={`0 0 200 200`}
      style={{
        display: 'block',
        overflow: 'hidden',
        width: `100%`,
        aspectRatio: `1/1`,
        //borderRadius: '4px' // 必要に応じて角丸など
      }}
    >
      {polygons.map((poly, index) => (
        <polygon
          key={index}
          points={poly.points}
          fill={poly.color}
          stroke={poly.color}
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}