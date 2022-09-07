
# jaychou后端部分

基于node+express的后端支持

## **提供服务**

- 全专辑歌曲资源在线播放
- 图片图床
- 电影在线播放

**歌词部分**

基于CloudMusicApi项目

https://github.com/Yolo-hwt/NeteaseCloudMusicApi

## 使用

### 资源获取

阿里云盘下载音乐资源，电影资源

音乐：https://www.aliyundrive.com/s/sMpWSQ3EH6z

电影：https://www.aliyundrive.com/s/DmPT87Ndu2B

如链接失效请联系我：

提取文件下载完成后

**音乐更改文件夹名为：album**

**存放至：public/**

**电影更改文件夹名为：resource**

**存放至：根目录**

### 项目部署

1.部署CloudMusicApi项目

2.部署jaychou-server项目

```
$ git clone https://github.com/Yolo-hwt/jaychou.git
```

### 安装

进入 `jaychou-server`项目

```
npm install
```

### 启动

```
node index.js
```

# jaychou前端部分

基于vue2实现的jaychou网站，包含以下模块

- 首页
- 华丽乐章
- 光影漫步
- jayChou
- 关于

## 使用

### 安装

进入 `jaychou`项目

```
npm install
```

修改 `src/request/api.js`

```
const baseUrl = "xxx"//jaychou-server部署地址
const cloudBaseUrl = "xxx"//cloudMusicApi项目部署地址
```

### 启动

```
npm run server
```

## 部分页面一览

![image-20220907155120511](https://cdn.jsdelivr.net/gh/Yolo-hwt/PicGo-res/images/jaychou/image-20220907155120511.png)

![image-20220907155142740](https://cdn.jsdelivr.net/gh/Yolo-hwt/PicGo-res/images/jaychou/image-20220907155142740.png)

![image-20220907155247521](https://cdn.jsdelivr.net/gh/Yolo-hwt/PicGo-res/images/jaychou/image-20220907155247521.png)

![image-20220907155428628](https://cdn.jsdelivr.net/gh/Yolo-hwt/PicGo-res/images/jaychou/image-20220907155428628.png)
