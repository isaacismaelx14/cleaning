import url from "url";
import path from "path";
import * as fs from "fs";
import { app, BrowserWindow, Menu, ipcMain, dialog } from "electron";

const mainWindowHeight = 650;
const mainWindowWidth = 890;

if (process.env.NODE_ENV !== "production")
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });

let mainWindow: Electron.BrowserWindow;
let newProductWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    center: true,
    height: mainWindowHeight,
    width: mainWindowWidth,
    // maximizable: false,
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
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("closed", () => {
    app.quit();
  });
});

function createSetupFoldersWindow() {
  newProductWindow = new BrowserWindow({
    width: 500,
    height: 460,
    title: "Add new product",
    // fullscreenable: false,
    // maximizable: false,
    // minimizable: false,
    // resizable: false,
    // parent: mainWindow,
    // modal: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });
  newProductWindow.menuBarVisible = false;
  newProductWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "sources/setup.html"),
      protocol: "file",
      slashes: true,
    })
  );
}

ipcMain.on("product:new", (e, newProduct) => {
  mainWindow.webContents.send("product:new", newProduct);
  newProductWindow.close();
});

ipcMain.on("select:folder", (e, FolderPath) => {
  FolderPath = dialog.showOpenDialogSync(mainWindow, {
    properties: ["openDirectory"],
  });
  mainWindow.webContents.send("selected:folder", FolderPath);
});

const openSettings = () => {
  fs.readFile(
    __dirname + "\\sources\\json\\files.config.json",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        mainWindow.webContents.send("open:settings", data);
      }
    }
  );
};

const templateMenu: Electron.MenuItemConstructorOptions[] = [
  {
    label: "File",
    submenu: [
      {
        label: "Exit",
        accelerator: process.platform == "darwin" ? "comand+q" : "Ctrl+Q",
        click() {
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
        click() {
          openSettings();
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
        click(item, focusedWindow: any) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}
