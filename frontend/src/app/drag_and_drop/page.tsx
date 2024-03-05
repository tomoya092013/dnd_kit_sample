'use client';
import React, { useEffect, useState } from 'react';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Item, Task } from '../types';
import SortAbleItem from './components/SortAbleItem';
import TimeLine from './components/TimeLine';

const TASKS: Task[] = [
  { startTime: 1, endTime: 8, title: 'React学習', bg: 'fecaca' },
  { startTime: 5, endTime: 10, title: '瞑想', bg: 'bbf7d0' },
  { startTime: 9, endTime: 12, title: 'ランニング', bg: 'bfdbfe' },
];

const SimpleSortablePage = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [items, setItems] = useState<Item[][]>([[]]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor),
  );

  const handleDragEnd = (event: DragEndEvent, targetIndex: number) => {
    const { active, over } = event;
    const targetItems = items[targetIndex];
    const target = targetItems.find((item) => item.id === active.id);
    if (!target?.task) return;
    if (over && active.id !== over.id) {
      const activeIndex = targetItems.findIndex(({ id }) => id === active.id);
      const overIndex = targetItems.findIndex(({ id }) => id === over.id);
      const updatedTargeTask = updateTaskTime(
        activeIndex,
        overIndex,
        target.task,
        // targetItems,
      );
      const newTasks = [...tasks];
      newTasks[targetIndex] = updatedTargeTask;
      setTasks(newTasks);
      createSortableList(newTasks);
      // const newTargetItems = arrayMove(
      //   updatedTargetItems,
      //   activeIndex,
      //   overIndex,
      // );
      // const newItems = [...items];
      // newItems[targetIndex] = newTargetItems;
      // setItems(newItems);
    }
  };

  useEffect(() => {
    createSortableList(tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const updateTaskTime = (
    activeIndex: number,
    overIndex: number,
    targetTask: Task,
  ): Task => {
    if (activeIndex < overIndex) {
      const changeTime = overIndex - activeIndex;
      targetTask.startTime += changeTime;
      targetTask.endTime += changeTime;
    } else {
      const changeTime = activeIndex - overIndex;
      targetTask.startTime -= changeTime;
      targetTask.endTime -= changeTime;
    }
    return targetTask;
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
    const overlapedTasks: Task[] = createOverlap(tasks);
    const itemList = overlapedTasks.map((task) => {
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

  const createOverlap = (tasks: Task[]): Task[] => {
    const overlapedTasks = tasks.map((targetTask: Task, targetIndex) => {
      let overlapCount = 0;
      let paddingCount = 0;
      tasks.forEach((compareTask: Task, compareIndex) => {
        if (targetIndex === compareIndex) return;
        if (
          targetTask.startTime >= compareTask.startTime &&
          targetTask.startTime < compareTask.endTime
        ) {
          overlapCount += 1;
          let mostPadding = 0;
          tasks.forEach((moreCompareTask: Task, moreCompareTaskIndex) => {
            let currentPadding = mostPadding;
            if (compareIndex === moreCompareTaskIndex) return;
            if (
              compareTask.startTime >= moreCompareTask.startTime &&
              compareTask.startTime < moreCompareTask.endTime
            ) {
              currentPadding += 1;
            }
            if (mostPadding < currentPadding) {
              mostPadding = currentPadding;
            }
          });
          paddingCount = mostPadding + 1;
        }
      });
      return {
        ...targetTask,
        overlapCount,
        paddingCount,
      };
    });
    return overlapedTasks;
  };

  return (
    <div className="m-10 p-5 w-[34rem] border-2 relative">
      <TimeLine />
      <div
        className="flex absolute top-11 ml-[8rem]"
        style={{ width: '200px' }}
      >
        {items.map((targetItems, targetIndex) => {
          const targetTask = targetItems.find((item) => item.task);
          const paddingCount = targetTask?.task?.paddingCount || 0;

          return (
            <div
              key={targetIndex}
              className="absolute w-full"
              style={{
                paddingLeft: `${paddingCount * 30}px`,
              }}
            >
              <DndContext
                key={targetIndex}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => handleDragEnd(event, targetIndex)}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={targetItems}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col">
                    {targetItems.map((item) => {
                      let taskPaddingCount = 0;
                      if (item.task) {
                        item.task.paddingCount
                          ? (taskPaddingCount = item.task.paddingCount + 1)
                          : (taskPaddingCount = 1);
                      }
                      return (
                        <div
                          key={item.id}
                          style={{
                            zIndex: `${taskPaddingCount}`,
                          }}
                        >
                          <SortAbleItem key={item.id} item={item} />
                        </div>
                      );
                    })}
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
