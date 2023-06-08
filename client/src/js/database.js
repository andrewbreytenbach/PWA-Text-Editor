import { openDB } from 'idb';

const initDB = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  return db;
};

export const putDb = async (content) => {
  const db = await initDB();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.add({ content });
  await tx.complete;
  console.log('Content added to the database:', content);
};

export const getDb = async () => {
  const db = await initDB();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const content = await store.getAll();
  await tx.complete;
  console.log('Retrieved content from the database:', content);
  return content;
};

initDB();
