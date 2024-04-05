import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Home from "@/home"
import Personcenter from "@/personcenter"
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true,
    meta: {
      type: "foreground",
    },
  },
  {
    path: '/404',

    component: () => import('@/views/404'),
    hidden: true,
    meta: {
      type: "foreground",
    },
  },


  { path: '*', redirect: '/', hidden: true }
]
export const constantHomeRoutes = [
  {
    path: '/home',
    component: Home,
    redirect: "/home/index",
    hidden: true,
    meta: {
      type: "foreground",

    },
    children: [
      {
        path: '/home/index',
        component: () => import('@/views/client/index'),
        hidden: true,
        meta: {
          type: "foreground",
        }
      },
      {
        path: '/home/article',
        component: () => import('@/views/client/article'),
        hidden: true,
        meta: {
          type: "foreground",
        }
      },

      {
        path: '/home/article-list',
        component: () => import('@/views/client/article-list'),
        hidden: true,
        meta: {
          type: "foreground",
        }
      },

      {
        path: '/personcenter',
        component: Personcenter,
        redirect: "/personcenter/edituserinfo",
        hidden: true,
        meta: {
          type: "foreground",
        },
        children: [
          {
            path: '/personcenter/index',
            component: () => import('@/views/client/personcenter'),
            hidden: true,
            meta: {
              type: "foreground",
            }
          },
          {
            path: '/personcenter/edituserinfo',
            component: () => import('@/views/client/edituserinfo'),
            hidden: true,
            meta: {
              type: "foreground",
            }
          },
          {
            path: '/personcenter/score-my',
            component: () => import('@/views/client/score-my'),
            hidden: true,
            meta: {
              type: "foreground",
            }
          },

        ]
      },
    ]
  },
  {
    path: '/home/register',
    component: () => import('@/views/client/register'),
    hidden: true,
    meta: {
      type: "foreground",
    }
  },
  {
    path: '/home/login',
    component: () => import('@/views/client/login'),
    hidden: true,
    meta: {
      type: "foreground",
    }
  },
]


export const asyncRoutes = [
  // {
  //   path: '/home/index',

  //   component: Layout,
  //   meta: {
  //     title: '前台',
  //     noCache: true
  //   }
  // },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      roles: [0, 1, 2]
    },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {
        title: '控制台',
        noCache: true,
        roles: [0, 1, 2]
      }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: {
      title: '用户管理',
      icon: "el-icon-s-custom",
      roles: [0]
    },
    children: [{
      path: 'list',
      component: () => import('@/views/user/user-list'),
      name: 'list',
      meta: {
        title: '用户',
        roles: [0],
        noCache: true
      }
    },]
  },


  {
    path: '/room',
    component: Layout,
    redirect: '/room/list',
    meta: {
      title: '场地管理',
      icon: "el-icon-menu",
    },
    children: [{
      path: 'room',
      component: () => import('@/views/room/room-list'),
      name: 'room-list',
      meta: {
        title: '场地',

        noCache: true
      }
    }, {
      path: 'seat',
      component: () => import('@/views/room/room-seat'),
      name: 'room-list',
      meta: {
        title: '座位',

        noCache: true
      }
    }]
  },
  {
    path: '/appoint',
    component: Layout,
    redirect: '/appoint/list',

    meta: {
      title: '预约管理',
      roles: [0],
      icon: "el-icon-menu",
    },
    children: [{
      path: 'list',
      component: () => import('@/views/appoint/appoint-list'),
      name: 'appoint-list',
      meta: {
        title: '预约记录',
        roles: [0],
        noCache: true
      }
    },]
  },
  // {
  //   path: '/score',
  //   component: Layout,
  //   redirect: '/score/list',

  //   meta: {
  //     title: '积分记录',
  //     roles: [0],
  //     icon: "el-icon-menu",
  //   },
  //   children: [{
  //     path: 'list',
  //     component: () => import('@/views/score/score-list'),
  //     name: 'score-list',
  //     meta: {
  //       title: '积分记录',
  //       roles: [0],
  //       noCache: true
  //     }
  //   },]
  // },
  {
    path: '/cover',
    component: Layout,
    redirect: '/cover/list',

    meta: {
      title: '封面管理',
      roles: [0],
      icon: "el-icon-menu",
    },
    children: [{
      path: 'list',
      component: () => import('@/views/cover/cover-list'),
      name: 'cover-list',
      meta: {
        title: '封面',
        roles: [0],
        noCache: true
      }
    },]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/article-type-list',
    meta: {
      icon: "el-icon-menu",
      title: '文章管理',
      roles: [0],
    },
    children: [{
      path: 'article-type-list',
      component: () => import('@/views/article/article-type-list'),
      name: 'article-type-list',
      meta: {
        title: '文章类型',
        roles: [0],
        noCache: true
      }
    },
    {
      path: 'article-list',
      component: () => import('@/views/article/article-list'),
      name: 'article-list',
      meta: {
        title: '文章',
        roles: [0],
        noCache: true
      }
    }

    ]
  },




]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...constantHomeRoutes, ...asyncRoutes]
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
