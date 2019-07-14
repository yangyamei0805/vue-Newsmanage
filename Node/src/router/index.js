import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {path: '/', redirect: '/home'},
] 

// 需要通过后台数据来生成的组件
export const asyncRoutes = {
	// 主页的组件
    'home': {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
	'add': {
	    path: 'add',
	    name: 'add',
	    component: () => import('../views/Add.vue')
	},
	// 管理新闻表的组件
    't1': {
        path: 't1',
        name: 't1',
        component: () => import('../views/T1.vue')
    },
	'newsadd': {
	    path: 'newsadd',
	    name: 'newsadd',
	    component: () => import('../views/NewsAdd.vue')
	},
	'newslist': {
	    path: 'newslist',
	    name: 'newslist',
	    component: () => import('../views/NewsList.vue')
	},
    'password': {
        path: 'password',
        name: 'password',
        component: () => import('../views/Password.vue')
    }, 
    'userinfo': {
        path: 'userinfo',
        name: 'userinfo',
        component: () => import('../views/UserInfo.vue')
    }
}

const createRouter = () => new Router({
    routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}

export default router