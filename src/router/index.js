import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageView from '../views/PageView.vue'
import NewPage from '../views/NewPage.vue'
import UserCenterView from '../views/UserCenterView.vue'
import UserInfoView from '../views/UserInfoView.vue'
import DraftView from '../views/DraftView.vue'
import LikeView from '../views/LikeView.vue'
import MyPageView from '../views/MyPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/page/:id',
      name: 'page',
      component: PageView,
      props: true
    },
    {
      path: '/new',
      name: 'new',
      component: NewPage,
    },
    {
      path: '/user',
      name: 'user',
      component: UserCenterView,
    },
    {
      path: '/setting',
      name: 'setting',
      component: UserInfoView,
    },
    {
      path: '/draft',
      name: 'draft',
      component: DraftView,
    },
    {
      path: '/like',
      name: 'like',
      component: LikeView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPageView,
    },
    
  ],
})

export default router
