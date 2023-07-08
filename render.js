// const BrowserWindow = require('@electron/remote').BrowserWindow

// window.addEventListener('DOMContentLoaded', () => {
//     const btn = document.getElementById('btn')
//     btn.addEventListener('click', () => {
//         // 创建新窗口
//         const indexWin = new BrowserWindow({
//             width: 200,
//             height: 200
//         })
//         indexWin.loadFile('test.html')
//     })
// })

// console.log('versions>>>', versions)

setTimeout(() => {
    console.log('faso>>>')
    window.electronAPI.sendMessageToMain({
        data: '来点小电影,速度!!'
    })
    
}, 3000)
window.electronAPI.receiveMessageFromMain((message) => {
    console.log('render接受>>', message)
    const video =  document.getElementById('videoContainer')
    video.src = message
    video.play()
    // const video = document.getElementById('videoContainer')
    // console.log('vidfeo>>', video)
    // video.src = window.URL.createObjectURL(message)

})

