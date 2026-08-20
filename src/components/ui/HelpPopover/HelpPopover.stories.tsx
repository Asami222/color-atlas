import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button/Button";
import { HelpPopover } from "./HelpPopover";

const meta: Meta<typeof HelpPopover> = {
  title: "Components/UI/HelpPopover",
  component: HelpPopover,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof HelpPopover>;

export const Default: Story = {
  args: {
    content: "This is additional information about the current setting.",
    children: <Button size="Small">Show help</Button>,
  },
  render: (args) => (
    <div className="flex min-h-32 items-start justify-center p-6">
      <HelpPopover {...args} />
    </div>
  ),
};