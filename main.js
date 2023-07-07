const { app, BrowserWindow, ipcMain  } = require('electron')
const remote = require('@electron/remote/main')

const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
      // x: 1000,
      // y: 400,
      // maxHeight: 800,
      // maxWidth: 800,
      // minHeight: 400,
      // minWidht: 400,
      width: 800,
      height: 600,
      // resizable: false,
      title: "点歌系统",
      // icon: 
      // 隐藏默认菜单和titile
      // frame: false,
      // 隐藏默认菜单栏
      autoHideMenuBar: true,
      show: false,
      webPreferences: {
        // preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    })
    remote.initialize() 
    remote.enable(win.webContents)
    win.loadFile('index.html')
    // 处理白屏
    win.on('ready-to-show', () => {
      win.show()
    })
  
  }

  app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })