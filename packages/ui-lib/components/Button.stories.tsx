import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Click me",
    color: "primary",
    onClick: () => alert("Primary clicked"),
  },
};

export const Secondary: Story = {
  args: {
    label: "Click me",
    color: "secondary",
    onClick: () => alert("Secondary clicked"),
  },
};

export const Success: Story = {
  args: {
    label: "Success",
    color: "success",
    onClick: () => alert("Success clicked"),
  },
};
