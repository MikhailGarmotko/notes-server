// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { Note, Item, Summary } from "./item.interface";
import { Items } from "./items.interface";

/**
 * In-Memory Store
 */

export let notes: Items = {
  1: {
    id: 1,
    name: "Good Idea",
    createdAt: " 1662026665000",
    category: "Idea",
    content: "Buy a car",
    dates: "",
    status: "active",
  },
  2: {
    id: 2,
    name: "Shopping list",
    createdAt: "1662113065000",
    category: "Task",
    content: "Tomatoes,bread",
    dates: "",
    status: "active",
  },
  3: {
    id: 3,
    name: "New Feature",
    createdAt: "1662199465000",
    category: "Random Thought",
    content: "Implement new feature",
    dates: "",
    status: "active",
  },
  4:{
    id:4,
    name: "Touch the sky",
    createdAt: "1663063465000",
    category: "Idea",
    content: "I need to get high",
    dates: "",
    status: "active",
  },
  5:{
    id:5,
    name: "Good feature",
    createdAt: "1663236265000",
    category:"Idea",
    content: "Make money",
    dates: "",
    status: "active",
  },
  6:{
    id:6,
    name: "Scramble eggs",
    createdAt: "1663409065000",
    category: "Task",
    content: "I want to eat",
    dates: "",
    status: "active",
  },
  7:{
    id:7,
    name: "Save the world",
    createdAt: "1663495465000",
    category: "Task",
    content: "I want to leave in peace",
    dates: "",
    status: "active",
  },
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Item[]> => Object.values(notes).filter(i => i.status ==="active");
export const find = async (id: number): Promise<Item> => notes[id];

export const create = async (newItem: Note): Promise<Item> => {
  const id = new Date().valueOf();

  notes[id] = {
    id,
    ...newItem,
  };

  return notes[id];
};

export const update = async (
  id: number,
  itemUpdate: Note
): Promise<Item | null> => {
  const item = await find(id);
  if (!item) {
    return null;
  }
  notes[id] = { id, ...itemUpdate };
  return notes[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const item = await find(id);
  if (!item) {
    return null;
  }
  delete notes[id];
};
export const statistics = async (): Promise<Summary> => {
  const notesMap = new Set(Object.values(notes).map((i: Note) => i.category));
  let summaryData: Summary = [];
  notesMap.forEach((i) => {
    let activeCount = 0;
    let archivedCount = 0;
    Object.values(notes).map(
      (item: Note) =>
        item.category === i
          ? item.status === "active"
            ? activeCount++
            : archivedCount++
          : null,
      0
    );
    summaryData.push({
      category: i,
      active: activeCount,
      archived: archivedCount,
    });
  });

    return summaryData;
};
