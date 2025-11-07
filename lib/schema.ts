import { getAppDB } from './db'

export async function createAppTables() {
  const db = await getAppDB()
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      visits INTEGER DEFAULT 1
    );
    CREATE UNIQUE INDEX IF NOT EXISTS client_email ON clients(email);
  
    CREATE TABLE IF NOT EXISTS OPINIONS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      satisfaction INTEGER DEFAULT 1,
      opinion TEXT
    );
  `)
}