<template>
  <div class="jay-app">
    <Header></Header>
    <div class="player-item" v-show="isRouteToJayPlayer">
      <MyPlayer></MyPlayer>
    </div>
    <CdPlayer v-if="isShowCdPlayer"></CdPlayer>
  </div>
</template>

<script>
import MyPlayer from "./components/MyPlayer";
import Header from "./components/Header";
import CdPlayer from "./components/CdPlayer";
export default {
  name: "App",
  data() {
    return {
      isRouteToJayPlayer: false,
      isShowCdPlayer: false,
    };
  },
  components: {
    MyPlayer,
    Header,
    CdPlayer,
  },
  mounted() {
    this.$bus.$on("setRouteToJayPlayer", this.setRouteToJayPlayer);
    this.$bus.$on("setCdPlayer", this.setCdPlayer);
  },
  methods: {
    setRouteToJayPlayer(value) {
      this.isRouteToJayPlayer = value;
    },
    setCdPlayer(stateValue) {
      this.isShowCdPlayer = stateValue;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.player-item {
  width: 48%;
  display: flex;
  position: fixed;
  bottom: 4%;
  left: 2%;
  z-index: 10;
}
</style>
