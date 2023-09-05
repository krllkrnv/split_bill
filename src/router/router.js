import {createRouter, createWebHistory} from "vue-router";

import CustomersPage from "@/pages/CustomersPage.vue";
import DishesPage from "@/pages/DishesPage.vue";
import ResultPage from "@/pages/ResultPage.vue";

const routes = [
    {
        path: '/',
        component: CustomersPage
    },
    {
        path: '/dishes',
        component: DishesPage
    },
    {
        path: '/results',
        component: ResultPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;