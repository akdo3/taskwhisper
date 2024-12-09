import { openDB } from 'idb';
import { Task } from '@/types/todo';

const DB_NAME = 'taskwhisper-db';
const STORE_NAME = 'tasks';

export const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    },
  });
  return db;
};

export const saveTask = async (task: Task) => {
  const db = await initDB();
  await db.put(STORE_NAME, task);
};

export const getAllTasks = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteTask = async (id: string) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};