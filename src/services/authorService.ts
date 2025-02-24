import type { Author } from '../models/Author';

const API_URL = 'http://localhost:8000/api/v1/autores';

// Obtener todos los autores
export const getAuthors = async (): Promise<Author[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los autores');
  }
  return response.json();
};