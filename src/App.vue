<template>
  <div id="app" class="bg-gray-100 h-full h-screen">
    <!-- Barra de navegación -->
    <nav class="flex justify-around p-3 mb-7 bg-white shadow-md">
      <router-link class="text-blue-600" to="/">Libros</router-link>
      <router-link class="text-blue-600" to="/autores">Autores</router-link>
      <router-link class="text-blue-600" to="/generos">Géneros</router-link>
      <router-link class="text-blue-600" to="/prestamos">Prestamos</router-link>
    </nav>

    <!-- Aquí se renderizan las vistas -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>