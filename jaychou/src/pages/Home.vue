<template>
  <div class="jay-home">
    <div class="jay-carousel">
      <el-carousel
        indicator-position="outside"
        :height="carouselHeight"
        :interval="carouselTimeout"
      >
        <el-carousel-item v-for="(item, index) in imglist" :key="index">
          <div class="carousel-img">
            <vue-core-video-player
              :key="item.title"
              ref="videoPlayer"
              id="jay-home-video"
              v-if="
                item.type && videoPlayerControl && item.type === 'video/mp4'
              "
              :src="[item]"
              :autoplay="false"
              :title="item.title"
              :logo="item.logo"
              :cover="item.cover"
              @play="videoPlayFunc"
              @pause="videoPauseFunc"
            ></vue-core-video-player>
            <img :src="item.imgUrl" :alt="item.name" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      videoPlayerControl: true,
      loading: true,
      carouselHeight: "550px", //初始值
      carouselTimeout: 3500,
      videolist: [
        {
          src: "http://127.0.0.1:8100/video/最伟大的作品",
          resolution: "480p",
          type: "video/mp4",
          title: "《最伟大的作品》—— JayChou",
          logo: "jay.ico",
          poster: require("../assets/cover.jpg"),
        },
      ],
      imglist: [
        // {
        //   imgUrl: require("../assets/home/jay1.jpg"),
        //   name: "jay1",
        // },
        // {
        //   imgUrl: require("../assets/home/jay2.jpg"),
        //   name: "jay2",
        // },
        // {
        //   imgUrl: require("../assets/home/jay5.jpg"),
        //   name: "jay5",
        // },
      ],
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    //     isPlaying(){
    // return this.$refs.videoPlayer.player.isPlaying;
    //     },
    store_containerHeight() {
      const h = this.$store.state.containerHeight;
      return h;
    },
  },
  beforeMount() {
    this.getHomeImgUrl();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  mounted() {
    //防止页面加载问题，放在nextTick中

    this.$nextTick(() => {
      this.setCarouselStyle();
    });
  },
  methods: {
    videoPlayFunc() {
      this.carouselTimeout = 1000 * 60 * 6;
      // this.videoPlayerControl = false;
      setTimeout(() => {
        // this.videoPlayerControl = true;
        this.$nextTick(() => {
          // this.player.play();
          document
            .querySelector("#jay-home-video")
            .querySelector("video")
            .play();
        });
      }, 50);

      // this.carouselTimeout = 1000 * 60 * 10;
      // const currentPlayer = this.$refs.videoPlayer.player;
      // currentPlayer.play();
    },
    videoPauseFunc() {
      this.carouselTimeout = 3500;
      setTimeout(() => {
        this.$nextTick(() => {
          document
            .querySelector("#jay-home-video")
            .querySelector("video")
            .pause();
        });
      }, 50);
    },
    setCarouselStyle() {
      // const bodyHeight = this.$store.state.containerHeight;
      const carouselImgHeight = this.store_containerHeight - 70;
      const carouselContainerHeight = this.store_containerHeight - 60;
      // this.$jq(".jay-body >.el-carousel.el-carousel--horizontal").css({
      //   width: "100%",
      //   height: carouselContainerHeight + "px",
      // });
      this.carouselHeight = carouselContainerHeight + "px";
      this.$jq(".el-carousel__item .carousel-img").css({
        width: "100%",
        height: carouselImgHeight + "px",
      });
    },
    getHomeImgUrl() {
      this.$http.getAmountImgUrl("home").then((reponse) => {
        let imgData = reponse.data;
        // this.videolist.forEach((item) => {
        //   imgData.unshift(item);
        // });
        this.imglist = imgData;
        // console.log(this.imglist);
      });
    },
  },
};
</script>
<style>
.jay-home {
  width: 100%;
  height: 100%;
  /* background: #111; */
  display: flex;
  justify-content: center;
}
.jay-carousel {
  padding-top: 20px;
  width: 70%;
}
.el-carousel__item .carousel-img img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>