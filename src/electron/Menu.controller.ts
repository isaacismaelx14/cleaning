export function setTemplateMenu(
  app: Electron.App,
  openSettings: Function
): Electron.MenuItemConstructorOptions[] {
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
  return templateMenu;
}
