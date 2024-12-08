import { contextBridge, ipcRenderer } from "electron";

// 在控制台輸出以確認 preload script 已載入
console.log('Preload script is running');

try {
    // 確保 contextBridge 可用
    if (!contextBridge) {
        throw new Error('contextBridge is not available');
    }

    // 暴露 API 到 window 對象
    contextBridge.exposeInMainWorld('electronAPI', {
        sendMessage: (channel: string, data: any) => {
            console.log('Sending message through preload bridge:', { channel, data });
            ipcRenderer.send(channel, data);
        },
        onMessage: (channel: string, callback: (data: any) => void) => {
            ipcRenderer.on(channel, (event, ...args) => callback(args[0]));
        }
    });

    console.log('electronAPI has been exposed to window object');
} catch (error) {
    console.error('Error in preload script:', error);
}
