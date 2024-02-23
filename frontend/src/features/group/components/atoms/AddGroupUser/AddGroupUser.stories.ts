import type { Meta, StoryObj } from '@storybook/react';
import { AddGroupUser } from './AddGroupUser.atom';

const meta = {
  title: 'Group/AddGroupUser',
  component: AddGroupUser,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AddGroupUser>;

export default meta;
type Story = StoryObj<typeof meta>;

const addUser = () => {
  console.log('ユーザー追加');
};

export const Default: Story = {
  args: { onClick: addUser },
};
