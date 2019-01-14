import Layout from '@/views/layout/Layout'

const usersRouter = {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    name: 'Users',
    meta: {
        title: 'Users',
        icon: 'table'
    },
    children: [
        {
            path: 'index',
            component: () => import('@/views/users/index'),
            name: 'UsersDemo',
            meta: { title: 'UsersDemo' }
        }
    ]
}

export default usersRouter;