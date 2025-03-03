<template>
  <div class="lg:grid grid-cols-3 gap-6 mx-3">
    <div class="col-span-3 mb-4">
      <h1 class="text-center text-2xl font-bold">Géneros</h1>
    </div>
    <div class="col-span-2 mb-5 lg:mb-0">
      <GenreList :genres="genres" />
    </div>
    <div class="col-span-1 mb-3">
      <GenreForm :form="form" @genre-created="handleGenreCreated" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getGenres } from '../services/genreService';
import GenreList from '../components/GenreList.vue';
import GenreForm from '../components/GenreForm.vue';


const genres = ref([]);

const form = {
  name: null
}

const fetchGenres = async () => {
  try {
    genres.value = await getGenres();
  } catch (error) {
    console.error('Error al obtener los libros:', error);
  }
};

const handleGenreCreated = async () => {
  await fetchGenres();
}

onMounted(() => {
  fetchGenres();
});
</script>