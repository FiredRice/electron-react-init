import { ipcRenderer } from 'electron';

function useRender() {
    return {
        // 获取资源路径
        getAssetPath(...paths: string[]): string {
            return ipcRenderer.sendSync('get-asset-path', ...paths);
        },
        // 路由重定向
        redirectWindow(call: (url: string) => void) {
            ipcRenderer.on('redirect-window', (event, url) => {
                call && call(url);
            });
        },
        /**
         * 新建窗口
         * @param {string} url: react路由
         */
        createNewWindow(url: string) {
            ipcRenderer.send('create-new-window', url);
        },
    };
}

export default useRender;
