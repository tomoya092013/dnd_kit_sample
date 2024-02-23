'use client';
import React, { useEffect, useState } from 'react';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { Item, Task } from '../types';
import SortAbleItem from './component/SortAbleItem';
import TimeLine from './component/TimeLine';

const TASKS: Task[] = [
  { startTime: 0, endTime: 3, title: 'React学習', bg: 'fecaca' },
  { startTime: 10, endTime: 12, title: '瞑想瞑想瞑想瞑想', bg: 'bbf7d0' },
  { startTime: 15, endTime: 23, title: 'ああ', bg: 'bfdbfe' },
];

const SimpleSortablePage = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [items, setItems] = useState<Item[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);
      const newItems = arrayMove(items, activeIndex, overIndex);
      setItems(newItems);
    }
  };

  useEffect(() => {
    createItemList(tasks);
  }, [tasks]);

  const createItemList = (tasks: Task[]) => {
    let tasksTotalLength = 0;
    TASKS.forEach((task) => {
      const taskLength = task.endTime - task.startTime;
      if (taskLength > 1) {
        tasksTotalLength += taskLength - 1;
      }
    });
    const newArray: Item[] = new Array(24 - tasksTotalLength)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        task: null,
      }));
    let totalTimeIndex = 0;
    tasks.forEach((task) => {
      const itemIndex = task.startTime - totalTimeIndex;
      const newTask = { id: itemIndex + 1, task: task };
      newArray[itemIndex] = newTask;
      totalTimeIndex += task.endTime - task.startTime - 1;
    });
    setItems(newArray);
  };

  return (
    <div className="m-10 p-5 w-[30rem] border-2 relative">
      <TimeLine />
      <div className="absolute top-11 ml-[8rem]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => handleDragEnd(event)}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
          <SortableContext items={items}>
            {items.map((item) => (
              <SortAbleItem key={item.id} item={item} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default SimpleSortablePage;
