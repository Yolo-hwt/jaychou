<template>
  <div>
    <div class="cover-wrap">
      <img class="cover" src="../assets/范特西.jpg" id="player-img" />
      <audio
        :src="currentCDMusic.src"
        :autoplay="false"
        id="cdplayer-audio"
        @ended="changeMusic"
      ></audio>
    </div>
    <div
      class="cover-control"
      :class="{
        'el-icon-video-pause': isPlayMusic,
        'el-icon-video-play': !isPlayMusic,
      }"
      @click="clickToControlMusic(!isPlayMusic)"
    ></div>
    <div class="page-control el-icon-top" @click="clickToControlPage">
      <p>{{ pageTipWords }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CdPlayer",
  data() {
    return {
      isPlayMusic: true,
      pageTipWords: "Top",
      cdShowDelay: 1800,
      pageTimer: null,
      pageMoveTime: 1600,
      perTimeDistence: 100,
      pageMobileNum: 100,
      limitTimeToDestroyTimer: 600000,
      jayBodyElement: null,
      currentCDMusic: {
        index: 0,
        src: "http://1.117.143.11:5000/album/八度空间/周杰伦-回到过去.mp3",
      },
      songlist: [
        {
          index: 0,
          name: "回到过去",
          src: "http://1.117.143.11:5000/album/八度空间/周杰伦-回到过去.mp3",
        },
        {
          index: 1,
          name: "爱在西元前",
          src: "http://1.117.143.11:5000/album/范特西/周杰伦-爱在西元前.mp3",
        },
        {
          index: 2,
          name: "上海一九四三",
          src: "http://1.117.143.11:5000/album/范特西/周杰伦-上海一九四三.mp3",
        },
      ],
    };
  },
  beforeDestroy() {
    //离开之前清掉定时器
    clearInterval(this.pageTimer);
  },
  mounted() {
    this.showPlayer();
    this.jayBodyElement = document.getElementById("my-jay-body");
    setTimeout(() => {
      this.controlCDAudio(true);
    }, 1800);
    setTimeout(() => {
      this.autoPlayPage();
    }, 1800);
  },
  computed: {
    eachMoveDistence() {
      return this.perTimeDistence / this.pageMobileNum;
    },
    eachMoveTime() {
      return this.pageMoveTime / this.pageMobileNum;
    },
  },
  methods: {
    showPlayer() {
      setTimeout(() => {
        this.isShowPlayer = true;
        this.$jq(".cover-wrap").css({
          opacity: 1,
        });
        this.$jq(".cover-control").css({
          opacity: 0.8,
        });
        this.$jq(".page-control").css({
          opacity: 0.8,
        });
      }, this.cdShowDelay);
    },
    controlCDAudio(state) {
      var cdAudio = document.getElementById("cdplayer-audio");
      if (state) {
        cdAudio.play();
      } else {
        cdAudio.pause();
      }
    },
    clickToControlMusic(state) {
      this.isPlayMusic = state;
      const control = this.isPlayMusic === true ? "running" : "paused";
      setTimeout(() => {
        document.getElementById("player-img").style.animationPlayState =
          control;
        if (this.isPlayMusic) {
          document.getElementById("cdplayer-audio").play();
          setTimeout(() => {
            this.autoPlayPage();
          }, 300);
        } else {
          document.getElementById("cdplayer-audio").pause();
          setTimeout(() => {
            clearInterval(this.pageTimer);
          }, 200);
        }
      }, 400);
    },
    clickToControlPage() {
      this.clickToControlMusic(false);
      this.jayBodyElement.scrollIntoView({ behavior: "smooth" });
      if (this.jayBodyElement.scrollTop > 300) {
        var backToTopTimer = setInterval(() => {
          if (this.jayBodyElement.scrollTop < 150) {
            clearInterval(backToTopTimer);
          }
          this.jayBodyElement.scrollTop -= 1000;
        }, 20);
      }

      if (this.jayBodyElement.scrollTop < 150) {
        this.jayBodyElement.scrollTop = 0;
      }
    },
    changeMusic() {
      let index = this.currentCDMusic.index + 1;
      if (this.currentCDMusic.index === this.songlist.length - 1) {
        index = 0;
      }
      this.currentCDMusic = this.songlist[index];
      setTimeout(() => {
        this.controlCDAudio(true);
      }, 1000);
    },
    autoPlayPage() {
      this.pageTimer = setInterval(() => {
        if (
          this.jayBodyElement.scrollTop + this.jayBodyElement.clientHeight >=
          this.jayBodyElement.scrollHeight
        ) {
          //清除定时器
          //关闭音乐
          clearInterval(this.pageTimer);
          this.clickToControlMusic();
        }
        this.jayBodyElement.scrollTop += this.eachMoveDistence;
      }, this.eachMoveTime);
    },
  },
};
</script>

<style>
/* 页面控制 */
.page-control {
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  padding: 4px;
  position: fixed;
  top: 131px;
  right: 213px;
  cursor: pointer;
  font-size: 32px;
  color: #fff;
  opacity: 0;
  z-index: 10;
  transition: "opacity" 10s ease-out;
  transition: color 0.2s ease-out;
}
.page-control p {
  font-size: 20px;
}
.page-control:hover {
  font-size: 35px;
  color: #ff80ab;
  opacity: 1;
}
/* 播放器 */
.cover-control {
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  padding: 4px;
  position: fixed;
  top: 152px;
  right: 90px;
  cursor: pointer;
  font-size: 32px;
  color: #fff;
  opacity: 0;
  z-index: 10;
  transition: "opacity" 10s ease-out;
  transition: color 0.2s ease-out;
}
.cover-control:hover {
  color: #ff80ab;
  opacity: 1;
}
.cover-wrap {
  width: 140px;
  height: 140px;
  border: 30px solid #000000;
  border-radius: 50%;
  overflow: hidden;
  position: fixed;
  right: 40px;
  top: 100px;
  box-shadow: 0 0 40px #fff;
  opacity: 0;
  transition: all 10s ease-out;
}

@keyframes playmusic {
  /* 起始位置 */
  from {
    transform: rotate(0deg);
  }

  /* 结束位置 */
  to {
    transform: rotate(360deg);
  }
}

.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;

  /* 动画属性 */
  animation-name: playmusic;
  animation-duration: 6s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>