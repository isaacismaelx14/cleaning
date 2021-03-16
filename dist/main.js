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
var Menu_controller_1 = require("./electron/Menu.controller");
var ipcMain_controller_1 = __importDefault(require("./electron/ipcMain.controller"));
var mainWindowHeight = 650;
var mainWindowWidth = 890;
electron_1.app.on("ready", function () {
    var mainWindow = new electron_1.BrowserWindow({
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
    var ipcMainWindowController = new ipcMain_controller_1.default(mainWindow);
    ipcMainWindowController.startIpcMain();
    mainWindow.on("closed", function () {
        electron_1.app.quit();
    });
    var openSettings = function () {
        fs.readFile(__dirname + "\\sources\\json\\files.config.json", "utf-8", function (err, data) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                ipcMainWindowController.openSettins(data);
            }
        });
    };
    var templateMenu = Menu_controller_1.setTemplateMenu(electron_1.app, openSettings);
    var mainMenu = electron_1.Menu.buildFromTemplate(templateMenu);
    electron_1.Menu.setApplicationMenu(mainMenu);
});
if (process.env.NODE_ENV !== "production")
    require("electron-reload")(__dirname, {
        electron: path_1.default.join(__dirname, "node_modules", ".bin", "electron"),
    });
//# sourceMappingURL=main.js.map