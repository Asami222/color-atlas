import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as RadixDialog from "@radix-ui/react-dialog";
import { type ReactNode, useState } from "react";
import { Dialog } from "./Dialog";

type DialogStoryProps = {
  title: string;
  description?: string;
  body?: string;
  footer?: ReactNode;
};

function DialogStory({ title, description, body, footer }: DialogStoryProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="p-6">
      <button
        type="button"
        className="rounded-default border border-gray-300 px-4 py-2"
        onClick={() => setOpen(true)}
      >
        Open dialog
      </button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        footer={footer}
      >
        <p className="text-sm text-gray-600">{body}</p>
      </Dialog>
    </div>
  );
}

const meta: Meta<typeof Dialog> = {
  title: "Components/UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    open: { control: false },
    onOpenChange: { action: "changed" },
    title: { control: "text" },
    description: { control: "text" },
    footer: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: "Dialog title",
    description: "This is a sample dialog description.",
    children: <p className="text-sm text-gray-600">Choose an action below.</p>,
  },
  render: (args) => (
    <DialogStory
      title={args.title}
      description={args.description}
      body="Choose an action below."
    />
  ),
};

export const WithFooter: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: "Save changes",
    description: "You can confirm or cancel before applying the changes.",
    children: <p className="text-sm text-gray-600">The changes will be applied immediately.</p>,
  },
  render: (args) => (
    <DialogStory
      title={args.title}
      description={args.description}
      body="The changes will be applied immediately."
      footer={
        <>
          <RadixDialog.Close asChild>
            <button type="button" className="rounded-default border border-gray-300 px-3 py-2">
              Cancel
            </button>
          </RadixDialog.Close>
          <button type="button" className="rounded-default bg-black px-3 py-2 text-white">
            Save
          </button>
        </>
      }
    />
  ),
};
