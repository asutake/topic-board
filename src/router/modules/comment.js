import Layout from '@/layout'

const commentRouter = {
  path: '/comment',
  component: Layout,
  redirect: '/comment/list',
  name: 'Comment',
  meta: {
    title: 'コメント',
    icon: 'el-icon-s-help'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/comment/list'),
      name: 'CommentList',
      meta: { title: '一覧', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/comment/create'),
      name: 'CommentCreate',
      meta: { title: '新規作成', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/comment/edit'),
      name: 'CommentEdit',
      meta: { title: '編集', noCache: true, activeMenu: '/comment/edit' },
      hidden: true
    },
    {
      path: 'detail/:id(\\d+)',
      component: () => import('@/views/comment/detail'),
      name: 'CommentDetail',
      meta: { title: '詳細', noCache: true, activeMenu: '/comment/detail' },
      hidden: true
    }
  ]
}

export default commentRouter
