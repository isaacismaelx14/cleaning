import { ipcMain } from "electron";
import { dialog } from "electron/main";

export default class IPCMainCotroller {
  private window: Electron.BrowserWindow;
  constructor(target: Electron.BrowserWindow) {
    this.window = target;
  }

  public startIpcMain() {
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
