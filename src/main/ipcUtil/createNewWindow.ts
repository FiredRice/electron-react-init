import path from 'path';
import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import MenuBuilder from '../menu';
import { getAssetPath } from '../main';
import { resolveHtmlPath } from '../util';

let newWindow: BrowserWindow | null = null;

export const createUniqueWindow = (url: string) => {
    if (newWindow == null) {
        newWindow = new BrowserWindow({
            width: 800,
            height: 600,
            center: true,
            icon: getAssetPath('icon.png'),
            webPreferences: {
                preload: app.isPackaged
                    ? path.join(__dirname, 'preload.js')
                    : path.join(__dirname, '../../../.erb/dll/preload.js'),
            },
        });

        newWindow.loadURL(resolveHtmlPath('index.html'));

        newWindow.on('ready-to-show', () => {
            if (!newWindow) {
                throw new Error('"newWindow" is not defined');
            }
            if (process.env.START_MINIMIZED) {
                newWindow.minimize();
            } else {
                newWindow.show();
                newWindow.focus();
            }
        });

        newWindow.on('show', () => {
            newWindow?.webContents.send('redirect-window', url);
        });

        newWindow.on('closed', () => {
            newWindow = null;
        });

        const menuBuilder = new MenuBuilder(newWindow);
        menuBuilder.buildMenu();
    } else {
        newWindow.focus();
    }
};

export const createNewWindow = (url: string, options?: BrowserWindowConstructorOptions) => {
    const baseOptions = {
        width: 800,
        height: 600,
        center: true,
        icon: getAssetPath('icon.png'),
        webPreferences: {
            preload: app.isPackaged
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, '../../../.erb/dll/preload.js'),
        },
    };

    let newWindow: BrowserWindow | null = new BrowserWindow(Object.assign({}, baseOptions, options));

    newWindow.loadURL(resolveHtmlPath('index.html'));

    newWindow.on('ready-to-show', () => {
        if (!newWindow) {
            throw new Error('"newWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            newWindow.minimize();
        } else {
            newWindow.show();
            newWindow.focus();
        }
    });

    newWindow.on('show', () => {
        newWindow?.webContents.send('redirect-window', url);
    });

    newWindow.on('closed', () => {
        newWindow = null;
    });

    const menuBuilder = new MenuBuilder(newWindow);
    menuBuilder.buildMenu();
};
