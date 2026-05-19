import { getAppDB } from './db'

export async function createAppTables() {
  const db = await getAppDB()
  return await db.execAsync(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      visits INTEGER DEFAULT 1
    );
  
    CREATE TABLE IF NOT EXISTS opinions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      satisfaction INTEGER DEFAULT 1,
      opinion TEXT,
      requested_date DATE DEFAULT current_date
    );

    CREATE TABLE IF NOT EXISTS localusers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS localuser_email ON localusers(email);
  `)
}