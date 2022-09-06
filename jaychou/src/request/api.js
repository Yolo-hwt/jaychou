import axios from 'axios'
const baseUrl = "http://1.117.143.11:5000/"
const cloudBaseUrl = "http://1.117.143.11:4000"
//搜索关键词
async function search(keywords) {
    let url = baseUrl + "/search/suggest?keywords=" + keywords;
    let promiseobj = new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err)
            });
    })
    return await promiseobj;
}
//获取根据歌手id获取热歌
async function getSingerHotSongs(singerId) {
    // let url =
    //     "https://netease-cloud-music-api-livid-sigma.vercel.app/artists?id=" +
    //     singerId;
    let url =
        baseUrl + "/artists?id=" +
        singerId;
    let promiseobj = new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
    return await promiseobj;
}
//根据歌手id和limitnum获取专辑信息
async function getSingerAlbum(singerId, limitnum) {
    // let url =
    //     "https://netease-cloud-music-api-livid-sigma.vercel.app/artist/album?id=" +
    //     singerId +
    //     "&limit=" + limitnum + "&timestamp=" +
    //     new Date().getTime;
    let url =
        baseUrl + "/album?id=" +
        singerId +
        "&limit=" + limitnum + "&timestamp=" +
        new Date().getTime;
    let promiseobj = new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
    return await promiseobj;
}

//根据专辑id获获取专辑信息
async function getAlbum(albumId) {
    // let url =
    //     "https://netease-cloud-music-api-livid-sigma.vercel.app/album?id=" +
    //     albumId +
    //     "&&timestamp=" +
    //     new Date().getTime;
    let url =
        baseUrl + "/album?id=" +
        albumId +
        "&&timestamp=" +
        new Date().getTime;
    let promiseobj = new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => {
                console.log(res.data);
                resolve(res.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
    return await promiseobj;
}
//获取专辑基本信息(id+name)
async function getAllAlumbBasic() {
    let promiseobj = new Promise((resolve, reject) => {
        let albums = [];
        getSingerAlbum("6452").then((albumsdata) => {
            console.log(albumsdata);
            var albumsArry = albumsdata.hotAlbums;
            Object.keys(albumsArry).forEach((key) => {
                let temp = {};
                temp.name = albumsArry[key].name;
                temp.id = albumsArry[key].id;
                albums.push(temp);
            });
            // console.log(albums);
            // this.downlodJSON(albums, "albums.json");

        }).then(() => {
            resolve(alumbs)
        }).catch((error) => reject(error))
    })
    return await promiseobj
}

//整理专辑信息
function intergrateEachAlumbInfo(alumbInfo) {
    //alumbinfo Object
    const alumbSongs = alumbInfo.songs;
    const { id, picUrl, description, name, size, publishTime } =
        alumbInfo.album;
    let selfAlumbObj = {
        id: id,
        pic: picUrl,
        desc: description,
        name: name,
        size: size,
        publishTime: publishTime,
        songs: [],
    };
    Object.keys(alumbSongs).forEach(function (key) {
        let songtemp = {};
        songtemp.pic = selfAlumbObj.pic;
        songtemp.id = alumbSongs[key].id;
        songtemp.name = alumbSongs[key].name;
        selfAlumbObj.songs.push(songtemp);
    });
    return selfAlumbObj;
}
//获取所有专辑信息
async function getAllAlumbInfo(alumbBasicInfoPath) {
    let promiseobj = new Promise((resolve, reject) => {
        var promiseArray = [];
        var alumbs = "";
        var allAlumbsInfo = [];
        //读取本地专辑信息
        readLocalJSONFile(alumbBasicInfoPath)
            .then((data) => {
                alumbs = data;
            })
            .then(() => {
                // console.log(this.alumbs);
                //根据每一个专辑id提取整合专辑信息
                //对应生成一个promise对象
                for (let key in alumbs) {
                    let promiseItem = new Promise((resolve, reject) => {
                        this.getAlbum(alumbs[key].id)
                            .then((alumbinfo) => {
                                //提取专辑信息
                                let temp = intergrateEachAlumbInfo(alumbinfo);
                                //打印一下
                                // console.log("@@temp", temp);
                                allAlumbsInfo.push(temp);
                                resolve("success");
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                    promiseArray.push(promiseItem);
                }
            })
            .then(() => {
                //提交处理所有promise
                Promise.all(promiseArray).then(() => {
                    //下载json到本地
                    // this.downlodJSON(this.allAlumbsInfo, "allalumbinfo.json");
                    resolve(allAlumbsInfo)
                })
                // resolve("allsuccess");
            }).catch((error) => {
                reject(error)
            })
    })
    return await promiseobj
}
//根据songid获取lrc歌词
async function getLyrics(songId) {
    // let url =
    //   "https://netease-cloud-music-api-livid-sigma.vercel.app/lyric?id=" +
    //   songId;
    let url =
        cloudBaseUrl + "/lyric?realIP=1.117.143.11/&&id=" +
        songId +
        "&&timestamp=" + new Date().valueOf()
    let lyricsPromise = new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => {
                // console.log(res.data.lrc);
                resolve(res.data.lrc);
            })
            .catch((error) => {
                reject(error);
            });
    });
    return await lyricsPromise;
}
//根据文件路径读取本地json文件
async function readLocalJSONFile(filePath) {
    let promiseobj = new Promise((resolve, reject) => {
        axios
            .get(filePath)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
    return await promiseobj;
}
/**
 * @param {string} option 'file/home/album'
 */
async function getAmountImgUrl(option) {
    // http://127.0.0.1:5000/jay/pic?option=home
    let promiseobj = new Promise((resolve, reject) => {
        axios.get(baseUrl + 'jay/pic?option=' + option).then((reponse) => {
            resolve(reponse.data)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
    return await promiseobj
}
/**
 * @param {string} albumid 
 * 获取专辑封面
 */
async function getAlbumImgUrl(albumid) {
    // http://127.0.0.1:5000/jay/pic/album?albumid=八度空间
    let promiseobj = new Promise((resolve, reject) => {
        axios.get(baseUrl + 'jay/pic/album?albumid=' + albumid).then((reponse) => {
            resolve(reponse.data)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
    return await promiseobj
}
/**
 * @param {string} stageid 
 * 获取阶段图片
 */
async function getStageImgUrl(stageid) {
    // http://1.117.143.11:5000/jay/pic/stage?stageid=005
    let promiseobj = new Promise((resolve, reject) => {
        axios.get(baseUrl + 'jay/pic/stage?stageid=' + stageid).then((reponse) => {
            resolve(reponse.data)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
    return await promiseobj
}
/**
 * @param {string} album
 * @param {string} song
 * 获取音乐url
 *
 */
async function getAlbumSongUrl(album, song) {
    // http://127.0.0.1:5000/jay/music?album=jay&song=可爱女人
    let promiseobj = new Promise((resolve, reject) => {
        axios.get(baseUrl + 'jay/music?album=' + album + '&song=' + song).then((reponse) => {
            resolve(reponse.data)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
    return await promiseobj
}
export default {
    getLyrics,
    readLocalJSONFile,
    getAmountImgUrl,
    getAlbumSongUrl,
    getStageImgUrl
}

