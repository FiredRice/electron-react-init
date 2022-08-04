import useRender from 'main/preload/useRender';
import useStore from 'main/preload/useStore';

export type IpcRenders = ReturnType<typeof useRender>;

export type Store = ReturnType<typeof useStore>;

declare global {
    interface Window {
        electron: {
            ipcRenderer: IpcRenders;
            store: Store;
        };
    }
}
