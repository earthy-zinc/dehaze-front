import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },

  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
        // https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        meta: {
          title: "dashboard",
          icon: "homepage",
          hidden: true,
          affix: true,
          keepAlive: true,
          alwaysShow: false,
        },
      },
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        meta: { hidden: true },
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        meta: { hidden: true },
      },
    ],
  },
  {
    path: "/dataset",
    component: Layout,
    redirect: "/dataset/index",
    meta: {},
    children: [
      {
        path: "index",
        component: () => import("@/views/dataset/DatasetList.vue"),
        meta: {
          title: "数据集",
          icon: "dataset",
          keepAlive: true,
        },
      },
      {
        path: ":id",
        component: () => import("@/views/dataset/DataItem.vue"),
        meta: {
          title: "数据集展示",
          icon: "dataset",
          hidden: true,
        },
      },
    ],
  },
  {
    path: "/algorithm",
    component: Layout,
    redirect: "/algorithm/index",
    meta: {},
    children: [
      {
        path: "index",
        component: () => import("@/views/algorithm/index.vue"),
        meta: {
          title: "模型管理",
          icon: "model",
          keepAlive: true,
        },
      },
    ],
  },
  // {
  //   path: "/external-link",
  //   component: Layout,
  //   children: [
  //     {
  //       component: () => import("@/components/AppLink/index.vue"),
  //       path: "http://localhost:8080",
  //       meta: {
  //         title: "模型训练",
  //         icon: "training",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/presentation",
    component: Layout,
    redirect: "/presentation/dehaze",
    meta: {
      title: "算法展示",
      icon: "presentation",
    },
    children: [
      {
        path: "dehaze",
        component: () => import("@/views/presentation/dehaze/index.vue"),
        meta: {
          title: "图像去雾",
          icon: "haze",
          keepAlive: true,
        },
      },
      // {
      //   path: "segmentation",
      //   component: () => import("@/views/presentation/segmentation/index.vue"),
      //   meta: {
      //     title: "图像分割",
      //     icon: "segmentation",
      //     keepAlive: true,
      //   },
      // },
    ],
  },
  {
    path: "/evaluation",
    component: Layout,
    redirect: "/evaluation/index",
    meta: {
      title: "算法评测",
      icon: "evaluation",
      hidden: true,
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/evaluation/index.vue"),
        meta: {
          title: "算法评测",
          icon: "evaluation",
          keepAlive: true,
        },
      },
    ],
  },
  // {
  //   path: "/compare",
  //   component: Layout,
  //   redirect: "/compare/overlap",
  //   meta: {
  //     title: "算法比较",
  //     icon: "compare",
  //   },
  //   children: [
  //     {
  //       path: "overlap",
  //       component: () => import("@/views/compare/overlap/index.vue"),
  //       meta: {
  //         title: "重叠对比",
  //         icon: "overlap",
  //         keepAlive: true,
  //       },
  //     },
  //     {
  //       path: "parallel",
  //       component: () => import("@/views/compare/parallel/index.vue"),
  //       meta: {
  //         title: "并排比较",
  //         icon: "parallel",
  //         keepAlive: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/curd",
  //   component: Layout,
  //   meta: {
  //     alwaysShow: false,
  //   },
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/demo/curd/index.vue"),
  //       meta: {
  //         title: "增删改查",
  //       },
  //     },
  //   ],
  // },
  // 外部链接
  // {
  //   path: "/external-link",
  //   component: Layout,
  //   children: [ {
  //       component: () => import("@/views/external-link/index.vue"),
  //       path: "https://www.cnblogs.com/haoxianrui/",
  //       meta: { title: "外部链接", icon: "link" },
  //     },
  //   ],
  // },
  // 多级嵌套路由
  /* {
         path: '/nested',
         component: Layout,
         redirect: '/nested/level1/level2',
         name: 'Nested',
         meta: {title: '多级菜单', icon: 'nested'},
         children: [
             {
                 path: 'level1',
                 component: () => import('@/views/nested/level1/index.vue'),
                 name: 'Level1',
                 meta: {title: '菜单一级'},
                 redirect: '/nested/level1/level2',
                 children: [
                     {
                         path: 'level2',
                         component: () => import('@/views/nested/level1/level2/index.vue'),
                         name: 'Level2',
                         meta: {title: '菜单二级'},
                         redirect: '/nested/level1/level2/level3',
                         children: [
                             {
                                 path: 'level3-1',
                                 component: () => import('@/views/nested/level1/level2/level3/index1.vue'),
                                 name: 'Level3-1',
                                 meta: {title: '菜单三级-1'}
                             },
                             {
                                 path: 'level3-2',
                                 component: () => import('@/views/nested/level1/level2/level3/index2.vue'),
                                 name: 'Level3-2',
                                 meta: {title: '菜单三级-2'}
                             }
                         ]
                     }
                 ]
             },
         ]
     }*/
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;
