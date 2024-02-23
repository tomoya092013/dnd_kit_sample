import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './organisms/Header/Header.organism';

const meta = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {},
};
