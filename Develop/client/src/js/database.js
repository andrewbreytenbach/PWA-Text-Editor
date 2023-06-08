import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const STORE_NAME = 'jate';

const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('contentIndex', 'content');
        console.log('jate database created');
      }
    },
  });

  return db;
};

export const putDb = async (content) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.put({ content });
  await tx.complete;
};

export const getDb = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const content = await store.getAll();
  await tx.complete;
  return content;
};

initDB();
