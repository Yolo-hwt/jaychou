<template>
  <div class="jay-player-list">
    <div class="list-title">
      <h1>Song List</h1>
      <i class="el-icon-video-play" @click="playAllSong"> all</i>
    </div>
    <a
      class="player-list-a"
      v-for="(item, index) in listinfo"
      :key="index"
      :id="`list-${index}`"
      @click="clickToPlayMusic(item, index)"
    >
      <p class="list-song-name">{{ item.name }}</p>
      <p class="list-album-name">{{ albumName }}</p>
      <i class="bi bi-bar-chart-fill"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      listinfo: ["没收到"],
      albumName: "",
      clickedListID: "",
    };
  },
  // beforeMount() {
  //   this.listinfo = this.$route.params.data.songs;
  //   this.albumName = this.$route.params.data.albumname;
  // },
  // mounted() {
  //   this.$nextTick(() => {
  //     const index = this.$store.state.currentMusic.index;
  //     this.$jq("#list-" + index).css({
  //       color: "#ff80ab",
  //     });
  //     this.clickedListID = "list-" + index;
  //   });
  // },
  activated() {
    this.listinfo = this.$route.params.data.songs;
    this.albumName = this.$route.params.data.albumname;
    this.$nextTick(() => {
      const index = this.$store.state.currentMusic.index;
      if (this.clickedListID !== "" && this.clickedListID !== index) {
        this.$jq("#" + this.clickedListID).css({
          color: "#dcdde1",
        });
      }
      this.$jq("#list-" + index).css({
        color: "#ff80ab",
      });
      this.clickedListID = "list-" + index;
    });
  },
  methods: {
    playAllSong() {
      this.$store.commit("setPlayAllSongs", true);
    },
    clickToPlayMusic(songobj, index) {
      this.$jq("#list-" + index).css({
        color: "#ff80ab",
      });
      if (this.clickedListID !== "") {
        this.$jq("#" + this.clickedListID).css({
          color: "#dcdde1",
        });
      }
      this.clickedListID = "list-" + index;
      songobj.index = index;
      // console.log(songname);
      this.$store.commit("setCurrentMusic", songobj);
    },
  },
};
</script>

<style>
.jay-player-list {
  /* font-family: "楷体"; */
  padding: 0px 50px;
}
.list-title {
  height: 81px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-title i {
  font-size: 3rem;
  color: #dcdde1;
  cursor: pointer;
}
.el-icon-video-play:before {
  transition: all 0.1s;
}
.list-title .el-icon-video-play:hover {
  font-size: 3.1rem;
  color: #ff80ab;
}
.list-title h1 {
  font-size: 4rem;
  font-family: "FZZJ-JHTJW";
  color: #ff80ab;
  padding: 15px 0px 20px 0px;
}
.player-list-a {
  font-family: "FZZJ-JHTJW";
  font-size: 2.5rem;
  display: flex;
  justify-content: space-between;
  line-height: 4rem;
  color: #dcdde1;
  cursor: pointer;
}
.player-list-a:hover {
  font-size: 2.6rem;
  color: #ff80ab;
}
.list-song-name {
  width: 230px;
}
</style>