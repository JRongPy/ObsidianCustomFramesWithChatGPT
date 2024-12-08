import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    sendMessage: (channel: string, data: any) => ipcRenderer.send(channel, data),
    onMessage: (channel: string, callback: (data: any) => void) => {
        ipcRenderer.on(channel, (event, ...args) => {
            callback(args[0]); // 確保回調只接收數據部分
        });
    }
});

