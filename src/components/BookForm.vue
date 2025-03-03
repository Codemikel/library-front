<template>
    <form @submit.prevent="submitForm" class="bg-white p-3 rounded-xl shadow-md">
        <h2 class="text-xl text-center font-bold mb-2">Agregar libros</h2>
        <div class="grid gap-6 mb-6 md:grid-cols-1">
            <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                Nombre del libro
                </label>
                <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Nombre"
                />
            </div>
            <div>
                <label for="author" class="block mb-2 text-sm font-medium text-gray-900">
                    Autor
                </label>
                <select
                    v-model="form.author_id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                <option v-for="author in authors" :key="author.id" :value="author.id">
                    {{ author.name }}
                </option>
                </select>
            </div>
            <div>
                <label for="genre" class="block mb-2 text-sm font-medium text-gray-900">
                    Género
                </label>
                <select
                    v-model="form.genre_id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                    <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                        {{ genre.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="flex justify-end">
          <button
              type="submit"
              class="bg-blue-700 hover:bg-blue-800 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Agregar
          </button>
        </div>
    </form>
</template>
  
  <script setup lang="ts">

  import { onMounted, ref } from 'vue';
  import type { Author } from '../models/Author';
  import type { Genre } from '../models/Genre';
  import { getAuthors } from '../services/authorService';
  import { getGenres } from '../services/genreService';
  import { createBook } from '../services/bookService';
  
  // Estado reactivo para los autores y géneros
  const authors = ref<Author[]>([]);
  const genres = ref<Genre[]>([]);
  
  // Estado reactivo para el formulario
  const form = ref({
    name: '',
    author_id: null as number | null,
    genre_id: null as number | null,
  });
  
  // Emitir eventos al componente padre
  const emit = defineEmits<(event: 'book-created', book: any) => void>();
  
  // Obtener la lista de autores
  const fetchAuthors = async () => {
    try {
      authors.value = await getAuthors();
    } catch (error) {
      console.error('Error al obtener los autores:', error);
    }
  };
  
  // Obtener la lista de géneros
  const fetchGenres = async () => {
    try {
      genres.value = await getGenres();
    } catch (error) {
      console.error('Error al obtener los géneros:', error);
    }
  };
  
  // Manejar el envío del formulario
  const submitForm = async () => {
    try {
      // Validar que todos los campos estén completos
      if (!form.value.name || !form.value.author_id || !form.value.genre_id) {
        alert('Por favor, completa todos los campos.');
        return;
      }
  
      // Crear el libro llamando a la API
      const newBook = await createBook({
        name: form.value.name,
        author_id: form.value.author_id,
        genre_id: form.value.genre_id,
      });
  
      // Emitir el evento `book-created` con el nuevo libro
      emit('book-created', newBook);
  
      // Limpiar el formulario después de crear el libro
      form.value = {
        name: '',
        author_id: null,
        genre_id: null,
      };
  
      alert('Libro creado exitosamente.');
    } catch (error) {
      console.error('Error al crear el libro:', error);
      alert('Hubo un error al crear el libro.');
    }
  };
  
  // Cargar autores y géneros al montar el componente
  onMounted(() => {
    fetchAuthors();
    fetchGenres();
  });
  </script>