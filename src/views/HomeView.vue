<template>
  <div class="grid grid-cols-3 gap-6 mx-3">
    <div class="col-span-3">
      <h1 class="text-center text-2xl font-bold">Libros</h1>
    </div>
    <div class="col-span-2">
      <BookList :books="books" />
    </div>
    <div class="col-span-1">
      <BookForm 
        :form="form"
        @book-created="refreshBooks"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getBooks } from '../services/bookService';
import type { Book } from '../models/Book';
import BookList from '../components/BookList.vue';
import BookForm from '../components/BookForm.vue';

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

const refreshBooks = async () => {
  await fetchBooks();
}

onMounted(() => {
  fetchBooks();
});
</script>