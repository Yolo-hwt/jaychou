<template>
  <div class="res-main">
    <h1>这个人有点懒没去好好搜集资源</h1>
    <h2>所以只能力荐一套纪录片————来自万能b站的up主"黑暗骑士"</h2>
    <p>（有幸和他是校友）</p>
    <h2>真的非常很好看！</h2>
    <div class="res-img-container">
      <img src="../../src/assets/黑暗骑士.jpg" alt="" />
    </div>
    <p>每一个喜欢杰伦的朋友我都希望你去看一看</p>
    <p>
      纪录片跨越杰伦的各个时期，细腻流畅的叙事风格，讲述少年时期的初露锋芒，00年代的横空出世，范特西的天马行空，七里香的夏日狂想……
    </p>
    <p>
      这些是up主对杰伦各个阶段的部分描述，也是每一集纪录片的片名，本网站的标题也是取于此。
    </p>
    <p>
      一集纪录片平均时长约有半个小时到四十分钟，足见作者的用心程度，而最后呈现出来的观感也是与之对应无可厚非的
    </p>
    <p>
      从杰伦个人的成长出发，见证当初懵懂青涩的少年到无与伦比的华丽乐章，大江南北都响彻着他独有的的中国风韵
    </p>
    <p>
      这个过程有好友的力挺，有搭档的扶持，有开疆扩土的耀眼光芒，也有荣耀背后的难言心酸
    </p>
    <p>所以哥这么吊，你真的不打算去看看吗</p>
    <div class="res-about">
      <h1>关于在这</h1>
      <p>
        起初有这样的想法去做个杰伦的网站是在去年左右吧，那时候刚开始学做一点html页面，啥也不会吧，所以也可以说只是个一闪而过的念头
      </p>
      <p>
        再后来大家都知道，很多明星纷纷出现一些不言说的事情，我个人并不是喜欢到处吃瓜。\n\n相反对于那些满满金口袋的人而言，控制住自己不去探底线可能真的会比较难，毕竟人都是有欲望的，尤其是你有资源能力去触碰这些欲望的时候
      </p>
      <p>微博也好抖音也好，都在叫杰伦挺住，娱乐圈最后的支柱</p>
      <p>
        我突然就想到，好像自从我知道周杰伦这个人起，真的没有听到过有关他的负面新闻
      </p>
      <p>一想起他似乎在脑海里就是数不尽的歌和回忆</p>
      <p>
        高中时候学校不准带手机，也就买了一个mp3，那时候里面的歌，怎么说呢，都是些比较伤感的，薛之谦李荣浩陈奕迅横扫，也还有歌神学友，一些叫不上名字的旋律英文歌，刘德华也在听，我也喜欢唱，哈哈哈，现在想想当时还挺勇，只要有同学一起哄就上，内心其实还是很渴望的，不过我这个人就是这样，还得先表现出一点小小的拒绝，然后厚着脸皮上去
      </p>
      <p>是一个契机吧，分享了一半同桌的耳机</p>
      <p>《我不配》</p>
      <p>《轨迹》</p>
      <p>《阳光宅男》</p>
      <p>......</p>
      <p>如听仙乐而暂明</p>
      <p>
        在这之前我只知道《听妈妈的话》《双截棍》原来曲风能这么多变，原来旋律能这么好听，自此入坑，mp3里面逐渐多了一股子jay臭（JayChou）味
      </p>
      <p>
        当时也有幸隔壁老马推荐了咪咕音乐，真的不用花钱就能听杰伦，nuo 有图有真相
      </p>
      <div class="res-about-img">
        <img src="../../src/assets/当年.jpg" alt="" />
      </div>
      <p>
        现在看着各大音乐平台轮番收费，会员收费，仅会员期间下载离线支持收听，各种自家格式的音乐（e.g.
        扣扣music的.mgg格式）就连咪咕也不再单纯了，所有的这些早就失去了当年mp3的纯甄品位
      </p>
      <p>
        对的，那么所以，我想着，是时候，做一个，免费的，杰伦音乐平台，了（装的）
      </p>
      <p>
        制作过程中我是全程放着他的歌的，从《Jay》专辑开始一直到《最伟大的作品》然后循环，小计了一下可能有个五六遍的样子
      </p>
      <p>写到这歌曲放到的是《跨时代》里面的《雨下一整晚》</p>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "Res",
  beforeRouteEnter(to, from, next) {
    document.getElementById("my-jay-body").scrollTop = 0;
    $(".jay-body").removeClass("pseudo-1h").addClass("pseudo-4h");
    next();
  },
  beforeRouteLeave(to, from, next) {
    document.getElementById("my-jay-body").scrollTop = 0;
    $(".jay-body").removeClass("pseudo-4h").addClass("pseudo-1h");
    next();
  },
};
</script>

<style>
.res-main {
  padding: 40px 100px;
  text-align: center;
  color: #dcdde1;
}
.res-main p {
  font-size: 2rem;
  line-height: 40px;
}
.res-main p:hover {
  color: #ff80ab;
}
.res-img-container {
  width: 1300px;
  height: 700px;
  margin: 50px auto;
}
.res-img-container img {
  width: 100%;
  height: 100%;
}
.res-about {
  margin-top: 200px;
  padding: 200px;
}

.res-about-img {
  width: 500px;
  height: 450px;
  margin: 10px auto;
}
.res-about-img img {
  width: 100%;
  height: 100%;
}
</style>