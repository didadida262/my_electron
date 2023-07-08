// 视频路由

const fs = require('fs')
const { crp, secretABack } = require('./weapons')
const { CATEGORIES, hideRights } = require('./const')

const express = require('express')
const router = express.Router()

router.get('/getCates', (req, res) => {
    const token = req.headers['x-token']
    const userInfo = secretABack(token)
    if (userInfo.username === 'admin') {
        res.send(CATEGORIES)
    } else {
        // 部分权限
        const da = []
        CATEGORIES.forEach((item) => {
            if (hideRights.findIndex((t) => t === item.key) === -1) {
                da.push(item)
            }
        })
        res.send(da)
    }
})
router.post('/getVideosList', (req, res) => {
    fs.readdir(req.body.currentCate.path, (err, data) => {
        if (err) {
            res.sendStatus(404)
        } else {
            let videosList = []
            data.forEach((item, index) => {
                let obj = {
                    id: index,
                    name: item,
                    path: req.body.currentCate.path + '\\' + item,
                    dirPath: req.body.currentCate.path
                }
                videosList.push(obj)
            })
            res.send(videosList)
        }
    })
})
router.post('/getVideo', (req, res) => {
    // const header = { 'Content-Type': 'video/mp4' }
    fs.createReadStream(req.body.path)
        .pipe(res)
})
router.post('/changeFileName', (req, res) => {
    const oldPath = req.body.path
    const newPath = req.body.dirPath + '\\' + req.body.inputName + req.body.path.slice(-4)
    fs.rename(oldPath, newPath, (err) => {
        if (!err) {
            res.send({
                message: 'success'
            })
        } else {
            res.sendStatus('500')
        }
    })
})
router.get('./getVideoCyberFont', (req, res) => {
    // const header = { 'Content-Type': 'video/mp4' }
    fs.createReadStream('../public/清帝逊位.mp4')
        .pipe(res)
})



// app.post('/subMitRecords', TOYS.subMitRecords)
// app.get('/getRecordsList', TOYS.getRecordsList)



module.exports = router
