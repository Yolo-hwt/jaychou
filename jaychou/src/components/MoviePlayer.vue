<template>
  <div class="movie-player">
    <div class="movie-player-title">
      <a class="el-icon-back moive-player-back" @click="backToFile"></a>
      <h1 v-if="!supportlist.includes(movieData.title)">{{ movieTitle }}</h1>
    </div>
    <div class="movie-holder">
      <div v-if="supportlist.includes(movieData.title)" class="movie-container">
        <vue-core-video-player
          ref="moviePlayer"
          v-if="isVideoReady"
          :key="movieData.title"
          :src="movielist"
          :autoplay="true"
          :title="movielist[0].title"
          :logo="movielist[0].logo"
          :controls="true"
          @play="moviePlayFunc"
          @pause="moviePauseFunc"
        ></vue-core-video-player>
      </div>
      <div v-else class="unsupport">
        <h1>视频资源缺失</h1>
        <h2>目前支持的资源</h2>
        <p v-for="(item, index) in supportlist" :key="index">
          {{ item }}
        </p>
        <span>请点击左上角返回按钮，重新选择当前支持的资源</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoviePlayer",
  data() {
    return {
      isVideoReady: false,
      movieTitle: "影视放映",
      movieData: {},
      supportlist: ["头文字D", "大灌篮", "不能说的秘密", "满城尽带黄金甲"],
      movielist: [],
    };
  },
  computed: {
    moviePlayer() {
      return this.$refs.moviePlayer;
    },
  },
  activated() {
    this.closeCurrentAudio();
    const data = this.$route.params.data;
    const flag =
      data === undefined ||
      typeof data === "undefined" ||
      typeof data === undefined
        ? false
        : true;
    if (flag) {
      this.isVideoReady = false;
      this.movieData = data;
      this.movieTitle = this.movieData.title;
      console.log(this.movieTitle);
      this.getVideoSrc(this.movieTitle);
      setTimeout(() => {
        this.isVideoReady = true;
      }, 500);
    }
  },
  methods: {
    moviePlayFunc() {
      this.moviePlayer.play();
    },
    moviePauseFunc() {
      this.moviePlayer.pause();
    },
    getVideoSrc(movieName) {
      const videoitem = {
        src: "http://1.117.143.11:5000/jay/video/" + movieName,
        // resolution: "1080p",
        type: "video/mp4",
        title: "《" + movieName + "》—— JayChou",
        logo: "jay.ico",
      };
      this.movielist = [videoitem];
    },
    backToFile() {
      this.$router.replace({
        name: "filepage",
      });
      this.$store.commit("setFileMode", "desc");
    },
    closeCurrentAudio() {
      var audiolist = document.getElementsByTagName("audio");
      // console.log(audiolist);
      Array.from(audiolist).forEach((element, index) => {
        if (element.currentTime && element.currentTime !== 0)
          audiolist[index].pause();
      });
    },
  },
};
</script>

<style>
.movie-player {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.movie-player-title {
  display: flex;
  width: 100%;
}
.movie-player-title .moive-player-back {
  color: white;
  float: left;
  left: 2%;
  position: fixed;
  font-size: 4rem;
  cursor: pointer;
}
.movie-player-title .moive-player-back:hover {
  color: #ff80ab;
}
.movie-player-title h1 {
  width: 100%;
  height: 80px;
  padding-top: 20px;
  color: #dcdde1;
  text-align: center;
  font-size: 3rem;
}
/* .movie-player-title h1:hover {
  color: #ff80ab;
} */
.movie-holder {
  width: 67%;
  height: 88%;
  box-shadow: 0 0 10px #dcdde1;
}
.unsupport {
  width: 80%;
  margin: 10px auto;
  color: #dcdde1;
  display: flex;
  flex-direction: column;
}
.unsupport h1 {
  text-align: center;
  padding: 10px;
  font-size: 3.5rem;
}
.unsupport h2 {
  text-align: center;
  padding: 10px;
  margin-bottom: 60px;
}
.unsupport p {
  text-align: center;
  font-size: 2rem;
  line-height: 6rem;
}
.unsupport span {
  margin-top: 30px;
  text-align: center;
  font-size: 3rem;
}
.unsupport p:hover {
  color: #ff80ab;
}
</style>