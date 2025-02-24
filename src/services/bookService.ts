import type { Book } from '../models/Book';

const API_URL = 'http://localhost:8000/api/v1/libros';

// Obtener todos los libros
export const getBooks = async (): Promise<Book[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los libros');
  }
  return response.json();
};

// Obtener un libro por ID
export const getBookById = async (id: number): Promise<Book> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener el libro');
  }
  return response.json();
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error('Error al crear el libro');
  }
  return response.json();
};

// Actualizar un libro existente
export const updateBook = async (id: number, book: Book): Promise<Book> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el libro');
  }
  return response.json();
};

// Eliminar un libro
export const deleteBook = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el libro');
  }
};