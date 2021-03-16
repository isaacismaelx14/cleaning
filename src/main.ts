import url from "url";
import path from "path";
import * as fs from "fs";
import { app, BrowserWindow, Menu, ipcMain, dialog } from "electron";
import { setTemplateMenu } from "./electron/Menu.controller";
import IPCMainCotroller from "./electron/ipcMain.controller";

const mainWindowHeight = 650;
const mainWindowWidth = 890;

app.on("ready", () => {
  const mainWindow: Electron.BrowserWindow = new BrowserWindow({
    center: true,
    height: mainWindowHeight,
    width: mainWindowWidth,
    title: "Order Folder",
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "sources/app.html"),
      protocol: "file",
      slashes: true,
    })
  );

  const ipcMainWindowController = new IPCMainCotroller(mainWindow);

  ipcMainWindowController.startIpcMain();

  mainWindow.on("closed", () => {
    app.quit();
  });

  const openSettings = () => {
    fs.readFile(
      __dirname + "\\sources\\json\\files.config.json",
      "utf-8",
      (err, data) => {
        if (err) {
          console.log("error: ", err);
        } else {
          ipcMainWindowController.openSettins(data);
        }
      }
    );
  };

  const templateMenu = setTemplateMenu(app, openSettings);
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);
});

if (process.env.NODE_ENV !== "production")
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
