const { app, BrowserWindow, ipcMain  } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
      x: 1000,
      y: 400,
      width: 800,
      height: 600,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    win.loadFile('index.html')
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