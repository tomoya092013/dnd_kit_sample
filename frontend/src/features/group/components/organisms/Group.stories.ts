import type { Meta, StoryObj } from '@storybook/react';
import { Group } from './Group.organism';

const meta = {
  title: 'Group/Group',
  component: Group,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

const UserList = [
  {
    name: 'Hiroki Tetuya',
    selected: true,
  },
  {
    name: 'Kenta Noda',
    selected: true,
  },
  {
    name: 'Tomoya Negishi',
    selected: false,
  },
  {
    name: 'Super Unco',
    selected: true,
  },
];

const OtherUserList = [
  {
    name: 'Hiroki Tetuya',
    selected: true,
  },
  {
    name: 'Kenta Noda',
    selected: true,
  },
  {
    name: 'Tomoya Negishi',
    selected: false,
  },
  {
    name: 'Super Unco',
    selected: true,
  },
  {
    name: 'Unco',
    selected: true,
  },
  {
    name: 'Unco？',
    selected: true,
  },
  {
    name: 'Super Unco！',
    selected: true,
  },
  {
    name: 'Super Unco！！！',
    selected: true,
  },
];

export const Default: Story = {
  args: { groupName: 'tuyotuyo-engineer', initUserList: UserList },
};

export const ManyUser: Story = {
  args: { groupName: '秘密結社UNCO', initUserList: OtherUserList },
};
