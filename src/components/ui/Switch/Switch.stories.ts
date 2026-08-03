import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { SwitchButton } from './Switch';

const meta: Meta<typeof SwitchButton> = {
  title: 'UI/Switch',
  component: SwitchButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
    onCheckedChange: {
      description: 'Callback function when the switch state changes',
    },
  },
  args: {
    onCheckedChange: fn(),
  },
} 

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Default: Story = {
  args: {
    checked: false,
  },
};
