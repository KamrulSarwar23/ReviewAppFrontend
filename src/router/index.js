import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import ProductDetail from '../components/product/ProductDetail.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path:'/',
            name: 'home',
            component:Home
        },

        {
            path:'/product/:id',
            name: 'product',
            component:ProductDetail
        },


    ]
})

export default router