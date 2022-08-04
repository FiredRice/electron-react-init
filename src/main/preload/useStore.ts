import { ipcRenderer } from 'electron';

function useStore() {
    return {
        get(val: string) {
            return ipcRenderer.sendSync('electron-store-get', val);
        },
        set(property: string, val: any) {
            ipcRenderer.send('electron-store-set', property, val);
        },
        clear() {
            ipcRenderer.send('electron-store-clear');
        }
    };
}

export default useStore;
