import { ipcMain } from "electron";
import { dialog } from "electron/main";
import * as fs from "fs";
export default class IPCMainCotroller {
  private window: Electron.BrowserWindow;
  private pathJson: string;

  constructor(target: Electron.BrowserWindow, path: string) {
    this.window = target;
    this.pathJson = path;
  }

  public startIpcMain() {
    fs.readFile(this.pathJson + "files.config.json", "utf-8", (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        this.window.webContents.send("get:list", data);
      }
    });

    ipcMain.on("select:folder", (e, FolderPath) => {
      FolderPath = dialog.showOpenDialogSync(this.window, {
        properties: ["openDirectory"],
      });
      this.window.webContents.send("selected:folder", FolderPath);
    });
  }
  /**
   * launchSettings
   */
  public launchSettings(callbak: Function) {
    ipcMain.on("lauch:settings", () => {
      callbak();
    });
  }
  /**
   * openSettins
   */
  public openSettins(data: unknown) {
    this.window.webContents.send("open:settings", data);
  }
}
