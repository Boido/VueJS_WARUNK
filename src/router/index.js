import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ListPage from '../views/ListPage.vue'
import InputPage from '../views/InputPage.vue'
import EditPage from '../views/EditPage.vue'
import InputCategoryPage from '../views/CategoryInputPage.vue'
import EditCategoryPage from '../views/CategoryEditPage.vue'
import FilterProduct from '../views/FilterProduct.vue'

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/list',
    name: 'listpage',
    component: ListPage
  },
  {
    path: '/add',
    name: 'inputpage',
    component: InputPage
  },
  {
    path: '/edit/:id',
    name: 'editpage',
    component: EditPage
  },
  {
    path: '/categoryin',
    name: 'cinputpage',
    component: InputCategoryPage
  },
  {
    path: '/categoryedit/:id',
    name: 'ceditpage',
    component: EditCategoryPage
  },
  {
    path: '/filterlist/:id',
    name: 'FilterProduct',
    component: FilterProduct
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
