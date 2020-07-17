'use strict'

const {
  app,
  protocol,
  BrowserWindow,
  BrowserView,
  Tray,
  Menu,
  ipcMain
} = require('electron')
const {
  default: installExtension,
  VUEJS_DEVTOOLS
} = require('electron-devtools-installer');
// const {createProtocol} = require('vue-cli-plugin-electron-builder/lib')
// import {
//   createProtocol,
//   /* installVueDevtools */
// } from 'vue-cli-plugin-electron-builder/lib'


const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
const os = require('os')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    frame: false, //无边框窗口
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 800,
    // maximizable: false,
    // transparent: true, 
    // show: false,

    webPreferences: {
      sanbox: true, //微信扫码登录
      nodeIntegration: true,
      preload: path.resolve('./src/preload.js')
      //   path.join(__dirname, 'preload.js')
    }
  })




  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()

  } else {
    // createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html') //electron-builder
    // win.loadURL('./dist/index.html')

  }
  // win.loadFile('./dist/index.html')


  win.on('ready-to-show', () => {
    win.show()
  })
  win.on('closed', (event, args) => {
    win = null
    // win.hide(); 
    // win.setSkipTaskbar(true);
    event.preventDefault();
  })

  win.on('maximize', (event, args) => {

    win.webContents.send('maximizeWindow', true)
  })

  win.on('unmaximize', (event, args) => {
    win.webContents.send('unmaximizeWindow', false)
  })


}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
  console.log(BrowserWindow.addDevToolsExtension)
  BrowserWindow.addDevToolsExtension(
    path.join(os.homedir(), '/Microsoft/Edge/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd')
  )
})

/***
 * 
 */




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }


  }
  createWindow()



})

app.whenReady().then(() => {

  // installExtension(VUEJS_DEVTOOLS)
  //     .then((name) => console.log(`Added Extension:  ${name}`))
  //     .catch((err) => console.log('An error occurred: ', err));
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('minimizeWindow', e => {
  win.minimize()
})

ipcMain.on('maximizeWindow', e => {
  win.maximize()
})

ipcMain.on('restoreWindow', e => {
  win.restore()
})

ipcMain.on('closeWindow', e => {
  win.close()
})


// 2020-06-24，main.js中，汪轩昂新增
ipcMain.on('asynchronous-message', (event, arg) => {
  var edge = require('electron-edge-js');
  const path = require('path');
  process.env.EDGE_USE_CORECLR = 1;
  var basePath = process.cwd();
  var baseDll = basePath + '/resources/app/lib/ClassLibraryChaoying.dll';

  const batchSendTask = edge.func({
    assemblyFile: baseDll,
    typeName: 'ClassLibraryChaoying.WorkWx',
    methodName: 'SendMessage'
  });

  batchSendTask(arg, (err, val) => {
    event.reply("asynchronous-message-reply", { err, val, data: arg })
  })
})



// 2020-07-17，汪轩昂新增1
ipcMain.on('openChat', (event, arg) => {
  var edge = require('electron-edge-js');
  const path = require('path');
  process.env.EDGE_USE_CORECLR = 1;
  var basePath = process.cwd();
  var baseDll = basePath + '/resources/app/lib/ClassLibraryChaoying.dll';

  const openChat = edge.func({
    assemblyFile: baseDll,
    typeName: 'ClassLibraryChaoying.WorkWx',
    methodName: 'OpenChat'
  });

  openChat(arg, (err, res) => {
    event.reply("reply-openChat", { err, res, val: arg })
  })
})

// 2020-07-17，汪轩昂新增2
ipcMain.on('inputEnter', (event, arg) => {
  var edge = require('electron-edge-js');
  const path = require('path');
  process.env.EDGE_USE_CORECLR = 1;
  var basePath = process.cwd();
  var baseDll = basePath + '/resources/app/lib/ClassLibraryChaoying.dll';

  const inputEnter = edge.func({
    assemblyFile: baseDll,
    typeName: 'ClassLibraryChaoying.WorkWx',
    methodName: 'InputEnter'
  });

  inputEnter(arg, (err, res) => {
    event.reply("reply-inputEnter", { err, res, val: arg })
  })
})

// 2020-07-17，汪轩昂新增3
ipcMain.on('AddCustomerByMobiles', (event, arg) => {
  var edge = require('electron-edge-js');
  const path = require('path');
  process.env.EDGE_USE_CORECLR = 1;
  var basePath = process.cwd();
  var baseDll = basePath + '/resources/app/lib/ClassLibraryChaoying.dll';

  const AddCustomerByMobiles = edge.func({
    assemblyFile: baseDll,
    typeName: 'ClassLibraryChaoying.WorkWx',
    methodName: 'AddCustomerByMobiles'
  });

  AddCustomerByMobiles(arg, (err, res) => {
    event.reply("reply-AddCustomerByMobiles", { err, res, val: arg })
  })
})

// 2020-07-17，汪轩昂新增4
ipcMain.on('SendMessage', (event, arg) => {
  var edge = require('electron-edge-js');
  const path = require('path');
  process.env.EDGE_USE_CORECLR = 1;
  var basePath = process.cwd();
  var baseDll = basePath + '/resources/app/lib/ClassLibraryChaoying.dll';

  const SendMessage = edge.func({
    assemblyFile: baseDll,
    typeName: 'ClassLibraryChaoying.WorkWx',
    methodName: 'SendMessage'
  });

  SendMessage(arg, (err, res) => {
    event.reply("reply-SendMessage", { err, res, val: arg })
  })
})