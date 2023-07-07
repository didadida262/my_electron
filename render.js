// const { remote} = require('electron')
const BrowserWindow = require('@electron/remote').BrowserWindow
console.log(BrowserWindow)
window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn')
    console.log('btn>>>', btn)

    btn.addEventListener('click', () => {
        console.log('click>>>>')
        // 创建新窗口
        const indexWin = new BrowserWindow({
            width: 200,
            height: 200
        })
        indexWin.loadFile('test.html')
    })
})