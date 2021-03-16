"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = __importDefault(require("url"));
var path_1 = __importDefault(require("path"));
var fs = __importStar(require("fs"));
var electron_1 = require("electron");
var mainWindowHeight = 650;
var mainWindowWidth = 890;
if (process.env.NODE_ENV !== "production")
    require("electron-reload")(__dirname, {
        electron: path_1.default.join(__dirname, "node_modules", ".bin", "electron"),
    });
var mainWindow;
var newProductWindow;
electron_1.app.on("ready", function () {
    mainWindow = new electron_1.BrowserWindow({
        center: true,
        height: mainWindowHeight,
        width: mainWindowWidth,
        title: "Order Folder",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
        },
    });
    mainWindow.loadURL(url_1.default.format({
        pathname: path_1.default.join(__dirname, "sources/app.html"),
        protocol: "file",
        slashes: true,
    }));
    var mainMenu = electron_1.Menu.buildFromTemplate(templateMenu);
    electron_1.Menu.setApplicationMenu(mainMenu);
    mainWindow.on("closed", function () {
        electron_1.app.quit();
    });
});
function createSetupFoldersWindow() {
    newProductWindow = new electron_1.BrowserWindow({
        width: 500,
        height: 460,
        title: "Add new product",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
        },
    });
    newProductWindow.menuBarVisible = false;
    newProductWindow.loadURL(url_1.default.format({
        pathname: path_1.default.join(__dirname, "sources/setup.html"),
        protocol: "file",
        slashes: true,
    }));
}
electron_1.ipcMain.on("product:new", function (e, newProduct) {
    mainWindow.webContents.send("product:new", newProduct);
    newProductWindow.close();
});
electron_1.ipcMain.on("select:folder", function (e, FolderPath) {
    FolderPath = electron_1.dialog.showOpenDialogSync(mainWindow, {
        properties: ["openDirectory"],
    });
    mainWindow.webContents.send("selected:folder", FolderPath);
});
var openSettings = function () {
    fs.readFile(__dirname + "\\sources\\json\\files.config.json", "utf-8", function (err, data) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            mainWindow.webContents.send("open:settings", data);
        }
    });
};
var templateMenu = [
    {
        label: "File",
        submenu: [
            {
                label: "Exit",
                accelerator: process.platform == "darwin" ? "comand+q" : "Ctrl+Q",
                click: function () {
                    electron_1.app.quit();
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
                    openSettings();
                },
            },
        ],
    },
];
if (process.platform === "darwin") {
    templateMenu.unshift({
        label: electron_1.app.getName(),
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