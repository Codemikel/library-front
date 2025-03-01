<template>
  <form @submit.prevent="submitForm" class="bg-white p-3 rounded-xl shadow-md">
    <h2 class="text-xl text-center font-bold mb-2">Agregar autores</h2>
    <div class="grid gap-6 mb-6 md:grid-cols-1">
      <div>
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
          Nombre del autor
        </label>
        <input type="text" id="name" v-model="form.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Nombre" />
      </div>
    </div>
    <div class="flex justify-end">
      <button type="submit"
        class="bg-blue-700 hover:bg-blue-800 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
        Agregar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { createAuthor } from '../services/authorService';

// Estado reactivo para el formulario
const form = ref({
  name: '',
});

// Emitir eventos al componente padre
const emit = defineEmits<(event: 'author-created', author: any) => void>();

// Manejar el envío del formulario
const submitForm = async () => {
  try {
    // Validar que todos los campos estén completos
    if (!form.value.name) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Crear el libro llamando a la API
    const newAuthor = await createAuthor({
      name: form.value.name
    });

    // Emitir el evento `book-created` con el nuevo libro
    emit('author-created', newAuthor);

    // Limpiar el formulario después de crear el libro
    form.value = {
      name: ''
    };

    alert('Autor creado exitosamente.');
  } catch (error) {
    console.error('Error al crear el autor:', error);
    alert('Hubo un error al crear el autor.');
  }
};
</script>