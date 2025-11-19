import { getAppDB } from '@/services/db'
import { number } from 'yup';

type Client = {
  id: number;
  email: string;
  visits: number;
}

type Opinion = {
  user_id: number;
  satisfaction: number;
  opinion: string;
}

export const addOpinion = async(user_id:number, satisfaction:number, opinion:string) => {
  const db = await getAppDB()
  return  await db.runAsync('INSERT INTO opinions (user_id, satisfaction, opinion) VALUES (?,?,?)', user_id, satisfaction, opinion);
}

export const getClient = async(clientEmail:string):Promise<Client | null> => {
  const db = await getAppDB()
  return await db.getFirstAsync(
    `SELECT * FROM clients WHERE email = ?`,
    [clientEmail])
}

export const addClient = async(clientEmail:string) => {
  const db = await getAppDB()
  return  await db.runAsync(
    `INSERT INTO clients (email) VALUES (?)`, clientEmail)
}

export const updateClientVisits = async(email:string, visits:number) => {
  const db = await getAppDB()
  return await db.runAsync('UPDATE clients SET visits = ? WHERE email = ?', [visits, email]);
}