const BrowserWindow = require('@electron/remote').BrowserWindow
window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn')
    btn.addEventListener('click', () => {
        // 创建新窗口
        const indexWin = new BrowserWindow({
            width: 200,
            height: 200
        })
        indexWin.loadFile('test.html')
    })
})

