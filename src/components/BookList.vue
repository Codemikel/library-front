<template>
    <div
        class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <table class="w-full text-left table-auto min-w-max">
            <thead>
                <tr>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p
                            class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Nombre
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p
                            class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Autor
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p
                            class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Género
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p
                            class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Estado
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p
                            class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {{ book.name }}
                        </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {{ book.author?.name }}
                        </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {{ book.genre?.name }}
                        </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {{ book.available ? 'Disponible' : 'No disponible' }}
                        </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                        <button v-if="book.available" @click="openLoanModal(book, userList)"
                            class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                            Prestar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal de préstamos -->
        <LoanModal ref="loanModal" @loan-created="handleLoanCreated" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Book } from '../models/Book';
import type { Loan } from '../models/Loan';
import type { User } from '../models/User';
import LoanModal from './LoanModal.vue';
import { createLoan } from '../services/loanService';
import { getUsers } from '../services/userService';

const props = defineProps<{
    books: Book[];
}>();

const loanModal = ref();
const userList = ref<User[]>([]);

const fetchUsers = async () => {
    userList.value = await getUsers();
}

const openLoanModal = (book: Book) => {
    loanModal.value.openModal(book, userList.value);
};

const handleLoanCreated = async (loan: Loan) => {
    try {
        await createLoan(loan);
        window.location.reload();
    } catch (error) {
        console.error('Error al registrar el préstamo:', error);
        alert('Hubo un error al registrar el préstamo.');
    }
};

onMounted(()=> {
    fetchUsers();
})
</script>