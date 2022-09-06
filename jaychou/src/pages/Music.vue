<template>
  <div class="jay-music">
    <header class="header">
      <div class="music-title">
        <h1>Incomparable JayChou</h1>
      </div>
      <a @click="change3dView"><i class="el-icon-view">"</i>3D</a>
      <!-- <img :src="logoImg_3d" alt="3d" /> -->
    </header>

    <div class="wrapper">
      <div class="cols jay-music-cols">
        <div
          class="col"
          ontouchstart="this.classList.toggle('hover');"
          v-for="(item, index) in albumList"
          :key="index"
        >
          <div class="container" @click="routeToJayPlayer(index)">
            <div
              class="front"
              :style="{
                'background-image': 'url(' + item.pic + ')',
              }"
            >
              <!-- :style="{ 'background-image': 'url(' + item.pic + ')' }" -->
              <div class="inner">
                <p>{{ item.name }}</p>
                <span>{{ $convert.timestampToDate(item.publishTime) }}</span>
              </div>
            </div>
            <div class="back">
              <div class="inner">
                <p>
                  {{ item.sketch }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <h1>免责声明</h1>
      <p>
        本网站所用资源均用于个人娱乐与学习，不涉及任何商业目的，禁止任何个人或组织使用本站换取不正当利益
      </p>
      <p>
        The resources used in this website are for personal entertainment and
        learning, not involving any commercial purposes, prohibit any individual
        or organization to use this site for improper benefits
      </p>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "Music",
  data() {
    return {
      albumList: [],
    };
  },
  beforeMount() {
    this.initalbumList();
  },
  beforeRouteEnter(to, from, next) {
    document.getElementById("my-jay-body").scrollTop = 0;
    $(".jay-body").removeClass("pseudo-1h").addClass("pseudo-3h");
    document.get;
    next();
  },
  beforeRouteLeave(to, from, next) {
    document.getElementById("my-jay-body").scrollTop = 0;
    $(".jay-body").removeClass("pseudo-3h").addClass("pseudo-1h");
    next();
  },
  methods: {
    // //生成本地图片require
    // generateImgRequire(imgname) {
    //   return require("../assets/music/" + imgname + ".jpg");
    // },
    //初始化专辑列表
    initalbumList() {
      this.$http.readLocalJSONFile("doc/allalbumInfo.json").then((data) => {
        this.albumList = data;
        this.$store.commit("setAlbumList", data);
        // data.forEach((item,index) => {

        // });
      });
    },
    //切换3d视图
    change3dView() {
      //跳转页面
      this.$router.replace({ name: "music3dpage" }).catch((err) => err);
      this.$store.commit("setMusicMode", "3d");
    },
    routeToJayPlayer(index) {
      this.$store.commit("setMusicMode", "play");
      this.$store.commit("setCurrentAlbumIndex", index);
      this.$router.push({
        name: "jayplayerpage",
        params: {
          albumInfo: this.albumList[index],
        },
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.jay-music {
  width: 100%;
}
.header {
  display: flex;
  justify-items: center;
  text-align: center;
  color: #9c9c9c;
  padding: 30px 40px;
  /* background-color: #111; */
}
.music-title {
  flex: 1;
  padding-left: 12rem;
}
.header > a {
  cursor: pointer;
  padding-right: 12rem;
  width: 10rem;
  display: flex;

  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 2.7rem;
  font-weight: 700;
}
.footer {
  text-align: center;
  color: #9c9c9c;
  padding-top: 50px;
  padding-bottom: 70px;
  /* background-color: #111; */
}
.footer h1 {
  margin-bottom: 15px;
}
.wrapper {
  /* width: 90%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 60px;
}

.cols {
  width: 75%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: space-around;
}
.col {
  width: calc(23%);
  margin: 3rem 2rem;
  cursor: pointer;
}

.container {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-perspective: 1000px;
  perspective: 1000px;
}

.front,
.back {
  background-size: cover;
  background-position: center;
  -webkit-transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1),
    -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  text-align: center;
  min-height: 355px;
  height: auto;
  border-radius: 10px;
  color: #fff;
  font-size: 1.5rem;
}

.back {
  background: #cedce7;
  background: -webkit-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background: -o-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background: linear-gradient(45deg, #cedce7 0%, #596a72 100%);
}

.front:after {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  content: "";
  display: block;
  opacity: 0.2;
  background-color: #000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 10px;
}
.container:hover .front,
.container:hover .back {
  -webkit-transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1),
    -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  letter-spacing: 1pt;
  font-size: 13pt;
  font-weight: 400;
}

.inner {
  -webkit-transform: translateY(-50%) translateZ(60px) scale(0.94);
  transform: translateY(-50%) translateZ(60px) scale(0.94);
  top: 50%;
  position: absolute;
  left: 0;
  width: 100%;
  padding: 2rem;
  font-size: 1.1em;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 1px solid transparent;
  -webkit-perspective: inherit;
  perspective: inherit;
  z-index: 2;
}

.container .back {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container .front {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container:hover .back {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container:hover .front {
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.front .inner p {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  position: relative;
  letter-spacing: 2pt;
}

.front .inner p:after {
  content: "";
  width: 4rem;
  height: 2px;
  position: absolute;
  background: #c6d4df;
  display: block;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -0.75rem;
}

.front .inner span {
  /* color: rgba(255, 255, 255, 0.7); */
  color: white;
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 1.6rem;
}

@media screen and (max-width: 64rem) {
  .col {
    width: calc(33.333333% - 2rem);
  }
}

@media screen and (max-width: 48rem) {
  .col {
    width: calc(50% - 2rem);
  }
}

@media screen and (max-width: 32rem) {
  .col {
    width: 100%;
    margin: 0 0 2rem 0;
  }
}
</style>