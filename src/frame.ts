import { Platform, Notice } from "obsidian";
import { CustomFrameSettings, CustomFramesSettings, getId } from "./settings";
import { ipcMain } from "electron";

export class CustomFrame {
    private readonly settings: CustomFramesSettings;
    private readonly data: CustomFrameSettings;
    private frame: HTMLIFrameElement | any;

    constructor(settings: CustomFramesSettings, data: CustomFrameSettings) {
        this.settings = settings;
        this.data = data;
    }

    create(parent: HTMLElement, additionalStyle: string = undefined, urlSuffix: string = undefined): void {
        let style = `padding: ${this.settings.padding}px;`;
        if (additionalStyle)
            style += additionalStyle;
        console.log(`Creating frame for URL ${this.data.url} with style ${style}`);

        if (Platform.isDesktopApp && !this.data.forceIframe) {
            console.log('Creating webview - Branch 1');
            let frameDoc = parent.doc;
            this.frame = frameDoc.createElement("webview");
            
            // 設置 preload script
            try {
                const app = require('@electron/remote').app;
                const path = require('path');
                const preloadPath = path.join(app.getAppPath(), 'main-preload.js');
                console.log('Setting preload script path:', preloadPath);
                this.frame.setAttribute('preload', preloadPath);
                this.frame.setAttribute('nodeintegration', 'true');
                this.frame.setAttribute('webpreferences', 'contextIsolation=true');
            } catch (error) {
                console.error('Error setting preload script:', error);
            }
            
            this.frame.setAttribute("allowpopups", "");
            parent.appendChild(this.frame);
            
            // 設置 URL
            const targetUrl = urlSuffix ? this.data.url + urlSuffix : this.data.url;
            this.frame.setAttribute("src", targetUrl);
            
            this.frame.addEventListener("dom-ready", () => {
                console.log('Webview dom-ready event fired');
                this.frame.setZoomFactor(this.data.zoomLevel);
                this.frame.insertCSS(this.data.customCss);
                
                // 檢查 preload script 是否正確載入
                this.frame.executeJavaScript(`
                    console.log('Window object:', Object.keys(window));
                    console.log('Checking electronAPI availability:', window.electronAPI);
                    if (!window.electronAPI) {
                        console.error('electronAPI is not available in the webview');
                    }
                `).then(() => {
                    console.log('Executed API check');
                    this.frame.executeJavaScript(this.data.customJs);
                }).catch(err => {
                    console.error('Error executing API check:', err);
                });
            });
            
            this.frame.addEventListener("ipc-message", (event: any) => {
                console.log("Received IPC message:", event);
                if (event.channel === 'custom-frame-message') {
                    const message = event.args[0];
                    if (message.action === 'save-content') {
                        console.log(`Received content to save in frame: ${message.filename}`);
                        new Notice(`Content received: ${message.filename}`);
                    }
                }
            });

            this.frame.addEventListener("console-message", (event: any) => {
                console.log('Webview console:', event.message);
            });

            this.frame.addEventListener("destroyed", () => {
                console.log('Webview destroyed event fired');
                if (frameDoc != parent.doc) {
                    this.frame.detach();
                    this.create(parent, additionalStyle, urlSuffix);
                }
            });
        } else {
            console.log('Creating iframe - Branch 2');
            this.frame = parent.ownerDocument.createElement("iframe");
            parent.appendChild(this.frame);
            this.frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox");
            style += `transform: scale(${this.data.zoomLevel}); transform-origin: 0 0;`;
        }

        this.frame.classList.add("custom-frames-frame");
        this.frame.classList.add(`custom-frames-${getId(this.data)}`);
        this.frame.setAttribute("style", style);
    }

    refresh(): void {
        if (this.frame instanceof HTMLIFrameElement) {
            this.frame.contentWindow.location.reload();
        } else {
            this.frame.reload();
        }
    }

    return(): void {
        if (this.frame instanceof HTMLIFrameElement) {
            this.frame.contentWindow.open(this.data.url);
        } else {
            this.frame.loadURL(this.data.url);
        }
    }

    goBack(): void {
        if (this.frame instanceof HTMLIFrameElement) {
            this.frame.contentWindow.history.back();
        } else {
            this.frame.goBack();
        }
    }

    goForward(): void {
        if (this.frame instanceof HTMLIFrameElement) {
            this.frame.contentWindow.history.forward();
        } else {
            this.frame.goForward();
        }
    }

    toggleDevTools(): void {
        if (!(this.frame instanceof HTMLIFrameElement)) {
            if (!this.frame.isDevToolsOpened()) {
                this.frame.openDevTools();
            } else {
                this.frame.closeDevTools();
            }
        }
    }

    getCurrentUrl(): string {
        return this.frame instanceof HTMLIFrameElement ? 
            this.frame.contentWindow.location.href : 
            this.frame.getURL();
    }

    focus(): void {
        if (this.frame instanceof HTMLIFrameElement) {
            this.frame.contentWindow.focus();
        } else {
            this.frame.focus();
        }
    }
}
