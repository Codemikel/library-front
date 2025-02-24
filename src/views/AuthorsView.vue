<template>
    <div class="grid grid-cols-3 gap-6 mx-3">
      <div class="col-span-3">
        <h1 class="text-center text-2xl font-bold">Autores</h1>
      </div>
      <div class="col-span-2">
        <BookList :books="books" />
      </div>
      <div class="col-span-1">
        <BookForm 
          :form="form"
          @book-created="handleBookCreated"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getBooks } from '../services/bookService';
  import type { Book } from '../models/Book';
  import LoanList from '../components/LoanList.vue';
  
  
  const books = ref<Book[]>([]);
  
  const form = {
    name: null,
    author_id: null,
    genre_id: null
  }
  
  const fetchBooks = async () => {
    try {
      books.value = await getBooks();
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };
  
  const handleBookCreated = async () => {
    await fetchBooks();
  }
  
  onMounted(() => {
    fetchBooks();
  });
  </script>