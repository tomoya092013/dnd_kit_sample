import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Item } from '../../types';

type Props = {
  item: Item;
};

const SortAbleItem = ({ item }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  let itemHeight = 0;
  if (item.task) {
    itemHeight = (item.task?.endTime - item.task?.startTime) * 30;
  }

  return (
    <div
      className={`flex justify-start ${
        item.task?.title ? 'cursor-grab' : ''
      } rounded-[0.5rem]`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        height: `${item.task ? `${itemHeight}px` : '30px'}`,
        backgroundColor: `#${item.task?.bg}`,
      }}
    >
      <div className="p-3">{item.task?.title}</div>
    </div>
  );
};

export default SortAbleItem;
