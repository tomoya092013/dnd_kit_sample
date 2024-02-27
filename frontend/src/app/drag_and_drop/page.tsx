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
import SortAbleItem from './components/SortAbleItem';
import TimeLine from './components/TimeLine';

const TASKS: Task[] = [
  { startTime: 0, endTime: 4, title: 'React学習', bg: 'fecaca' },
  { startTime: 4, endTime: 8, title: '瞑想瞑想瞑想瞑想', bg: 'bbf7d0' },
  { startTime: 15, endTime: 20, title: 'ああ', bg: 'bfdbfe' },
];

const SimpleSortablePage = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [items, setItems] = useState<Item[][]>([[]]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent, targetIndex: number) => {
    const { active, over } = event;
    const targetItems = items[targetIndex];

    const target = targetItems.find((item) => item.id === active.id);
    if (!target?.task) return;

    if (over && active.id !== over.id) {
      const activeIndex = targetItems.findIndex(({ id }) => id === active.id);
      const overIndex = targetItems.findIndex(({ id }) => id === over.id);

      const updatedTargetItems = updateTaskTime(
        activeIndex,
        overIndex,
        target,
        targetItems,
      );

      const newTargetItems = arrayMove(
        updatedTargetItems,
        activeIndex,
        overIndex,
      );

      const newItems = [...items];
      newItems[targetIndex] = newTargetItems;

      setItems(newItems);
    }
  };

  useEffect(() => {
    createSortableList(tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTaskTime = (
    activeIndex: number,
    overIndex: number,
    target: Item,
    targetItems: Item[],
  ): Item[] => {
    if (!target.task) return targetItems;
    if (activeIndex < overIndex) {
      const changeTime = overIndex - activeIndex;
      target.task.startTime += changeTime;
      target.task.endTime += changeTime;
    } else {
      const changeTime = activeIndex - overIndex;
      target.task.startTime -= changeTime;
      target.task.endTime -= changeTime;
    }
    const updatedTargetItems = [...targetItems];
    updatedTargetItems[activeIndex] = target;
    return updatedTargetItems;
  };

  const removeEndList = (itemList: Item[]) => {
    let newTaskLength = 0;
    itemList.forEach((item) => {
      if (!item.task) return;
      const taskLength = item.task.endTime - item.task.startTime;
      newTaskLength += taskLength - 1;
    });
    itemList.splice(-newTaskLength);
  };

  const createSortableList = (tasks: Task[]) => {
    const itemList = tasks.map((task) => {
      const newItemList: Item[] = new Array(24).fill(null).map((_, index) => ({
        id: index + 1,
        task: null,
      }));
      const itemIndex = task.startTime;
      const newTask = { id: itemIndex + 1, task: task };
      newItemList[itemIndex] = newTask;
      removeEndList(newItemList);
      return newItemList;
    });
    setItems(itemList);
  };

  return (
    <div className="m-10 p-5 w-[34rem] border-2 relative">
      <TimeLine />
      <div
        className="flex absolute top-11 ml-[8rem]"
        style={{ width: '200px' }}
      >
        {items.map((targetItems, targetIndex) => {
          const targetTask = targetItems.find((targetItem) => {
            return targetItem.task;
          });

          return (
            <div
              key={targetIndex}
              className="justify-between"
              style={{
                // position: targetIndex < 1 ? 'absolute' : undefined,
                position: 'absolute',
                left: targetIndex > 0 ? 100 : undefined,
                width: targetIndex < 1 ? '200px' : '100px',
              }}
            >
              <DndContext
                key={targetIndex}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => handleDragEnd(event, targetIndex)}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
              >
                <SortableContext items={targetItems}>
                  <div className="flex flex-col">
                    {targetItems.map((item) => (
                      <div
                        key={item.id}
                        style={{ zIndex: `${item.task ? 1 : 0}` }}
                      >
                        <SortAbleItem key={item.id} item={item} />
                      </div>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleSortablePage;
