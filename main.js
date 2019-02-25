// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
const path = require('path');
const Store = require('./store.js');
const store = new Store();
store.init({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 600 }
  }
});
function createWindow () {
  // Create the browser window.
  let { width, height } = store.get('windowBounds');
  //let W = parseInt(localStorage.getItem('width'));
    //let H = parseInt(localStorage.getItem('height'));
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    title:"Google Keep desktop",
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL('https://keep.google.com');
  mainWindow.setMenu(null);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindow.on('close', function () {
    let size = mainWindow.getSize();
   // localStorage.setItem('width', size[0])
    //localStorage.setItem('height', size[1])
    let { width, height } = mainWindow.getBounds();
    // Now that we have them, save them using the `set` method.
    store.set('windowBounds', { width, height });
    console.log(size);
    icon: path.join(__dirname, 'assets/Icons/Windows/256x256.png');
});
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
