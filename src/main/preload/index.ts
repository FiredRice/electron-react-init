import { contextBridge } from 'electron';
import useRender from './useRender';
import useStore from './useStore';

contextBridge.exposeInMainWorld('electron', {
    store: useStore(),
    ipcRenderer: useRender(),
});
