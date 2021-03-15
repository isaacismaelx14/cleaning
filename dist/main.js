"use strict";
var _a = require("electron"), app = _a.app, BrowserWindow = _a.BrowserWindow, Menu = _a.Menu, ipcMain = _a.ipcMain, dialog = _a.dialog;
var url = require("url");
var path = require("path");
var mainWindowHeight = 650;
var mainWindowWidth = 890;
if (process.env.NODE_ENV !== "production")
    require("electron-reload")(__dirname, {
        electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    });
var mainWindow;
var newProductWindow;
app.on("ready", function () {
    mainWindow = new BrowserWindow({
        center: true,
        height: mainWindowHeight,
        width: mainWindowWidth,
        title: "Order Folder",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
        },
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "sources/app.html"),
        protocol: "file",
        slashes: true,
    }));
    var mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on("closed", function () {
        app.quit();
    });
});
function createSetupFoldersWindow() {
    newProductWindow = new BrowserWindow({
        width: 300,
        height: 360,
        title: "Add new product",
        fullscreenable: false,
        maximizable: false,
        minimizable: false,
        resizable: false,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
        },
    });
    newProductWindow.menuBarVisible = false;
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, "sources/setup.html"),
        protocol: "file",
        slashes: true,
    }));
}
ipcMain.on("product:new", function (e, newProduct) {
    mainWindow.webContents.send("product:new", newProduct);
    newProductWindow.close();
});
ipcMain.on("select:folder", function (e, FolderPath) {
    FolderPath = dialog.showOpenDialogSync(mainWindow, {
        properties: ["openDirectory"],
    });
    mainWindow.webContents.send("selected:folder", FolderPath);
});
var templateMenu = [
    {
        label: "File",
        submenu: [
            {
                label: "Exit",
                accelerator: process.platform == "darwin" ? "comand+q" : "Ctrl+Q",
                click: function () {
                    app.quit();
                },
            },
        ],
    },
    {
        label: "Configuration",
        submenu: [
            {
                label: "Setup folders",
                click: function () {
                    createSetupFoldersWindow();
                },
            },
        ],
    },
];
if (process.platform === "darwin") {
    templateMenu.unshift({
        label: app.getName(),
    });
}
if (process.env.NODE_ENV !== "production") {
    templateMenu.push({
        label: "DevTools",
        submenu: [
            {
                label: "Show/Hide Dev Tools",
                accelerator: "f12",
                click: function (item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                },
            },
            {
                role: "reload",
            },
        ],
    });
}
//# sourceMappingURL=main.js.map