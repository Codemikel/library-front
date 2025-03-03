import type { Genre } from '../models/Genre';

const API_URL = 'http://localhost:8000/api/v1/generos';

// Obtener todos los géneros
export const getGenres = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los géneros');
  }
  return response.json();
};

// Crear un género
export const createGenre = async (genre: Omit<Genre, 'id'>) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(genre),
  });
  if (!response.ok) {
    throw new Error('Error al crear el libro');
  }
  return response.json();
};

// Eliminar un género
export const deleteGenre = async (id: number): Promise<void> => {
  if (confirm('¿Está seguro de eliminar el género y sus libros?')) {
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el autor');
    }
  }
};