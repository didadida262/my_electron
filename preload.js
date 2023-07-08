const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')


// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   ping: () => ipcRenderer.invoke('ping')
//   // 除函数之外，我们也可以暴露变量
// })

// window.addEventListener('DOMContentLoaded', () => {
//     console.log('1')
//     const replaceText = (selector, text) => {
//       const element = document.getElementById(selector)
//       if (element) element.innerText = text
//     }
  
//     for (const dependency of ['chrome', 'node', 'electron']) {
//       replaceText(`${dependency}-version`, process.versions[dependency])
//     }
//   })


contextBridge.exposeInMainWorld('electronAPI', {
  sendMessageToMain: (message) => {
    ipcRenderer.send('message-from-render', message)
  },
  receiveMessageFromMain: (callback) => {
    ipcRenderer.on('message-from-main', (message) => {
      console.log('中转站>>>来自main', message)
      fs.readFile(targetCatePath, (err, data) => {
        if (err) {
          throw err
        }
        console.log('data>>', data)
        const uniBuffer = Uint8Array.from(data)
        const blob = new Blob([uniBuffer], { type: 'mp4' })
        // const blob = new Blob([res], { type: 'mp4' })
        const url = URL.createObjectURL(blob)
        callback(url)

      })

    })
  }
})
