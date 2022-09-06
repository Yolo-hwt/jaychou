// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
// const About = () => import('../pages/About')
// const File = () => import('../pages/File')
// const Home = () => import('../pages/Home')
// const JayChou = () => import('../pages/JayChou')
// const Music = () => import('../pages/Music')
// const Music3D = () => import('../pages/Music3D')
// const Res = () => import('../pages/Res')
// const JayPlayer = () => import('../pages/JayPlayer')
// const List = () => import('../pages/jaypPayerView/List')
// const Desc = () => import('../pages/jaypPayerView/Desc')
// const Award = () => import('../pages/jaypPayerView/Award')
import About from '../pages/About'
import File from '../pages/File'
import Home from '../pages/Home'
import JayChou from '../pages/JayChou'
import Music from '../pages/Music'
import Music3D from '../pages/Music3D'
import Res from '../pages/Res'
import JayPlayer from '../pages/JayPlayer'
import List from '../pages/jaypPayerView/List'
import Desc from '../pages/jaypPayerView/Desc'
import Award from '../pages/jaypPayerView/Award'
import MoviePlayer from '../components/MoviePlayer'
//创建并暴露一个路由器
const router = new VueRouter({
    routes: [
        {
            name: 'aboutpage',
            path: '/about',
            component: About,
            meta: { title: '关于' },

        },
        {
            name: 'filepage',
            path: '/file',
            component: File,
            meta: { title: '光影漫步' },
        },
        {
            name: 'moviepage',
            path: '/movie',
            component: MoviePlayer,
            meta: { title: '影视资源' },
        },
        {
            name: 'homepage',
            path: '/home',
            component: Home,
            meta: { title: '主页' },
        },
        {
            name: 'jaychoupage',
            path: '/jaychou',
            component: JayChou,
            meta: { title: '周杰伦' },
        },
        {
            name: 'musicpage',
            path: '/music',
            component: Music,
            meta: { title: '华丽乐章' },
        },
        {
            name: 'music3dpage',
            path: '/music3d',
            component: Music3D,
            meta: { title: '华丽乐章3d' },
        },
        {
            name: 'jayplayerpage',
            path: '/jayplayer',
            component: JayPlayer,
            meta: { title: 'jay播放器' },
            children: [

                {
                    name: 'listview',
                    path: 'list',
                    component: List,
                    meta: { title: '音乐列表' },
                },
                {
                    name: 'descview',
                    path: 'desc',
                    component: Desc,
                    meta: { title: '专辑描述' },
                },
                {

                    name: 'awardview',
                    path: 'award',
                    component: Award,
                    meta: { title: '获奖一览' },

                }
            ]
        },
        {
            name: 'respage',
            path: '/res',
            component: Res,
            meta: { title: '资源' },
        }
    ]
})

export default router