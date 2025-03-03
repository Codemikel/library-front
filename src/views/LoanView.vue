<template>
    <div class="grid-cols-3 gap-6 mx-3">
      <div class="col-span-3">
        <h1 class="text-center text-2xl font-bold">Prestamos</h1>
      </div>
      <div class="col-span-3">
        <LoanList :loans="loans" />
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getLoans } from '../services/loanService';
  import type { Loan } from '../models/Loan';
  import LoanList from '../components/LoanList.vue';
  
  const loans = ref<Loan[]>([]);
  
  const form = {
    name: null,
    author_id: null,
    genre_id: null
  }
  
  const fetchLoans = async () => {
    try {
      loans.value = await getLoans();
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };
  
  onMounted(() => {
    fetchLoans();
  });
  </script>