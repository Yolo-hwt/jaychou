<template>
  <!-- <el-table
    :data="awardInfo"
    border
    style="width: 96% left:2%"
    row-class-name="award-table"
  >
    <el-table-column prop="date" label="日期" width="130"> </el-table-column>
    <el-table-column prop="name" label="颁奖典礼" width="220">
    </el-table-column>
    <el-table-column prop="title" label="奖项" width="180"> </el-table-column>
    <el-table-column prop="case" label="获奖情况" width="80"> </el-table-column>
    <el-table-column prop="work" label="获奖者"> </el-table-column>
  </el-table> -->
  <div class="jay-award">
    <div class="table-award">Award</div>
    <div class="my-table">
      <div class="table-head">
        <p class="item-date">日期</p>
        <p class="item-name">颁奖典礼</p>
        <p class="item-title">奖项</p>
        <p class="item-case">情况</p>
        <p class="item-work">获奖者</p>
      </div>
      <div class="table-item" v-for="(item, index) in awardInfo" :key="index">
        <div class="item-row">
          <p class="item-date">{{ item.date }}</p>
          <p class="item-name">{{ item.name }}</p>
          <p class="item-title">{{ item.title }}</p>
          <p class="item-case">{{ item.case }}</p>
          <p class="item-work">{{ item.work }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Award",
  data() {
    return {
      alumbindex: 0,
      awardInfo: [],
    };
  },
  activated() {
    const index = this.$store.state.currentAlbumIndex;
    this.alumbindex = index;
    this.initAwradInfoByindex(this.alumbindex);
  },
  // mounted() {
  //   // this.jqChangeBackoundColor(".el-table award-table", "none");
  // },
  methods: {
    initAwradInfoByindex(index) {
      this.$http.readLocalJSONFile("doc/award.json").then((award) => {
        var a = award[index];
        var flat_a = [];
        a.ceremony.forEach((item, index) => {
          const date = item.time; //时间
          const name = item.name; //颁奖典礼
          item.award.forEach((t, i) => {
            let awarditem = {};
            awarditem.date = date;
            awarditem.name = name;
            awarditem.title = t.title; //奖项
            awarditem.case = t.type; //情况
            awarditem.work = t.work; //获奖者
            flat_a.push(awarditem);
          });
        });
        this.awardInfo = flat_a;
      });
    },
    jqChangeBackoundColor(classname, color) {
      this.$jq(classname).css({
        backgroundColor: color,
        opacity: 0.5,
      });
    },
  },
};
</script>

<style>
.jay-award {
  padding-left: 50px;
}
.my-table {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 0;
}
/* .my-table::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
} */
.table-award {
  font-size: 4rem;
  font-family: "FZZJ-JHTJW";
  color: #ff80ab;
  padding: 15px 0px 20px 0px;
  z-index: 2;
}
.table-head {
  font-family: "FZZJ-JHTJW";
  width: 100%;
  display: flex;
  color: #dcdde1;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 15px;
  z-index: 2;
}
.table-item {
  width: 100%;
  color: #dcdde1;
  font-size: 1.9rem;
  padding: 8px;
  border-bottom: 1px solid lightgray;
  z-index: 2;
}
.item-row {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.table-item :hover {
  color: #ff80ab;
}
.table-item p {
  text-align: left;
}
.item-date {
  width: 100px;
}
.item-name {
  width: 220px;
}
.item-title {
  width: 160px;
}
.item-case {
  width: 90px;
}
.item-work {
  width: 160px;
}
</style>