import * as SQLite from 'expo-sqlite'
const DB_NAME = 'clients_db'
let db: SQLite.SQLiteDatabase | null = null

export async function getAppDB() {
  if(!db) {
    db = await SQLite.openDatabaseAsync(DB_NAME, { useNewConnection: true })
  }
  return db
}