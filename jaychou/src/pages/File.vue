<template>
  <div class="app">
    <div class="app__background"></div>
    <div class="app__inner">
      <div class="slider">
        <ul class="slider__list"></ul>
      </div>
      <div class="text">
        <div class="text__inner">
          <div class="text__slider-btn" @click="rotate">&#8594;</div>
          <div class="text__group">
            <h3 class="text__title"></h3>
            <div class="text__rating">
              <span class="text__rating-average">平均评级： </span>
              <ul class="text__rating-star-list"></ul>
              <span class="text__rating-number"></span>
            </div>
            <p class="text__synopsis"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "File",
  data() {
    return {
      $that: null,
      step: 0,
      sliderList: "",
      title: "",
      starList: "",
      ratingNum: "",
      synopsis: "",
      movies: [
        {
          image: "",
          title: "寻找周杰伦",
          date: "2003-11-13",
          rating: 4.5,
          synopsis:
            "《寻找周杰伦》是由金川映画制作的100分钟爱情影片。该片由林爱华执导，浦蒲、余文乐、吴大维、吴彦祖、周杰伦等主演，于2003年11月13日在中国上映。该片讲述了一个武汉少女，男友离她而去 ，因为周杰伦所唱的一首歌而重燃对生活的希望，少女决定不惜一切到香港访寻周杰伦，寻找她生命中最遥远却明亮的梦",
        },
        {
          image: "",
          title: "头文字D",
          date: "2005-06-24",
          rating: 4.5,
          synopsis:
            "《头文字D》是由刘伟强和麦兆辉联合导演，周杰伦、铃木杏、陈冠希、黄秋生、余文乐、陈小春等主演的一部动作片。该片是周杰伦首部主演的电影，于2005年6月19日全国上映。影片讲述藤原拓海代替父亲藤原文太每天运送豆腐而无意中成长为一个“飘移”高手并打败了中里毅、须藤京一等赛车高手。而这时，藤原拓海的恋爱出现了危机。最终藤原拓海决定加入赛车队，开始一个真正赛车手的生活",
        },
        {
          image: "",
          title: "满城尽带黄金甲",
          date: "2006-12-14",
          rating: 4.5,
          synopsis:
            "《满城尽带黄金甲》由张艺谋执导，周润发、巩俐、周杰伦、刘烨等主演，故事根据曹禺的话剧《雷雨》改编。电影于2006年12月14日在中国内地上映，以近3亿的票房刷新国产电影内地票房纪录，电影讲述大王征战之后大胜回朝，暗暗发觉宫廷内部已发生微妙的变化，各方为权力、情欲展开明争暗斗，最后矛盾不可避免地总爆发",
        },
        {
          image: "",
          title: "不能说的秘密",
          date: "2007-07-31",
          rating: 4.5,
          synopsis:
            "《不能说的秘密》是周杰伦导演，杜致朗、周杰伦编剧，周杰伦、桂纶镁、黄秋生、曾恺玹等主演，于2007年7月31日在中国大陆上映。该片是周杰伦自导自演的电影处女作。影片以周杰伦自己的高中生活为背景，讲述了转学到一所艺术学校的钢琴天才小伦在一间古老的钢琴练习室里见到演奏神秘钢琴乐的路小雨进而展开的一段奇幻爱情故事",
        },
        {
          image: "",
          title: "大灌篮",
          date: "2008-02-07",
          rating: 4.5,
          synopsis:
            "《大灌篮》是由朱延平执导，周杰伦、曾志伟、蔡卓妍、陈柏霖、黄渤、闫妮、吴宗宪等主演爱情喜剧电影。影片讲述了孤儿方世杰在功夫学校长大，有百发百中的神技，他被曾志伟扮演的立叔骗到了第一大学打篮球，遇到篮球高手陈柏霖及其妹妹阿Sa，由此发生的一段励志故事。该片于2008年2月27日在中国内地上映",
        },
        {
          image: "",
          title: "刺陵",
          date: "2009-12-09",
          rating: 4.5,
          synopsis:
            "《刺陵》是台湾导演朱延平执导的一部寻宝探险片，由周杰伦、林志玲、陈道明、曾志伟等主演，于2009年12月9日在中国上映。《刺陵》围绕大漠深处一座失落古城，讲述两个目的不同群体的寻宝探险故事。一群人努力保护古迹不被破坏，一群人企图探古寻宝谋得私利",
        },
        {
          image: "",
          title: "苏乞儿",
          date: "2010-02-09",
          rating: 4.5,
          synopsis:
            "古装武侠电影《苏乞儿》由袁和平导演，赵文卓、周迅、郭晓冬、安志杰、周杰伦、杨紫琼、等多位明星主演。影片首次用3D立体技术进行了对武打表现的全新尝试。影片于2010年2月9日在全国影院正式公映。影片讲述的是一个非凡英雄的非凡故事，一个武术泰斗的动人心路旅程",
        },
        {
          image: "",
          title: "青蜂侠",
          date: "2011-02-08",
          rating: 4.5,
          synopsis:
            "《青蜂侠》是由米歇尔·冈瑞执导，塞斯·罗根、周杰伦、卡梅隆·迪亚茨、大卫·哈伯、汤姆·威尔金森主演的动作喜剧片。于2011年2月8日在中国大陆上映。该片改编自同名漫画，主要讲述了报社出版人布瑞特·里德每到夜晚就变身戴面具的英雄“青蜂侠”，与来自上海的助手加藤一起惩恶扬善，为正义而战的故事",
        },
        {
          image: "",
          title: "逆战",
          date: "2012-01-19",
          rating: 4.5,
          synopsis:
            "《逆战》是由香港导演林超贤执导，周杰伦、谢霆锋、林鹏、白冰、安志杰、廖启智、金燕玲等主演的枪战动作电影。该片于2012年1月17日上映。该片讲述了国际安全局警察万飞与国际犯罪集团的亲生哥哥万阳的生死故事",
        },
        {
          image: "",
          title: "天台爱情",
          date: "2013-07-11",
          rating: 4.5,
          synopsis:
            "《天台爱情》是周杰伦自编自导自演的第二部电影作品，由刘畊宏担任监制，柯有伦、曾志伟、李心艾、弹头、黄俊郎等主演的歌舞片。该片于2013年5月27日成为第十二届纽约亚洲电影节闭幕影片，于同年7月11日全亚洲公映，7月19日登陆北美。该片讲述了医药馆员工浪子膏在一次意外时遇到了他的梦中情人心艾，却因此被卷进一场诡计之中的故事",
        },
      ],
    };
  },
  beforeMount() {
    this.initImgDate();
  },
  mounted() {
    this.$that = this;
  },
  methods: {
    //生成本地图片require
    // generateImgRequire(filename) {
    //   return require("../assets/file/" + filename + ".jpg");
    // },
    initImgDate() {
      this.$http
        .getAmountImgUrl("file")
        .then((reponse) => {
          const imgMap = new Map();
          // console.log(reponse.data);
          reponse.data.forEach((item) => {
            imgMap.set(item.name, item.imgUrl);
          });
          this.movies.forEach((item, index) => {
            this.movies[index].image = imgMap.get(item.title);
          });
        })
        .then(() => {
          //获取图片链接之后再初始化
          this.initDomSelector();
          this.initMovies();
        });
    },
    initDomSelector() {
      this.sliderList = document.querySelector(".slider__list");
      this.title = document.querySelector(".text__title");
      this.starList = document.querySelector(".text__rating-star-list");
      this.ratingNum = document.querySelector(".text__rating-number");
      this.synopsis = document.querySelector(".text__synopsis");
    },
    initMovies() {
      const composeChild = (c, i) => addChild(this.createChild(c, i));
      const addChild = (c) => this.sliderList.appendChild(c);
      const initSlides = () =>
        this.movies.forEach((value, index) => {
          // debugger;
          composeChild(value, index);
        });
      initSlides();
    },
    createChild(movie, p) {
      // debugger;
      if (p === 0) this.renderText(movie);

      const c = document.createElement("li");
      c.classList.add("slider__item");
      c.style.transform = `translateX(${p === 0 ? 45.5 : 45.5 + 17.3 * p}rem)`;

      const img = document.createElement("img");
      img.classList.add("slider__item-img");
      img.classList.add("img-hover-style");
      // debugger;
      // console.log(movie.image);
      img.src = movie.image;
      img.onclick = () => {
        this.$router
          .replace({
            name: "moviepage",
            params: {
              data: movie,
            },
          })
          .catch((err) => err);
        this.$store.commit("setFileMode", "play");
      };
      c.appendChild(img);

      return c;
    },
    //更新结点
    updateChild(c, i) {
      const p = (i + this.movies.length - 1) % this.movies.length;
      c.style.transform = `translateX(${45.5 + 17.3 * p}rem)`;
    },
    //星级
    renderStars(stars, movie) {
      const pct = movie.rating * 10;

      Array.from(Array(stars).keys()).forEach((i) => {
        const c = document.createElement("li");
        c.classList.add("text__rating-star");

        const div = document.createElement("div");
        div.classList.add("text__rating-star-fill");
        div.style.width = (i === stars - 1 && stars !== movie.rating ? pct : 100) + '%'; // prettier-ignore

        c.append(div);

        this.starList.appendChild(c);
      });
    },
    //描述
    renderText(movie) {
      // debugger;
      const stars = Math.ceil(movie.rating);

      this.title.textContent = movie.title;
      this.ratingNum.textContent = `${movie.rating} / 5`;
      this.synopsis.textContent = movie.synopsis;
      this.starList.innerHTML = "";
      this.renderStars(stars, movie);
    },
    //
    rotate() {
      const currentMovie = this.movies[this.step];
      const nextMovie = this.movies[(this.step + 1) % this.movies.length];
      const newChild = this.createChild(currentMovie, this.movies.length - 1);
      this.step = (this.step + 1) % this.movies.length;

      Array.from(this.sliderList.children).forEach(this.updateChild);
      this.sliderList.removeChild(this.sliderList.childNodes[0]);
      this.sliderList.appendChild(newChild);
      this.renderText(nextMovie);
    },
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  text-rendering: optimizeLegibility;
}

html,
body {
  box-sizing: border-box;
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  font-size: 10px;
  margin: 0;
}

body {
  font-size: 1.5rem;
  height: 100vh;
  width: 100vw;
}

.app {
  height: 100%;
  left: 0;
  overflow: hidden;
  position: relative;
  top: 0;
  transition: all 0.2s;
  width: 100%;
}

.app__background {
  /* background: url("../assets/file/bg.jpg"); */
  background-position: center center;
  background-size: cover;
  /* filter: blur(5px) grayscale(1); */
  height: 100%;
  position: absolute;
  /* transform: scale(1.1);
  width: 100%; */
}
.app__background::before {
  background: rgba(0, 0, 0, 0.7);
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.app__inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 50%;
  max-width: 130rem;
  overflow-x: hidden;
  position: absolute;
  transform: translateX(-50%);
  width: 100%;
}

.slider {
  height: 50rem;
  position: relative;
  width: 100%;
}

.slider__list {
  display: flex;
  height: 100%;
  list-style-type: none;
  margin-top: 7rem;
  position: relative;
  transition: all 0.3s;
  width: 100%;
}

.slider__item {
  position: absolute;
  transition: transform 0.2s;
}
.slider__item .slider__item-img {
  cursor: pointer;
  box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.25),
    0.6rem 0.6rem 0.6rem rgba(0, 0, 0, 0.35);
  height: 20rem;
  object-fit: cover;
  /* object-fit: contain; */
  position: absolute;
  right: 0;
  top: 0;
  transition: width 0.5s, height 0.5s;
  width: 14rem;
}
.slider__item .img-hover-style:hover {
  top: -6px;
  transition: all 0.4s;
  box-shadow: 0 0 8px #fff;
}
.slider__item:first-child .slider__item-img {
  box-shadow: 1.9rem 1.9rem 3.8rem rgba(0, 0, 0, 0.5),
    1.5rem 1.5rem 1.2rem rgba(0, 0, 0, 0.3);
  height: 55rem;
  width: 38rem;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: 52.6rem;
  position: absolute;
  top: 31.5rem;
}

.text__slider-btn {
  align-items: flex-start;
  border-radius: 20%;
  color: #00bfa5;
  cursor: pointer;
  display: flex;
  font-size: 8rem;
  font-weight: bold;
  height: 5rem;
  justify-content: center;
  line-height: 3.7rem;
  overflow: hidden;
  transition: all 0.2s;
  width: 8rem;
}
.text__slider-btn:hover {
  color: #40ffe5;
}
.text__slider-btn:active {
  color: #00bfa5;
  transform: scale(1.1);
}

.text__group {
  color: white;
}
.text__group h3 {
  font-size: 3.6rem;
  padding: 1.5rem 0rem;
}

.text__synopsis {
  line-height: 3rem;
  text-indent: 3rem;
  font-size: 1.9rem;
  /* font-weight: 500; */
}

.text__rating {
  color: white;
  display: flex;
  left: 53.5rem;
  font-size: 1.7rem;
  font-weight: 700;
  padding-bottom: 1rem;
}

.text__rating-average {
  margin-right: 1rem;
}

.text__rating-number {
  margin-left: 1rem;
}

.text__rating-star-list {
  display: flex;
}

.text__rating-star {
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  height: 2rem;
  width: 2rem;
  z-index: 10;
}
.text__rating-star:not(:first-child) {
  margin-left: 0.5rem;
}

.text__rating-star-fill {
  background: yellow;
  height: 100%;
}
</style>