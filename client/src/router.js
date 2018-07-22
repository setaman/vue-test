import Vue from 'vue'
import Router from 'vue-router'
import Weather from './views/Weather.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'weather',
            component: Weather,
        },
        {
            path: '/about',
            name: 'about',
            component: Weather
        },
        {
            path: '/login',
            name: 'weather',
            component: Login
        }
    ]
})
