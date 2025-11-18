import { getAppDB } from '@/services/db'

type Client = {
  id: number;
  email: string;
  visits: number;
}

export const getClient = async(clientEmail:string):Promise<Client | null> => {
  const db = await getAppDB()
  const client: Client | null = await db.getFirstAsync(
    `SELECT * FROM clients WHERE email = ?`,
    [clientEmail])
  return client
}

export const addClient = async(clientEmail:string) => {
  const db = await getAppDB()
  const clients = await db.runAsync(
    `INSERT INTO clients (email) VALUES (?)`, clientEmail)
  return clients
}