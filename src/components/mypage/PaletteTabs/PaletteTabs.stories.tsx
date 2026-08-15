import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PaletteTabs } from "./PaletteTabs";
import type { PaletteUIModel } from "@/utils/transform";

const samplePalettes: PaletteUIModel[] = [
  {
    id: "1",
    place:{
      id: "1",
      name: "Sample Place 1",
    },
    shape: "grid",
    colors: [
      { color: "#F97316", ratio: 40 },
      { color: "#10B981", ratio: 30 },
      { color: "#3B82F6", ratio: 30 },
    ],
    captureDate: "2023-01-05",
    createdAt: "2023-01-01",
    hasTime: false
  },
  {
    id: "2",
    place: {
      id: "2",
      name: "Sample Place 2",
    },  
    shape: "circle",
    colors: [
      { color: "#EF4444", ratio: 25 },
      { color: "#F59E0B", ratio: 25 },
      { color: "#8B5CF6", ratio: 25 },
      { color: "#14B8A6", ratio: 25 },
    ],
    captureDate: "2023-01-06",
    createdAt: "2023-01-01",
    hasTime: false
  },
  {
    id: "3",
    place: {
      id: "3",
      name: "Sample Place 3",
    },
    shape: "chips",
    colors: [
      { color: "#22C55E", ratio: 50 },
      { color: "#6366F1", ratio: 50 },
    ],
    captureDate: "2023-01-07",
    createdAt: "2023-01-01",
    hasTime: false
  },
];

const meta: Meta<typeof PaletteTabs> = {
  title: "Components/MyPage/PaletteTabs",
  component: PaletteTabs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PaletteTabs>;

export const Default: Story = {
  args: {
    palettes: samplePalettes,
  },
  render: (args) => (
    <div style={{ width: "540px", margin: "0 auto" }}>
      <PaletteTabs {...args} />
    </div>
  ),
};
