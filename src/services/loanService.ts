import type { Loan } from '../models/Loan';

const API_URL = 'http://localhost:8000/api/v1/prestamos';

// Obtener todos los prestamos
export const getLoans = async (): Promise<Loan[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los libros');
  }
  return response.json();
};

// Obtener un libro por ID
export const getLoanById = async (id: number): Promise<Loan> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener el libro');
  }
  return response.json();
};

export const createLoan = async (loan: Omit<Loan, 'id'>): Promise<Loan> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loan),
  });
  if (!response.ok) {
    throw new Error('Error al crear el libro');
  }
  return response.json();
};

// Actualizar un libro existente
export const updateLoan = async (id: number, loan: Loan) => {
  if (confirm('¿Está seguro de finalizar el prestamo?')) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loan),
    });
    alert('Prestamo finalizado');
    if (!response.ok) {
      throw new Error('Error al actualizar el libro');
    }
    return response.json();
  }
};

// Eliminar un libro
export const deleteLoan = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el libro');
  }
};