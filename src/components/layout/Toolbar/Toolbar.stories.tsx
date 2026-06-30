import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToolbarButton, ToolbarLink } from "./Toolbar";

const meta = {
  title: "Components/Layout/Toolbar",
  component: ToolbarButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: { type: "radio" },
      options: ["close_small", "search"],
    },
    onClick: { action: "onClick" },
  },
} satisfies Meta<typeof ToolbarButton>;

export default meta;

type ButtonStory = StoryObj<typeof ToolbarButton>;
type LinkStory = StoryObj<typeof ToolbarLink>;

export const DefaultButton: ButtonStory = {
  args: {
    icon: "close_small",
    onClick: () => undefined,
  },
  render: (args) => (
    <div style={{ width: "1000px", maxWidth: 480 }}>
      <ToolbarButton {...args} />
    </div>
  ),
};

export const DefaultLink: LinkStory = {
  args: {
    icon: "search",
    href: "/search",
  },
  render: (args) => (
    <div style={{ width: "1000px", maxWidth: 480 }}>
      <ToolbarLink {...args} />
    </div>
  ),
};
