<template>
  <div class="player">
    <aplayer
      v-if="aplayerControl"
      id="my-aplayer"
      :autoplay="isAutoplay"
      :music="musicDetial[0]"
      :showLrc="true"
      :repeat="repeatMode"
      :controls="true"
      :list="musicDetial"
    />
    <!-- :list="musicDetial" -->
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
export default {
  name: "MyPlayer",

  data() {
    return {
      aplayerControl: true,
      musicDetial: [
        {
          artist: "周杰伦",
          lrc: "[00:00.000] 加载中...\n",
          pic: "https://p2.music.126.net/Gd-HAk9hKC85L0wNtfRs1g==/7946170535396804.jpg",
          src: "http://1.117.143.11:5000/album/Jay/周杰伦-可爱女人.mp3",
          theme: "#1e3851",
          title: "加载中",
        },
      ],
      preMusicData: [
        {
          artist: "周杰伦",
          lrc: "[00:00.000] 加载中...\n",
          pic: "https://p2.music.126.net/Gd-HAk9hKC85L0wNtfRs1g==/7946170535396804.jpg",
          src: "http://1.117.143.11:5000/album/Jay/周杰伦-可爱女人.mp3",
          theme: "#1e3851",
          title: "加载中",
        },
      ],
      currentSong: {},
      albumIndex: "",
      songIndex: "",
      albumInfo: {},
      isAutoplay: false,
      isReady: false,
      isControls: true,
      useTimes: 0,
      setAutoPlayMode: true,
      loadMusicDelay: 100,
      playMusicDelay: 600,
      repeatMode: "repeat-all",
    };
  },
  components: {
    Aplayer,
  },

  mounted() {
    this.$nextTick(() => {
      this.setAutoPlay(this.isAutoplay);
      this.changeDefaultStyle();
    });
  },
  computed: {
    storeCurrentSong() {
      const temp = this.$store.state.currentMusic;
      return temp;
    },
    storeCurrentAlbumIndex() {
      const temp = this.$store.state.currentAlbumIndex;
      return temp;
    },
    storePlayAllSongs() {
      const temp = this.$store.state.playAllSongs;
      return temp;
    },
  },
  watch: {
    //更新专辑
    storeCurrentAlbumIndex: function (newValue) {
      // console.log("更新专辑");
      const albumIndex = newValue;
      if (this.albumIndex !== albumIndex) {
        const currentAlbumInfo = this.$store.state.albumList[albumIndex];
        const currentMusic = this.$store.state.currentMusic;
        //修改组件数据
        this.albumIndex = albumIndex;
        this.albumInfo = currentAlbumInfo;
        this.currentSong = currentMusic;
        this.preMusicData[0].pic = currentAlbumInfo.pic;
        this.useTimes = 0;
        //重置播放音乐delay
        this.playMusicDelay = 600;
      }
    },
    //更新歌曲
    storeCurrentSong: function (newValue) {
      // console.log("更新歌曲");
      if (this.currentSong.id !== newValue.id) {
        //获取资源并更新
        this.isReady = false;
        this.useTimes++;
        this.musicDetial = this.preMusicData;
        this.currentSong = newValue;
        this.getCurrentSongObj(this.albumInfo.name, this.currentSong);
      }
    },
    //播放所有歌曲
    storePlayAllSongs: function (newValue) {
      const flag = newValue;
      const albumName = this.albumInfo.name;
      var allSongPromiseArr = [];
      if (flag) {
        this.albumInfo.songs.forEach((item, index) => {
          let songPromise = new Promise((resolve, reject) => {
            this.$http
              .getAlbumSongUrl(albumName, item.name)
              .then((reponse) => {
                var obj = reponse.data;
                obj.title = item.name;
                obj.pic = item.pic;
                this.$http.getLyrics(item.id).then((lyricdata) => {
                  obj.lrc = lyricdata.lyric;
                  resolve(obj);
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
          allSongPromiseArr.push(songPromise);
        });
        Promise.all(allSongPromiseArr).then((allSongData) => {
          this.controlAudio("pause");
          this.repeatMode = "repeat-all";
          setTimeout(() => {
            this.musicDetial = allSongData;
            //刷新播放器
            this.aplayerControl = false;
            setTimeout(() => {
              this.aplayerControl = true;
              this.$nextTick(() => {
                this.changeDefaultStyle();
                this.setAutoPlay(this.isAutoplay);
              });
            }, 100);

            setTimeout(() => {
              this.controlAudio("play");
              // this.isAutoplay = true;
              // this.setAutoPlay(this.isAutoplay);
            }, this.playMusicDelay);
          }, this.loadMusicDelay);
        });
        setTimeout(() => {
          this.$store.commit("setPlayAllSongs", false);
        }, 1000);
      }
    },
  },
  methods: {
    getCurrentSongObj(albumName, songObj) {
      // console.log(albumName, songObj);
      this.$http.getAlbumSongUrl(albumName, songObj.name).then((reponse) => {
        var obj = reponse.data;
        obj.title = songObj.name;
        obj.pic = songObj.pic;
        this.$http.getLyrics(songObj.id).then((lyricdata) => {
          obj.lrc = lyricdata.lyric;
          // //更改vuex存储完整当前音乐信息
          // this.$store.commit("setCurrentMusic", obj);
          //自动播放
          setTimeout(() => {
            this.isReady = true;
            this.musicDetial = [obj];
            // this.isAutoplay = true;
            // this.setAutoPlay(this.isAutoplay);
            setTimeout(() => {
              this.controlAudio("play");
              this.playMusicDelay = 100;
            }, this.playMusicDelay);
          }, this.loadMusicDelay);
        });
      });
    },
    setAutoPlay(palystate) {
      var audiolist = document.getElementsByTagName("audio");
      Array.from(audiolist).forEach((element, index) => {
        audiolist[index].autoplay = palystate;
        // audiolist[index].play();
      });
    },
    controlAudio(state) {
      let isPlay = true;
      if (state === "pause") {
        isPlay = false;
      } else if (state === "play") {
        isPlay = true;
      }
      var audiolist = document.getElementsByTagName("audio");
      // console.log(audiolist[0]);
      Array.from(audiolist).forEach((element, index) => {
        if (isPlay) {
          // console.log("play");
          audiolist[index].play();
        } else {
          audiolist[index].pause();
        }
      });
    },
    //修改aplayer默认样式
    changeDefaultStyle() {
      //修改歌词图片
      this.$jq(".aplayer-pic").css({
        height: "180px",
        width: "160px",
      });
      //修改播放器高度
      this.$jq(".aplayer.aplayer-withlrc .aplayer-body .aplayer-info").css({
        height: "180px",
      });
      this.$jq("#my-aplayer").css({
        "background-color": "#dcdde1",
        opacity: 0.9,
      });
      // 修改歌词;
      this.$jq(".aplayer-lrc").css({
        height: "62px",
      });
      this.$jq(".aplayer-music span").css({
        "font-size": "18px",
      });
      this.$jq(".aplayer-controller").css({
        height: "60px",
      });
      this.$jq(".aplayer-icon").css({
        width: "24px",
        height: "24px",
      });
    },
  },
};
</script>

<style>
.aplayer-lrc p.aplayer-lrc-current {
  color: #ff80ab;
}
.player {
  width: 100%;
}
.aplayer-lrc .aplayer-lrc-contents p {
  font-size: 20px;
  line-height: 30px;
  height: 30px;
}
.player-item .player .aplayer {
  background-color: none;
}
.aplayer-button.aplayer-pause .aplayer-icon.aplayer-icon-pause {
  width: 24px;
  height: 24px;
}
.aplayer-button.aplayer-pause .aplayer-icon.aplayer-icon-play {
  width: 35px;
  height: 35px;
}
.aplayer-controller .aplayer-time {
  font-size: 13px;
}
</style>