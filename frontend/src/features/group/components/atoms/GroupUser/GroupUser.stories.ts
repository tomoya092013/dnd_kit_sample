import type { Meta, StoryObj } from '@storybook/react';
import { GroupUser } from './GroupUser.atom';

const meta = {
  title: 'Group/GroupUser',
  component: GroupUser,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GroupUser>;

export default meta;
type Story = StoryObj<typeof meta>;

const addUser = () => {
  console.log('ユーザー追加');
};

export const Default: Story = {
  args: { name: 'たろう', selected: true },
};
