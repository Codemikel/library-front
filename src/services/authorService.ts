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

export const createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(author),
  });
  if (!response.ok) {
    throw new Error('Error al crear el libro');
  }
  return response.json();
};

// Eliminar un autor
export const deleteAuthor = async (id: number): Promise<void> => {
  if (confirm('¿Está seguro de eliminar el autor?')) {
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el autor');
    }
  }
};