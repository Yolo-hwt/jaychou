//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions——用于响应组件中的动作
const actions = {
    HeaderHeight(context, value) {
        context.commit('setHeaderHeight', value)
    },
    ContainerHeight(context, value) {
        context.commit('setContainerHeight', value)
    },
    AlbumList(context, value) {
        context.commit('setAlbumList', value)
    },
    MusicMode(context, value) {
        context.commit('setMusicMode', value)
    },
    CurrentAlbumIndex(context, value) {
        context.commit('setCurrentAlbumIndex', value)
    },
    CurrentMusic(context, value) {
        context.commit('setCurrentMusic', value)
    },
    PlayAllSongs(context, value) {
        context.commit('setPlayAllSongs', value)
    }
}
//准备mutations——用于操作数据（state）
const mutations = {
    setHeaderHeight(state, value) {
        state.headerHeight = value
    },
    setContainerHeight(state, value) {
        state.containerHeight = value
    },
    setAlbumList(state, value) {
        state.albumList = value
    },
    setMusicMode(state, value) {
        state.musicMode = value
    },
    setCurrentAlbumIndex(state, value) {
        state.currentAlbumIndex = value
    },
    setCurrentMusic(state, value) {
        state.currentMusic = value
    },
    setPlayAllSongs(state, value) {
        state.playAllSongs = value
    },
    setFileMode(state, value) {
        state.fileMode = value
    }
}
//准备state——用于存储数据
const state = {
    headerHeight: 0,//导航条高度
    containerHeight: 0,//内容区域高度
    albumList: [],//专辑列表
    musicMode: "tile",//乐章模式（tile or 3d or play）
    fileMode: "desc",//影视模式（desc or play）
    currentAlbumIndex: 0,//当前player的专辑序号
    currentMusic: {
        index: 0,
        id: 186145,
        name: "可爱女人",
        pic: "https://p2.music.126.net/Gd-HAk9hKC85L0wNtfRs1g==/7946170535396804.jpg"
    },
    playAllSongs: false,
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
})