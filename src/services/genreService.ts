import type { Genre } from '../models/Genre';

const API_URL = 'http://localhost:8000/api/v1/generos';

// Obtener todos los géneros
export const getGenres = async (): Promise<Genre[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los géneros');
  }
  return response.json();
};