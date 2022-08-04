import { IpcRenders, Store } from 'renderer/models/preload';
import { getObject } from 'renderer/utils';

export const useIpcRenders = () => {
    const result = getObject<IpcRenders>(window, 'electron.ipcRenderer');
    return result;
};

export const useStore = () => {
    const result = getObject<Store>(window, 'electron.store');
    return result;
};
