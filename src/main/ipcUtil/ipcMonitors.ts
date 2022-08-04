import { BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';
import { getAssetPath } from '../main';
import { createNewWindow } from './createNewWindow';

/**
 * 主进程与渲染进程通信监听
 */
export default class IpcRenders {
    private mainWindow: BrowserWindow | null;
    private store: Store;

    constructor() {
        this.mainWindow = null;
        this.store = new Store();
        this.init();
    }

    public setMainWindow(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow;
    }

    public getMainWindow() {
        return this.mainWindow;
    }

    public getStore() {
        return this.store;
    }

    private init() {
        // 获取资源路径
        ipcMain.on('get-asset-path', (event, ...paths) => {
            event.returnValue = getAssetPath(...paths);
        });

        // 新建窗口，并跳转到url
        ipcMain.on('create-new-window', (event, url) => {
            createNewWindow(url);
        });

        ipcMain.on('electron-store-get', async (event, val) => {
            event.returnValue = this.store.get(val);
        });

        ipcMain.on('electron-store-set', (event, key, val) => {
            this.store.set(key, val);
        });

        ipcMain.on('electron-store-clear', (event) => {
            this.store.clear();
        });
    }
}
