import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export default [
  // 服务协议内容
  {
    path: "/serviceAgreement",
    name: "serviceAgreement",
    meta: {
      hideInMenu: true,
<<<<<<< HEAD
      title: "展示协议",
=======
      title: "展示文章",
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
      annoymous: true
    },
    component: () => import("@/view/service-agreement/serviceHtml.vue")
  },
  // 文章的显示页面
  {
    path: "/articleHtml",
    name: "articleHtml",
    meta: {
      hideInMenu: true,
      title: "展示文章",
      annoymous: true
    },
    component: () => import("@/view/article-manager/article-html/articleHtml.vue")
  },
<<<<<<< HEAD
=======

>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },


  // 系统管理
  {
    path: '/system',
    name: 'system_manager',
    meta: {
      icon: 'logo-buffer',
      title: '系统管理'
    },
    component: Main,
    children: [
      {
        path: 'admin-manager',
        name: 'admin-manager',
        meta: {
          icon: 'md-person',
          title: '管理员配置'
        },
        component: () => import('@/view/system/admin-manager/admin-manager.vue')
      },
      {
        path: 'person-manager',
        name: 'person-manager',
        meta: {
          icon: 'ios-people',
          title: '角色管理'
        },
        component: () => import('@/view/system/person-manager/person-manager.vue')
      },
      {
        path: 'permission-manager',
        name: 'permission-manager',
        meta: {
          icon: 'ios-key',
          title: '权限管理'
        },
        component: () => import('@/view/system/permission-manager/permission-manager.vue')
      },
      {
        path: '/dictionary-setting',
        name: 'dictionary-setting',
        meta: {
          icon: 'ios-book',
          title: '字典配置'
        },
        component: () => import('@/view/system/dictionary-setting/dictionary-setting.vue'),
      },
      {
        path: '/dictionary-setting/detail',
        name: 'ditItem-list',
        meta: {
          hideInMenu: true,
          title: "字典列表"
        },
        component: () => import('@/view/system/dictionary-setting/dicItem-list.vue'),
      },
      {
        path: 'inform_manager',
        name: 'inform_manager',
        meta: {
          icon: 'md-notifications',
          title: '通知管理'
        },
        component: () => import('@/view/system/inform-manager/inform-manager.vue')
      },
      {
        path: 'notice_manager',
        name: 'notice_manager',
        meta: {
          icon: 'ios-text',
          title: '内容管理'
        },
        component: () => import('@/view/system/notice-manager/notice-manager.vue')
      },
    ]
  },
  // 信用卡管理页面
  {
    path: '/credit',
    name: 'credit-managers',
    meta: {
      icon: 'ios-card',
      title: '业务管理'
    },
    component: Main,
    children: [
      {
        path: '/bank-manager',
        name: 'bank-manager',
        meta: {
          icon: 'md-home',
          title: '信用卡银行管理'
        },
        component: () => import('@/view/credit-manager/bank-manager/bank-manager.vue')
      },
      {
        path: '/credit-manage',
        name: 'credit-manager',
        meta: {
          icon: 'md-card',
          title: '信用卡管理'
        },
        component: () => import('@/view/credit-manager/credit-manager/credit-manager.vue')
      },
      {
        path: '/banner-manage',
        name: 'banner-manager',
        meta: {
          icon: 'ios-card',
          title: 'Banner管理'
        },
        component: () => import('@/view/credit-manager/banner-manager/banner-manager.vue')
      },
      {
        path: '/loans-manage',
        name: 'loans-manager',
        meta: {
          icon: 'ios-card',
          title: '贷款管理'
        },
        component: () => import('@/view/credit-manager/loans-manager/loans-manager.vue')
      },
    ]
  },
<<<<<<< HEAD
  // 文章管理
  {
    path: "/article-manager",
    name: "article-manager",
    meta: {
      icon: "ios-text",
      title: "文章管理"
    },
    component: Main,
    children: [
      {
        path: "/article-list-manager",
        name: "article-list-manager",
        meta: {
          icon: "ios-text",
          title: "管理文章列表"
        },
        component: () => import("@/view/article-manager/article-manager/article-manager.vue")
      },
      {
        path: "/comment-manager",
        name: "comment-manager",
        meta: {
          icon: "ios-text",
          title: "评论管理"
        },
        component: () => import('@/view/user-manager/approve-manager/approve-manager.vue')
      },
    ]
  },
=======
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
  // 用户管理
  {
    path: "/user-manager",
    name: "user-manager",
    meta: {
      title: "用户管理",
      icon: "ios-contacts"
    },
    component: Main,
    children: [
      {
        path: "/users-manager",
        name: "users-manager",
        meta: {
          icon: "ios-text",
          title: "用户管理"
        },
        component: () => import('@/view/user-manager/user-manager/user-manager.vue')
      },
      {
        path: "/approve-manager",
        name: "approve-manager",
        meta: {
          icon: "ios-text",
          title: "认证管理",
          hideInMenu: true
        },
        component: () => import('@/view/user-manager/approve-manager/approve-manager.vue')
      }
    ]
  },

  // 个人配置
  {
    path: '/setting',
    name: 'personal_setting',
    meta: {
      icon: 'ios-construct',
      title: '个人配置'
    },
    component: Main,
    children: [
      {
        path: 'person-info',
        name: 'person-info',
        meta: {
          icon: 'md-contact',
          title: '个人信息'
        },
        component: () => import('@/view/personal-setting/person-info/person-info.vue')
      },
      {
        path: 'safe-config',
        name: 'safe-config',
        meta: {
          icon: 'md-finger-print',
          title: '安全配置'
        },
        component: () => import('@/view/personal-setting/safe-config/safe-config.vue')
      },
      {
        path: 'system-notice',
        name: 'system_notice',
        meta: {
          icon: 'md-notifications',
          title: '系统通知'
        },
        component: () => import('@/view/personal-setting/system-notice/system-notice.vue')
      },
    ]
  },
<<<<<<< HEAD



=======
  // 文章管理
  {
    path: "/article-manager",
    name: "article-manager",
    meta: {
      icon: "ios-text",
      title: "文章管理"
    },
    component: Main,
    children: [
      {
        path: "/article-list-manager",
        name: "article-list-manager",
        meta: {
          icon: "ios-text",
          title: "管理文章列表"
        },
        component: () => import("@/view/article-manager/article-manager/article-manager.vue")
      },
      {
        path: "/comment-manager",
        name: "comment-manager",
        meta: {
          icon: "ios-text",
          title: "评论管理"
        },
        component: () => import('@/view/user-manager/approve-manager/approve-manager.vue')
      },
    ]
  },
>>>>>>> e8eef14b75c47ba4b29c26676ee5ca0615acb081
  // home页面
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // 
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `动态路由-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `带参路由-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  // 
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
]
/*
*
*
*   {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    children: [
      {
        path: 'join_page',
        name: 'join_page',
        meta: {
          icon: '_qq',
          title: 'QQ群'
        },
        component: () => import('@/view/join-page.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hide: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hide: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }, 
    ]
  },
* */
/* 
*/
/**
 *
 *  */