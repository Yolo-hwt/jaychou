<template>
  <div class="jay">
    <div class="jay-header">
      <el-menu
        class="jay-header-menu"
        mode="horizontal"
        background-color="#020202"
        text-color="#bdc3c7"
        active-text-color="#ff80ab"
        default-active="home"
        @select="routeToPage"
      >
        <el-menu-item index="home" class="jay-special-nav">首页</el-menu-item>
        <el-menu-item index="file" class="jay-special-nav"
          >光影漫步</el-menu-item
        >
        <el-menu-item index="music" class="jay-special-nav"
          >华丽乐章</el-menu-item
        >
        <el-menu-item index="jaychou" class="jay-special-nav"
          >JayChou</el-menu-item
        >

        <el-submenu index="5" :show-timeout="150" :hide-timeout="100">
          <template slot="title" class="jay-special-nav">其他</template>
          <el-menu-item index="res" class="jay-special-nav">资源</el-menu-item>
          <el-menu-item index="about" class="jay-special-nav"
            >关于</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>

    <div class="jay-body pseudo-1h" id="my-jay-body">
      <keep-alive :include="cacheList">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      cacheList: ["Music", "Music3D", "File", "JayPlayer", "MoviePlayer"],
      header: {
        fontsize: "30px",
        specialsize: "35px",
      },
    };
  },
  mounted() {
    //headeritem在mounted钩子里才加载
    this.$nextTick(() => {
      this.setJayHeaderHeight(10);
      this.setJayBodyStyle();
      this.setHeaderItemStyle();
      this.routeToPage("home");
    });
  },
  methods: {
    //设置header高度
    setJayHeaderHeight(grade) {
      if (typeof grade !== "number") {
        throw new Error("Error:not a number: grade not the the type 'number'");
      }
      //浏览器视窗高度1/8
      const setHeight = Math.floor(window.innerHeight / grade);
      //存入vuex
      this.$store.commit("setHeaderHeight", setHeight);
      //jquery修改css
      this.$jq(".jay-header").css({
        height: setHeight + "px",
      });
    },
    //设置headerItem相关css
    setHeaderItemStyle() {
      const headerHeight = this.$store.state.headerHeight - 3;
      //nav块高度
      this.$jq(
        ".el-menu.jay-header-menu.el-menu--horizontal > .el-menu-item"
      ).css({
        height: headerHeight + "px",
        "line-height": headerHeight + "px",
      });
      //复选框nav
      this.$jq(
        ".el-menu.jay-header-menu.el-menu--horizontal > .el-submenu .el-submenu__title"
      ).css({
        height: headerHeight + "px",
        "line-height": headerHeight + "px",
      });
      //字体
      this.$jq(".jay-header-menu .el-menu-item").css({
        "font-size": this.header.fontsize,
      });
      this.$jq(".jay-header-menu .el-menu-item.jay-special-nav").css({
        "font-size": this.header.specialsize,
      });
      this.$jq(".jay-header-menu .el-submenu .el-submenu__title").css({
        "font-size": this.header.specialsize,
        "font-family": "FZZJ-JHTJW",
      });
      this.$jq(".el-menu--horizontal .el-menu .el-menu-item").css({
        "font-size": this.header.fontsize,
        "text-align": "center",
      });
    },
    //设置body高度
    setJayBodyStyle() {
      const headerheight = this.$store.state.headerHeight;
      const setHeight = Math.floor(window.innerHeight - headerheight);
      const topValue = headerheight;
      // console.log(window.innerHeight);
      this.$jq(".jay-body").css({
        height: setHeight + "px",
        top: topValue + "px",
      });
      //存入vuex
      this.$store.commit("setContainerHeight", setHeight);
    },

    //路由跳转指定页面
    routeToPage(index) {
      if (index === "music") {
        const mode = this.$store.state.musicMode;
        if (mode === "3d") {
          index = "music3d";
        } else if (mode === "play") {
          index = "jayplayer";
        }
      }
      if (index === "file") {
        const filemode = this.$store.state.fileMode;
        if (filemode === "play") {
          index = "movie";
        }
      }
      const targetRoute = index + "page";
      //跳转页面
      this.$router.replace({ name: targetRoute }).catch((err) => err);
    },
  },
};
</script>

<style>
.jay-special-nav {
  font-family: "FZZJ-JHTJW";
  /* font-family: "my-font2"; */
}
.el-menu.el-menu--horizontal.jay-header-menu {
  border-bottom: none;
}
.jay-header {
  width: 100%;
  position: fixed;
  box-sizing: content-box;
  display: flex;
  justify-content: center;
}
.jay-header-menu {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

.jay {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.jay-body {
  position: fixed;
  width: 100%;
  overflow: auto;
  /*jay-body距离顶部的距离*/
  box-sizing: content-box;
  /* border: 1px solid green; */
  display: flex;
  justify-content: center;

  /* filter: blur(1px); */
  /* z-index: -100; */
}
.pseudo-1h::after {
  width: 100%;
  height: 100%;
  content: "";
  position: absolute;
  top: 0;
  left: 0;

  background: url("../assets/bg2.jpg") repeat;
  /* z-index: 1; */
  z-index: -1;
}
.pseudo-3h::after {
  width: 100%;
  height: 380%;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/bg2.jpg") repeat;
  /* z-index: 1; */
  z-index: -1;
}
.pseudo-4h::after {
  width: 100%;
  height: 480%;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/bg2.jpg") repeat;
  /* z-index: 1; */
  z-index: -1;
}
.pseudo-16h::after {
  width: 100%;
  height: 3660%;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/bg2.jpg") repeat;
  /* z-index: 1; */
  z-index: -1;
}
/* 滚动条设置 */
.jay-body::-webkit-scrollbar {
  width: 10px;
  /* border: 1px solid lightgray; */
}
.jay-body::-webkit-scrollbar-button {
  display: none;
}
.jay-body::-webkit-scrollbar-thumb {
  /* background: #03a9f4; */
  background: #4c3116;
  /* border-radius: 10px; */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
.jay-body::-webkit-scrollbar-track {
  background: #857760;
  /* border-radius: 10px; */
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
}
/* .jay-body-container {
  border: 1px solid red;
} */
</style>