import { RandomMessageChip } from "./_components/Chip/RandomMessageChip";

export default function Home() {
  return (
    <main className="relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <RandomMessageChip />
      </div>
      {/* ページ本体 */}
      <p>フォントテスト</p>
    </main>
  );
}
