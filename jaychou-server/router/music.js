const express = require('express')
const gloabl = require('../gloabl/gloablParam')
const musicRouter = express.Router();
const fs = require('fs');

/**
 * @params
 * alumb:指明专辑
 * song:指明歌曲名称
 */
musicRouter.get('/music', (req, res) => {
    const query = req.query;
    const songlist = fs.readdirSync('./public/album/' + query.album);
    let songUrl = `http://${gloabl.hostname}:${gloabl.port}/album/${query.album}/${songlist[0]}.mp3`;
    if (query.song !== undefined) {
        songUrl = `http://${gloabl.hostname}:${gloabl.port}/album/${query.album}/周杰伦-${query.song}.mp3`;
    }
    const musicDetial = {
        title: query.song,
        artist: "周杰伦",
        src: songUrl,
        theme: "#1e3851",
    }
    res.send({
        status: 1,
        msg: '请求成功！',
        data: musicDetial
    })
})
module.exports = musicRouter