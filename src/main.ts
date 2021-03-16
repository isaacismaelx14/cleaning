import url from "url";
import path from "path";
import * as fs from "fs";
import { app, BrowserWindow, Menu } from "electron";
import { setTemplateMenu } from "./electron/Menu.controller";
import IPCMainCotroller from "./electron/ipcMain.controller";

const mainWindowHeight = 650;
const mainWindowWidth = 890;
const pathJson = __dirname + "\\sources\\json\\";

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
  const ipcMainWindowController = new IPCMainCotroller(mainWindow, pathJson);

  const openSettings = () => {
    fs.readFile(pathJson + "files.config.json", "utf-8", (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        ipcMainWindowController.openSettins(data);
      }
    });
  };

  const templateMenu = setTemplateMenu(app, openSettings);
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);

  ipcMainWindowController.startIpcMain();
  ipcMainWindowController.launchSettings(openSettings);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "sources/app.html"),
      protocol: "file",
      slashes: true,
    })
  );

  mainWindow.on("closed", () => {
    app.quit();
  });
});

// if (process.env.NODE_ENV !== "production")
//   require("electron-reload")(__dirname, {
//     electron: path.join(__dirname, "node_modules", ".bin", "electron"),
//   });
