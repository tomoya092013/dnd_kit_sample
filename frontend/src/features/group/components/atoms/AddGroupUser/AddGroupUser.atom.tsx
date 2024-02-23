import { Button } from '@/components/atoms/Button/Button.atom';
import React from 'react';

type Props = {
  title?: string;
  onClick: () => void;
};

export const AddGroupUser = ({
  title = '＋ Add Group User',
  onClick,
}: Props) => {
  return (
    <Button
      className="text-right"
      onClick={onClick}
      variant='none'
    >
      {title}
    </Button>
  );
};
