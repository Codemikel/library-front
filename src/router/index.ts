import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoanView from '../views/LoanView.vue';
import GenresView from '../views/GenresView.vue';
import AuthorsView from '../views/AuthorsView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView, // Componente asociado a la ruta
  },
  {
    path: '/prestamos',
    name: 'Prestamos',
    component: LoanView, // Componente asociado a la ruta
  },
  {
    path: '/generos',
    name: 'Géneros',
    component: GenresView, // Componente asociado a la ruta
  },
  {
    path: '/autores',
    name: 'Autores',
    component: AuthorsView, // Componente asociado a la ruta
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;