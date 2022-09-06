<template>
  <div class="jay-player">
    <a class="el-icon-back jay-player-back" @click="backToMusic"></a>
    <div class="player-main">
      <div class="main-left">
        <div class="left-wapper">
          <img :src="albumInfo !== {} ? albumInfo.pic : '#'" alt="" />
          <span>{{ albumInfo !== {} ? albumInfo.name : "#" }}</span>
        </div>
      </div>
      <div class="main-middle">
        <h2>专辑名称</h2>
        <p>{{ albumInfo !== {} ? albumInfo.name : "#" }}</p>

        <h2>歌曲数量</h2>
        <p>{{ albumInfo !== {} ? albumInfo.size : "#" }}</p>

        <h2>发行时间</h2>
        <p>
          {{
            albumInfo !== {}
              ? $convert.timestampToDate(albumInfo.publishTime)
              : "#"
          }}
        </p>
        <hr />
        <p class="middle-skatch">
          {{ albumInfo !== {} ? albumInfo.sketch : "#" }}
        </p>
      </div>
      <div class="main-right">
        <div class="right-nav">
          <el-menu
            class="jay-player-menu"
            mode="horizontal"
            background-color="#020202"
            text-color="#bdc3c7"
            active-text-color="#ff80ab"
            default-active="list"
            @select="routeToView"
          >
            <el-menu-item index="list"
              ><i class="bi bi-music-note-list nav-item"></i
            ></el-menu-item>
            <el-menu-item index="desc"
              ><i class="bi bi-file-text nav-item"></i
            ></el-menu-item>
            <el-menu-item index="award"
              ><i class="bi bi-award-fill nav-item"></i
            ></el-menu-item>
          </el-menu>
        </div>
        <div class="right-container">
          <keep-alive :include="playercacheList">
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>

    <div class="player-item">
      <!-- <keep-alive>
        <MyPlayer></MyPlayer>
      </keep-alive> -->
    </div>
  </div>
</template>

<script>
import MyPlayer from "../components/MyPlayer.vue";
export default {
  name: "JayPlayer",
  components: {
    MyPlayer,
  },
  data() {
    return {
      playercacheList: ["List", "Desc", "Award"],
      albumInfo: {},
      musicObjForPlayer: {},
      isShowDetail: false,
    };
  },
  // beforeMount() {

  //   // console.log(this.albumInfo);
  // },
  // beforeMount() {
  //   this.$bus.$emit("setRouteToJayPlayer", true);
  //   this.getDataBeforeActived();
  //   this.$nextTick(() => {
  //     this.routeToView("list");
  //   });
  // },

  beforeRouteLeave(to, from, next) {
    // console.log("to", to);
    // console.log("from", from);
    const toPlace = to.name;
    let mode = "";
    switch (toPlace) {
      case "musicpage": {
        mode = "tilt";
        break;
      }
      case "music3dpage": {
        mode = "3d";
        break;
      }
      default: {
        mode = "play";
      }
    }
    this.$store.commit("setMusicMode", mode);
    next();
  },
  activated() {
    this.getDataBeforeActived();
    setTimeout(() => {
      this.$bus.$emit("setRouteToJayPlayer", true);
      this.routeToView("list");
    }, 10);
  },
  deactivated() {
    this.$bus.$emit("setRouteToJayPlayer", false);
  },
  mounted() {
    this.setRightNavStyle();
  },

  methods: {
    hideAlbumDetail() {
      this.isShowDetail = false;
    },
    showAlbumDetail() {
      this.isShowDetail = true;
    },
    setRightNavStyle() {
      this.$jq(".el-menu.el-menu--horizontal").css({
        "border-bottom": "none",
      });
      this.$jq(".jay-player-menu .el-menu-item").css({
        "font-size": "20px",
      });
    },
    getDataBeforeActived() {
      const data = this.$route.params.albumInfo;

      const flag = data === "undefined" || data === undefined ? false : true;
      // console.log("flag", data, flag);
      //预读取vuex数据
      const index = this.$store.state.currentAlbumIndex;
      const storeData = this.$store.state.albumList[index];
      if (flag) {
        //若存在路由数据
        this.albumInfo = data;
        //vuex路由状态更替
        let songobj = this.albumInfo.songs[0];
        songobj.index = 0;
        this.$store.commit("setCurrentMusic", songobj);
      } else {
        //否则使用vuex数据
        const index = this.$store.state.currentAlbumIndex;
        const storeData = this.$store.state.albumList[index];
        this.albumInfo = storeData;
      }
    },
    routeToView(index) {
      const targetRoute = index + "view";
      let viewparam = {};
      switch (index) {
        case "desc": {
          viewparam = this.albumInfo.desc;
          break;
        }
        case "list": {
          viewparam.songs = this.albumInfo.songs;
          viewparam.albumname = this.albumInfo.name;
          break;
        }
        case "award": {
          viewparam = this.albumInfo.award;
          break;
        }
        default: {
          viewparam = "";
        }
      }
      //跳转页面
      this.$router
        .replace({
          name: targetRoute,
          params: {
            data: viewparam,
          },
        })
        .catch((err) => err);
    },
    backToMusic() {
      // const musicmode = this.$store.state.musicmode;
      // let index = "";
      // switch (musicmode) {
      //   case "tile": {
      //     index = "musicpage";
      //     break;
      //   }
      //   case "3d": {
      //     index = "music3dpage";
      //     break;
      //   }
      // }
      //   this.$router
      //     .replace({
      //       name: index,
      //     })
      //     .catch((err) => console.log(err));
      this.$router.back();
    },
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css");
.jay-player {
  display: flex;
  width: 100%;
  /* flex-direction: column; */
  height: 540px;
  justify-content: center;
}
.jay-player-back {
  color: white;
  float: left;
  left: 1%;
  position: fixed;
  font-size: 4rem;
  cursor: pointer;
}
.jay-player-back:hover {
  color: skyblue;
}
.player-main {
  /* border: 1px solid green; */
  display: flex;
  justify-content: center;
  padding-top: 40px;
  box-sizing: border-box;
}
.main-left {
  width: 390px;
  margin: 2rem;
  position: relative;
  /* background: linear-gradient(45deg, #a6b1ba 0%, #5d6a6f 100%); */
  border-radius: 10px;
}
.left-wapper {
  /* border: 1px solid teal; */
  width: 83%;
  height: 80%;
  position: absolute;
  left: calc(17% / 2);

  box-shadow: 0 0 10px #fff;
}
.left-wapper img {
  height: 100%;
  width: 100%;
}
.left-wapper span {
  font-family: "FZZJ-JHTJW";
  font-size: 4rem;
  text-align: center;
  position: absolute;
  top: 103%;
  width: 100%;
  left: 0;
  color: #ff80ab;
}
.main-middle {
  width: 400px;
  margin: 2rem 0rem;
  margin-right: 4rem;
  position: relative;
  /* padding: 3rem; */
  color: #dcdde1;
  z-index: 2;
  /* background: linear-gradient(45deg, #cedce7 0%, #596a72 100%); */
  border-radius: 10px;
  /* transition: all 2s; */
}
/* .main-middle::after {
  content: "";
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #a6b1ba 0%, #5d6a6f 100%);
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.9;
  z-index: -1;
} */
.main-middle h2 {
  margin-top: 1.5rem;
  /* text-shadow: 5px 5px 5px gray; */
  z-index: 2;
}
.main-middle p {
  font-size: 1.9rem;
  line-height: 3rem;
  z-index: 2;
}
.main-middle .middle-skatch {
  margin-top: 3rem;
  text-indent: 4rem;
  z-index: 2;
}
.main-right {
  /* flex: 2 1 auto; */
  box-shadow: 1px 1px 80px white;
  /* border: 4px solid #020202; */
  border-radius: 15px;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  height: 640px;
  align-items: center;
}
.right-nav {
  font-size: 2.8rem;
  display: flex;
  justify-content: space-around;
  width: 180px;
  height: 55px;
}
.jay-player-menu {
  display: flex;
  width: 100%;
  justify-content: left;
}

.right-container {
  flex: 1;
  width: 770px;
  /* height: 350px; */
  overflow-y: auto;
  box-sizing: border-box;
  /* padding: 20px; */
}
/* .player-item {
  width: 48%;
  display: flex;
  position: absolute;
  bottom: 4%;
  left: 2%;
  z-index: 10;
} */
/* 滚动条设置 */
.right-container::-webkit-scrollbar {
  width: 10px;
  /* border: 1px solid lightgray; */
}
.right-container::-webkit-scrollbar-button {
  display: none;
}
.right-container::-webkit-scrollbar-thumb {
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
.right-container::-webkit-scrollbar-track {
  background: #857760;
  /* border-radius: 10px; */
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
}
</style>