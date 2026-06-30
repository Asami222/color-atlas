import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MessageChip } from "./MessageChip";

const meta: Meta<typeof MessageChip> = {
  title: "Components/Chip/MessageChip",
  component: MessageChip,
  tags: ["autodocs"],
  argTypes: {
    icon: { control: "text"},
    message: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof MessageChip>;

export const Default: Story = {
  args: {
    icon: "robot",
    message: "This is a sample message for MessageChip.",
  },
  render: (args) => (
    <div style={{ width: "232px", margin: "0 auto" }}>
      <MessageChip {...args} />
    </div>
  ),
};

export const Pattern1: Story = {
  args: {
    icon: "robot_2",
    message: "This is a sample message for MessageChip.This is a sample message for MessageChip.",
  },
  render: (args) => (
    <div style={{ width: "232px", margin: "0 auto" }}>
      <MessageChip {...args} />
    </div>
  ),
};

export const Pattern2: Story = {
  args: {
    icon: "smart_toy",
    message: `This is a sample message for MessageChip.
    This is a sample message for MessageChip.This is a sample message for MessageChip.
    This is a sample message for MessageChip.
    This is a sample message for MessageChip.This is a sample message for MessageChip.`,
  },
  render: (args) => (
    <div style={{ width: "232px", margin: "0 auto" }}>
      <MessageChip {...args} />
    </div>
  ),
};


