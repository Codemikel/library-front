<template>
  <div class="grid grid-cols-3 gap-6 mx-3">
    <div class="col-span-3">
      <h1 class="text-center text-2xl font-bold">Autores</h1>
    </div>
    <div class="col-span-2">
      <AuthorList :authors="authors" />
    </div>
    <div class="col-span-1">
      <AuthorForm :form="form" @author-created="handleAuthorCreated" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AuthorForm from '../components/AuthorForm.vue';
import AuthorList from '../components/AuthorList.vue';
import type { Author } from '../models/Author';
import { getAuthors } from '../services/authorService';


const authors = ref<Author[]>([]);

const form = {
  name: null,
  author_id: null,
  genre_id: null
}

const fetchAuthors = async () => {
  try {
    authors.value = await getAuthors();
  } catch (error) {
    console.error('Error al obtener los libros:', error);
  }
};

const handleAuthorCreated = async () => {
  await fetchAuthors();
}

onMounted(() => {
  fetchAuthors();
});
</script>