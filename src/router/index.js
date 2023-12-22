import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import UserPanel from '../views/UserPanel.vue'
import FormView from '../views/FormView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'authpage',
            component: AuthView
        },
        {
            path: '/panel',
            name: 'panel',
            component: UserPanel
        },
        {
            path: '/panel/form',
            name: 'form',
            component: FormView
        }
    ]
})

export default router