import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import BoardPage from '@/pages/BoardPage.vue'
import BoardWritePage from '@/pages/BoardWritePage.vue'
import BoardEditPage from '@/pages/BoardEditPage.vue'
import BoardDetailPage from '@/pages/BoardDetailPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/board', name: 'Board', component: BoardPage },
  { path: '/board/new', name: 'BoardWrite', component: BoardWritePage },
  { path: '/board/:id', name: 'BoardDetail', component: BoardDetailPage },
  { path: '/board/:id/edit', name: 'BoardEdit', component: BoardEditPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
