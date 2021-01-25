import Layout from '@/layout'

const topicRouter = {
  path: '/topic',
  component: Layout,
  redirect: '/topic/list',
  name: 'Topic',
  meta: {
    title: 'トピック',
    icon: 'nested'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/topic/list'),
      name: 'TopicList',
      meta: { title: '一覧', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/topic/create'),
      name: 'TopicCreate',
      meta: { title: '新規作成', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/topic/edit'),
      name: 'TopicEdit',
      meta: { title: '編集', noCache: true, activeMenu: '/topic/edit' },
      hidden: true
    },
    {
      path: 'detail/:id(\\d+)',
      component: () => import('@/views/topic/detail'),
      name: 'TopicDetail',
      meta: { title: '詳細', noCache: true, activeMenu: '/topic/detail' },
      hidden: true
    }
  ]
}

export default topicRouter
