import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/wiki',
  },
  
  {
    path: '/wiki',
    name: 'Wiki',
    redirect: '/wiki/posts',
    component: Layout,
    meta: { title: 'wiki', icon: 'wiki' },
    children: [
      {
        path: 'posts',
        name: 'WikiContent',
        redirect: "/wiki/posts/list",
        component: () => import('@/views/wiki/index'),
        // meta: { title: '文章首页' },
        children: [
          {
            path: 'list',
            name: 'WikiList',
            component: () => import('@/views/wiki/list'),
            meta: { title: '文章列表', icon: 'post' }
          },
          {
            path: 'create',
            name: 'Create',
            component: () => import('@/views/wiki/create'),
            meta: { title: '创建文章' },
            hidden: true
          },
          {
            path: 'edit/:id(\\d+)',
            name: 'Edit',
            component: () => import('@/views/wiki/edit'),
            meta: { title: '编辑文章' },
            hidden: true
          },
          {
            path: 'detail/:id(\\d+)',
            component: () => import('@/views/wiki/detail'),
            name: 'DocDetail',
            meta: { title: '文档正文' },
            hidden: true
          },
          {
            path: 'draft/:id(\\d+)',
            name: 'Draft',
            component: () => import('@/views/wiki/draft'),
            meta: { title: '编辑草稿' },
            hidden: true
          },


        ]

      },
      // {
      //   path: 'mypost',
      //   component: () => import('@/views/wiki/mypost'),
      //   name: 'MyPost',
      //   meta: { title: '我的文档', icon: 'me' },
      // },
      // {
      //   path: 'category',
      //   name: 'Category',
      //   component: () => import('@/views/wiki/category'),
      //   meta: { title: '文章分类', icon: 'category' }

      // },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
