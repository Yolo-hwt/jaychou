<template>
  <div class="container">
    <h1>JayChou Stages</h1>

    <div class="timeline">
      <ul>
        <li v-for="(item, index) in stageInfo" :key="index">
          <div class="content">
            <!-- <h3>{{ item.id }}</h3> -->
            <div class="img-container">
              <el-image
                style="width: 100%; height: 100%"
                :key="item.id"
                :src="`http://1.117.143.11:5000/assets/stage/${item.id}.jpg`"
                lazy
              ></el-image>
            </div>
            <p>
              {{ item.desc }}
            </p>
          </div>
          <div class="point"></div>
          <div class="date">
            <h4>{{ item.time }}</h4>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "JayChou",
  data() {
    return {
      allowToWheel: false,
      stageInfo: [],
      isShowPlayer: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    // console.log(document.getElementById("my-jay-body"));
    document.getElementById("my-jay-body").scrollTop = 0;
    $(".jay-body").removeClass("pseudo-1h").addClass("pseudo-16h");
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$bus.$emit("setCdPlayer", false);
    $(".jay-body").removeClass("pseudo-16h").addClass("pseudo-1h");
    document.getElementById("my-jay-body").scrollTop = 0;
    next();
  },
  beforeMount() {
    this.closeCurrentAudio();
    this.getStageInfo();
  },
  mounted() {
    this.$bus.$emit("setCdPlayer", true);
  },
  methods: {
    getStageInfo() {
      this.$http.readLocalJSONFile("doc/stage.json").then((data) => {
        this.stageInfo = data;
      });
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
/* 懒加载图片 */
.el-image {
  box-shadow: 0 0 10px #f1f3f4;
}
.img-container {
  width: 450px;
}
.container {
  padding: 20px 0;
  margin: 10px auto;
}

.container h1 {
  text-align: center;
}

.timeline {
  position: relative;
  margin: 0 auto;
  width: 90%;
}

.timeline ul li {
  margin-bottom: 50px;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.point {
  min-width: 20px;
  height: 20px;
  background-color: #ff80ab;
  border-radius: 100%;
  z-index: 2;
  border: 3px #333333 solid;
  position: relative;
  left: 2px;
}

@media (max-width: 800px) {
  .point {
    min-width: 15px;
    height: 15px;
  }

  html,
  body {
    font-size: 15px;
  }
}

@media (max-width: 650px) {
  html,
  body {
    font-size: 14px;
  }

  .point {
    min-width: 12px;
    height: 12px;
  }
}

@media (max-width: 450px) {
  html,
  body {
    font-size: 10px;
  }

  p {
    padding: 10px !important;
  }
}

.timeline ul li .content {
  width: 50%;
  padding: 0 20px;
}

.timeline ul li:nth-child(odd) .content {
  padding-left: 0;
}

.timeline ul li:nth-child(odd) .date {
  padding-right: 0;
}

.timeline ul li:nth-child(even) .content {
  padding-right: 0;
}

.timeline ul li:nth-child(even) .date {
  padding-left: 0;
}

.timeline ul li .date {
  width: 50%;
  padding: 0 20px;
  font-weight: normal;
}

.timeline ul li .date h4 {
  background-color: #ff80ab;
  width: 118px;
  text-align: center;
  padding: 12px 10px;
  border-radius: 23px;
  font-size: 1.8rem;
}

.timeline ul li .content h3 {
  padding: 10px 20px;
  background-color: #ff80ab;
  margin-bottom: 0;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.timeline ul li .content p {
  padding: 15px 20px;
  background-color: #f1f3f4;
  color: black;
  margin-top: 0;
  text-align: left;
  line-height: 3rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 1.8rem;
}

.timeline ul li:nth-child(even) {
  flex-direction: row-reverse;
}

.timeline ul li:nth-child(even) .date h4 {
  float: right;
}

.timeline::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 3px;
  left: 50%;
  background-color: #bdc3c7;
}
</style>