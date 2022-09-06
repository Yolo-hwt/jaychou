const express = require('express')
const gloabl = require('../gloabl/gloablParam')
const picRouter = express.Router();
const fs = require('fs')
const sizeOf = require('image-size')

/**
 * @param
 * id=home:请求主页轮播图片
 * id=file:请求file文件图片
 * id=album:请求所有专辑图片
 * 
 */
picRouter.get('/pic', (req, res) => {
    const query = req.query;
    const files = fs.readdirSync('./public/assets/' + query.option)
    let baseurl = `http://${gloabl.hostname}:${gloabl.port}/assets/${query.option}/`;
    let resultArr = []
    files.forEach((item) => {
        let imgobj = {};
        imgobj.imgUrl = baseurl + item;
        imgobj.name = item.split('.')[0]
        resultArr.push(imgobj)
    })
    res.send({
        status: 1,
        msg: '请求成功！',
        data: resultArr
    })
})
/**
 * 请求专辑封面
 * @param
 * id=albumname
 */
picRouter.get('/pic/album', (req, res) => {
    const files = fs.readdirSync('./public/assets/album')
    const query = req.query;
    let url = `http://${gloabl.hostname}:${gloabl.port}/assets/album/Jay.jpg`;
    if (files.indexOf(query.albumid + '.jpg') !== -1) {
        url = `http://${gloabl.hostname}:${gloabl.port}/assets/album/${query.albumid}.jpg`;
        res.send({
            status: 1,
            msg: '请求成功！',
            data: url
        })
    } else {
        res.send({
            status: 0,
            msg: '请求失败，没有这样的专辑名称：' + query.albumid,
            data: url
        })
    }
})
/**
 * 请求阶段图片封面
 * @param
 * id=stageid
 */
picRouter.get('/pic/stage', (req, res) => {
    const files = fs.readdirSync('./public/assets/stage')
    const query = req.query;
    let imgName = 001;
    let message = '请求成功！'
    let url = `http://${gloabl.hostname}:${gloabl.port}/assets/stage/${imgName}.jpg`;
    if (files.indexOf(query.stageid + '.jpg') !== -1) {
        imgName = query.stageid
        url = `http://${gloabl.hostname}:${gloabl.port}/assets/stage/${imgName}.jpg`;
    } else {
        message = '请求失败，没有这样的阶段id：' + query.stageid
    }
    const dimensions = sizeOf('./public/assets/stage/' + imgName + '.jpg')
    res.send({
        status: 1,
        msg: message,
        data: {
            imgUrl: url,
            imgSize: dimensions
        }
    })
})
module.exports = picRouter