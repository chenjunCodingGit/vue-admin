import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'

import User from '@/components/page/User' //展示用户
import Sell from '@/components/page/Sell' //展示销售量



Vue.use(Router)

const routes = [
    { path: '/', component: Login }, //起始页为Home
    {
        path: '/main',
        component: Main,
        children: [
            { path: '/1-1', component: User },
            { path: '/1-2', component: User },
            { path: '/2', component: User },
            { path: '/3', component: Sell }
        ]
    },
]

export default new Router({
    routes
})