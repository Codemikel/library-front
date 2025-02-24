import type { User } from '../models/User';

const API_URL = 'http://localhost:8000/api/v1/usuarios';

// Obtener todos los autores
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los autores');
  }
  return response.json();
};