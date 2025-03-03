<template>
  <div v-if="isOpen" class="fixed inset-0 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Prestar libro</h2>
      <form @submit.prevent="submitLoan">
        <div class="mb-4">
          <label for="book" class="block text-sm font-medium text-gray-700">Libro</label>
          {{ chosenBook?.name }}
        </div>
        <div class="mb-4">
          <label for="user" class="block text-sm font-medium text-gray-700">Usuario</label>
          <select id="user" v-model="loan.user_id" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required>
            <option v-for="user in userList" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="loan_date" class="block text-sm font-medium text-gray-700">Fecha de préstamo</label>
          <input type="date" id="loan_date" v-model="loan.loan_date" :min="today"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="return_date" class="block text-sm font-medium text-gray-700">Fecha de devolución</label>
          <input type="date" id="return_date" v-model="loan.return_date" :min="loan.loan_date || today"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeModal"
            class="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancelar
          </button>
          <button type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Prestar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Book } from '../models/Book';
import type { Loan } from '../models/Loan';
import type { User } from '../models/User';

const today = computed(() => {
  const date = new Date();
  return date.toISOString().split('T')[0];
})

// Estado reactivo para el préstamo
const loan = ref<Loan>({
  id: 0,
  book_id: 0,
  user_id: 0,
  loan_date: today.value,
  return_date: '',
  returned: false,
});

watch(() => loan.value.loan_date, (newLoanDate) => {
  if (!loan.value.return_date || loan.value.return_date < newLoanDate) {
    loan.value.return_date = newLoanDate;
  }
});

// Estado reactivo para controlar la visibilidad de la modal
const isOpen = ref(false);

// Lista de libros disponibles y usuarios
const chosenBook = ref<Book>();
const userList = ref<User[]>([]);

// Abrir la modal
const openModal = (book: Book, usersList: User[]) => {
  chosenBook.value = book;
  userList.value = usersList;
  loan.value.book_id = book.id;
  isOpen.value = true;
};

// Cerrar la modal
const closeModal = () => {
  isOpen.value = false;
  resetForm();
};

// Resetear el formulario
const resetForm = () => {
  loan.value = {
    id: 0,
    book_id: 0,
    user_id: 0,
    loan_date: '',
    return_date: '',
    returned: false,
  };
};

// Emitir eventos al componente padre
const emit = defineEmits<{
  (event: 'loan-created', loan: Loan): void; // Evento para cuando se crea un préstamo
}>();

// Manejar el envío del formulario
const submitLoan = () => {
  // Validar que todos los campos estén completos
  if (!loan.value.book_id || !loan.value.user_id || !loan.value.loan_date || !loan.value.return_date) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Emitir el evento `loan-created` con los datos del préstamo
  emit('loan-created', loan.value);

  // Cerrar la modal y resetear el formulario
  closeModal();
};

// Exponer métodos para abrir y cerrar la modal
defineExpose({
  openModal,
  closeModal,
});
</script>