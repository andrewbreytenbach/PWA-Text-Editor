import { openDB } from 'idb';

// Function to initialize the database
const initDB = async () => {
  const db = await openDB('jate', 1, {
    // The upgrade function is called when the database is created or needs to be upgraded
    upgrade(db) {
      // Check if the 'jate' object store already exists in the database
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      
      // Create a new object store named 'jate' with a keyPath of 'id' and auto-incrementing IDs
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  return db; // Return the database object
};

// Function to store data in the database
export const putDb = async (content) => {
  const db = await initDB(); // Initialize the database
  const tx = db.transaction('jate', 'readwrite'); // Start a transaction in 'readwrite' mode
  const store = tx.objectStore('jate'); // Get the object store named 'jate'
  
  // Add the provided content as a new entry in the object store with id: 1 and value: content
  await store.add({ id: 1, value: content });
  await tx.complete; // Complete the transaction
  
  console.log('Content added to the database:', content);
};

// Function to retrieve data from the database
export const getDb = async () => {
  const db = await initDB(); // Initialize the database
  const tx = db.transaction('jate', 'readonly'); // Start a transaction in 'readonly' mode
  const store = tx.objectStore('jate'); // Get the object store named 'jate'
  
  // Retrieve the content stored in the object store with id: 1
  const content = await store.get(1);
  await tx.complete; // Complete the transaction
  
  console.log('Retrieved content from the database:', content.value);
  return content.value; // Return the retrieved content
};

initDB(); // Initialize the database when the file is executed
