<template>
  <div class="jay-player-desc">
    <h1>Desc</h1>
    <p v-for="(item, index) in descinfo" :key="index">{{ item }}</p>
  </div>
</template>

<script>
export default {
  name: "Desc",
  data() {
    return {
      descinfo: ["没收到"],
    };
  },
  activated() {
    let desctemp = this.$route.params.data;
    let descarrs = desctemp.split("\n\n");
    this.descinfo = descarrs;
  },
};
</script>

<style>
.jay-player-desc {
  padding: 0px 50px;
  position: relative;
  z-index: 1;
}
/* .jay-player-desc::after {
  border-radius: 15px;
  content: "";
  width: 96%;
  height: 100%;
  position: absolute;
  top: 3%;
  left: 3%;
  background: rgba(0, 0, 0, 0.5);

  z-index: -1;
} */
.jay-player-desc h1 {
  font-size: 4rem;
  font-family: "FZZJ-JHTJW";
  color: #ff80ab;
  padding: 15px 0px 20px 0px;
  z-index: 2;
}
.jay-player-desc p {
  font-size: 1.9rem;
  line-height: 3.4rem;
  text-indent: 5rem;
  margin-bottom: 2.5rem;
  color: #dcdde1;
  z-index: 2;
}
.jay-player-desc p:hover {
  color: #ff80ab;
}
</style>