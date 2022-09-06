<template>
  <div class="jay-3d" id="jay3d">
    <header class="header-3d">
      <div class="music3d-title">
        <h1>3D JayChou Alumb</h1>
      </div>
      <a class="header-item" @click="controlAnimate"
        ><i
          :class="{
            'el-icon-video-pause': !isPause,
            'el-icon-video-play': isPause,
          }"
          >"</i
        >{{ !isPause ? "暂停" : "播放" }}</a
      >
      <a @click="changeTileView" class="header-item"
        ><i class="el-icon-view">"</i>平铺</a
      >
    </header>
    <div id="drag-container">
      <div id="spin-container">
        <!-- Add your images (or video) here -->
        <img
          v-for="(item, index) in albumList"
          :key="index"
          :src="item.pic"
          alt="item.name"
          @click="routeToJayPlayerIn3d(index)"
        />

        <!-- Example add video  -->
        <!-- <video controls autoplay="autoplay" loop>
          <source
            src="https://player.vimeo.com/external/322244668.sd.mp4?s=338c48ac2dfcb1d4c0689968b5baf94eee6ca0c1&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video> -->

        <!-- Text at center of ground -->
        <p>3D JayChou Alumb</p>
      </div>
      <div id="ground"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Music3D",
  data() {
    return {
      isPause: false, //初始为false表示未暂停
      albumList: [],
      jay3dscreen: "",
      radius: 400, // how big of the radius
      autoRotate: true, // auto rotate or not
      rotateSpeed: -170, // unit: seconds/360 degrees
      imgWidth: 120, // width of images (unit: px)
      imgHeight: 170, // height of images (unit: px)

      odrag: "",
      ospin: "",
      aImg: "",
      aVid: "",
      aEle: "",
      ground: "",

      desX: 0,
      desY: 0,
      tX: 0,
      tY: 10,
    };
  },
  mounted() {
    this.initalbumList();
  },
  activated() {
    if (this.isPause) {
      this.controlAnimate();
    }
  },
  deactivated() {
    if (!this.isPause) {
      this.controlAnimate();
    }
  },
  computed: {
    musicMode() {
      const mode = this.$store.state.musicMode;
      return mode;
    },
  },
  methods: {
    routeToJayPlayerIn3d(index) {
      this.$store.commit("setMusicMode", "play");
      this.$store.commit("setCurrentAlbumIndex", index);
      this.$router.push({
        name: "jayplayerpage",
        params: {
          albumInfo: this.albumList[index],
        },
      });
    },
    changeTileView() {
      //跳转页面
      this.$router.replace({ name: "musicpage" }).catch((err) => err);
      this.$store.commit("setMusicMode", "tile");
    },
    controlAnimate() {
      this.playSpin(this.isPause);
      this.isPause = !this.isPause;
      //   console.log(this.autoRotate);
    },
    initalbumList() {
      //   let a = this.$store.state.albumList;
      //   a.forEach((item, index) => {
      //     a[index].pic = require("../assets/music/" + item.name + ".jpg");
      //   });
      //   this.albumList = a;
      this.$http
        .readLocalJSONFile("doc/allalbumInfo.json")
        .then((data) => {
          let temp = data;
          // temp.forEach((item, index) => {
          //   temp[index].pic = require("../assets/music/" + item.name + ".jpg");
          // });
          this.albumList = temp;
        })
        .then(() => {
          this.$nextTick(() => {
            this.initData();
            this.setup();
          });
        });
    },
    applyTranform(obj) {
      // Constrain the angle of camera (between 0 and 180)
      if (this.tY > 180) this.tY = 180;
      if (this.tY < 0) this.tY = 0;

      // Apply the angle
      obj.style.transform =
        "rotateX(" + -this.tY + "deg) rotateY(" + this.tX + "deg)";
    },
    playSpin(yes) {
      //   console.log(this);
      this.ospin.style.animationPlayState = yes ? "running" : "paused";

      //   console.log(this.ospin.style.animationPlayState);
      //   document.getElementById("spin-container").style.animationPlayState = yes
      //     ? "running"
      //     : "paused";
    },
    init(delayTime) {
      for (var i = 0; i < this.aEle.length; i++) {
        this.aEle[i].style.transform =
          "rotateY(" +
          i * (360 / this.aEle.length) +
          "deg) translateZ(" +
          this.radius +
          "px)";
        this.aEle[i].style.transition = "transform 1s";
        this.aEle[i].style.transitionDelay =
          delayTime || (this.aEle.length - i) / 4 + "s";
      }
    },
    initData() {
      this.odrag = document.getElementById("drag-container");
      this.ospin = document.getElementById("spin-container");
      this.aImg = this.ospin.getElementsByTagName("img");
      this.aVid = this.ospin.getElementsByTagName("video");
      this.ground = document.getElementById("ground");
      this.aEle = [...this.aImg, ...this.aVid]; // combine 2 ar
      this.jay3dscreen = document.getElementById("jay3d");
      // ===================== start =======================
      setTimeout(this.init, 100);
      // Size of images
      this.ospin.style.width = this.imgWidth + "px";
      this.ospin.style.height = this.imgHeight + "px";

      // Size of ground - depend on radius
      this.ground.style.width = this.radius * 3 + "px";
      this.ground.style.height = this.radius * 3 + "px";
    },
    setup() {
      // auto spin
      if (this.autoRotate) {
        var animationName = this.rotateSpeed > 0 ? "spin" : "spinRevert";
        this.ospin.style.animation = `${animationName} ${Math.abs(
          this.rotateSpeed
        )}s infinite linear`;
      }
      // setup events
      var that = this;
      document.onpointerdown = function (e) {
        clearInterval(that.odrag.timer);
        e = e || window.event;
        var sX = e.clientX,
          sY = e.clientY;

        this.onpointermove = function (e) {
          e = e || window.event;
          var nX = e.clientX,
            nY = e.clientY;
          that.desX = nX - sX;
          that.desY = nY - sY;
          that.tX += that.desX * 0.1;
          that.tY += that.desY * 0.1;
          that.applyTranform(that.odrag);
          sX = nX;
          sY = nY;
        };
        this.onpointerup = function (e) {
          that.odrag.timer = setInterval(function () {
            that.desX *= 0.95;
            that.desY *= 0.95;
            that.tX += that.desX * 0.1;
            that.tY += that.desY * 0.1;
            that.applyTranform(that.odrag);
            // that.playSpin(false);
            if (Math.abs(that.desX) < 0.5 && Math.abs(that.desY) < 0.5) {
              clearInterval(that.odrag.timer);
              //   that.playSpin(true);
            }
          }, 17);
          this.onpointermove = this.onpointerup = null;
        };

        return false;
      };
      document.onmousewheel = function (e) {
        if (that.musicMode === "3d") {
          e = e || window.event;
          var d = e.wheelDelta / 20 || -e.detail;
          that.radius += d;
          that.init(1);
        }
      };
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.jay-3d {
  height: 100%;
  width: 100%;
  /* for touch screen */
  touch-action: none;
  display: flex;
  flex-direction: column;
}

.jay-3d {
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* background: #111; */
  -webkit-perspective: 1000px;
  perspective: 1000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.header-3d {
  padding-top: 30px;
  color: #9c9c9c;
  /* background-color: #111; */
  display: flex;
}
.header-item {
  cursor: pointer;
  text-decoration: none;
  font-size: 2.3rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 4rem;
}
.music3d-title {
  flex: 1;
  text-align: center;
  padding-left: 21rem;
}

#drag-container,
#spin-container {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: auto;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: rotateX(-10deg);
  transform: rotateX(-10deg);
}

#drag-container img,
#drag-container video {
  cursor: pointer;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 200px;
  font-size: 50px;
  text-align: center;
  -webkit-box-shadow: 0 0 8px #fff;
  box-shadow: 0 0 8px #fff;
  -webkit-box-reflect: below 10px
    linear-gradient(transparent, transparent, #0005);
}

#drag-container img:hover,
#drag-container video:hover {
  -webkit-box-shadow: 0 0 15px #fffd;
  box-shadow: 0 0 15px #fffd;
  -webkit-box-reflect: below 10px
    linear-gradient(transparent, transparent, #0007);
}

#drag-container p {
  font-family: Serif;
  font-size: 3rem;
  position: absolute;
  top: 100%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%) rotateX(90deg);
  transform: translate(-50%, -50%) rotateX(90deg);
  color: #fff;
}

#ground {
  width: 900px;
  height: 900px;
  position: absolute;
  top: 100%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%) rotateX(90deg);
  transform: translate(-50%, -50%) rotateX(90deg);
  background: -webkit-radial-gradient(
    center center,
    farthest-side,
    #9993,
    transparent
  );
}

#music-container {
  position: absolute;
  top: 0;
  left: 0;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }

  to {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}

@keyframes spin {
  from {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }

  to {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}

@-webkit-keyframes spinRevert {
  from {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }

  to {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
}

@keyframes spinRevert {
  from {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }

  to {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
}
</style>