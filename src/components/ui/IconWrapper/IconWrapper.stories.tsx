import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconButton } from "./IconWrapper";

const meta: Meta<typeof IconButton> = {
  title: "Components/UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "text",
      description: "Material icon name displayed inside the button",
      defaultValue: "favorite",
    },
    label: {
      control: "text",
      description: "Accessible label for the button",
      defaultValue: "Favorite",
    },
    variant: {
      control: { type: "radio" },
      options: ["default", "sub"],
      description: "Button background variant",
    },
    active: {
      control: "boolean",
      description: "Sets the active icon color state",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: "favorite",
    label: "Favorite",
    variant: "default",
    active: false,
  },
};

export const Sub: Story = {
  args: {
    icon: "settings",
    label: "Settings",
    variant: "sub",
    active: false,
  },
};

export const Active: Story = {
  args: {
    icon: "favorite",
    label: "Favorite Active",
    variant: "default",
    active: true,
  },
};

export const SearchFocused: Story = {
  args: {
    icon: "search",
    label: "Search",
    variant: "default",
    active: false,
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("button");
    if (button instanceof HTMLButtonElement) {
      button.focus();
    }
  },
};
//色の確認用
export const Test = {
  render: () => (
    <div className="bg-black text-white p-10 hover:bg-primary-hover">
      TEST
    </div>
  ),
};