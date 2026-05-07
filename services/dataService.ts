import { getAppDB } from '@/services/db'
import base64 from 'react-native-base64'

export type Client = {
  id: number;
  name: string;
  visits: number;
}

export type Opinion = {
  id: number;
  user_id: number;
  satisfaction: number;
  opinion: string;
  requested_date: string;
}

export type Count = {
  count: number
}

export type LocalUser = {
  id: number;
  email: string;
  name: string;
  password: string;
}

export const addOpinion = async (user_id: number, satisfaction: number, opinion: string) => {
  const db = await getAppDB()
  return await db.runAsync('INSERT INTO opinions (user_id, satisfaction, opinion) VALUES (?,?,?)', user_id, satisfaction, opinion);
}

export const getCountAllOpinions = async (): Promise<Count | null> => {
  const db = await getAppDB()
  return await db.getFirstSync('SELECT COUNT(*) as count FROM opinions')
}

const fixMonth = (month: number) => {
  let fMonth = `${month + 1}`
  if (fMonth.length == 1)
    return `0${fMonth}`
  return fMonth
}

export const getOpinionsByMonth = async (year: number, month: number): Promise<Opinion[] | null> => {
  const date = `${year}-${fixMonth(month)}`
  const db = await getAppDB()
  return await db.getAllAsync("SELECT * FROM opinions WHERE strftime('%Y-%m', requested_date) = ?", [date])
}

export const getOpinionsByYear = async (year: number): Promise<Count | null> => {
  const db = await getAppDB()
  return await db.getFirstSync(
    "SELECT COUNT(*) as count FROM opinions WHERE strftime('%Y', requested_date) = ?", [`${year}`])
}

export const getClient = async (clientName: string): Promise<Client | null> => {
  const db = await getAppDB()
  const cleanName = clientName.replace(/\s+/g, ' ').trim().toLowerCase()
  return await db.getFirstAsync(
    `SELECT * FROM clients WHERE name LIKE ?`,
    [`%${cleanName}%`])
}

export const getUserOpinions = async (clientId: number): Promise<Opinion[] | null> => {
  const db = await getAppDB()
  return await db.getAllAsync(
    `SELECT * FROM opinions WHERE user_id = ?`,
    [clientId])
}

export const getAllClients = async (query: string = '', offset: number = 0): Promise<Client[] | null> => {
  const db = await getAppDB()
  const limit = 7
  if (query === '') {
    return await db.getAllAsync('SELECT * FROM clients LIMIT ? OFFSET ?', [limit, offset * limit])
  }
  const cleanName = query.replace(/\s+/g, ' ').trim().toLowerCase()
  return await db.getAllAsync(
    `SELECT * FROM clients WHERE name LIKE ?`,
    [`%${cleanName}%`])
}

export const addClient = async (clientName: string) => {
  const db = await getAppDB()
  const cleanName = clientName.replace(/\s+/g, ' ').trim().toLowerCase()
  return await db.runAsync(
    `INSERT INTO clients (name) VALUES (?)`, cleanName)
}

export const updateClientVisits = async (id: number, visits: number) => {
  const db = await getAppDB()
  return await db.runAsync('UPDATE clients SET visits = ? WHERE id = ?', [visits, id]);
}

export const addNewUser = async (email: string, name: string, pass: string) => {
  const db = await getAppDB()
  await db.runAsync('INSERT INTO localusers (email, name, password) VALUES (?,?,?)', email, name, base64.encode(pass));
}

export const getLocalUser = async (email: string, pass: string): Promise<LocalUser | null> => {
  const db = await getAppDB()
  return await db.getFirstAsync(`SELECT * FROM localusers WHERE email = ? AND password = ?`, [email, base64.encode(pass)])
}