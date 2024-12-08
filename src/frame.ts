import { Platform, Notice } from "obsidian";
import { CustomFrameSettings, CustomFramesSettings, getId } from "./settings";
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
            console.log('Creating webview');
            let frameDoc = parent.doc;
            this.frame = frameDoc.createElement("webview");
            parent.appendChild(this.frame);
            this.frame.setAttribute("allowpopups", "");            
            this.frame.addEventListener("dom-ready", () => {
                this.frame.setZoomFactor(this.data.zoomLevel);
                this.frame.insertCSS(this.data.customCss);
                this.frame.executeJavaScript(this.data.customJs);
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
            console.log('Creating iframe');
            this.frame = parent.ownerDocument.createElement("iframe");
            parent.appendChild(this.frame);
            this.frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox");
            style += `transform: scale(${this.data.zoomLevel}); transform-origin: 0 0;`;
        }
        this.frame.classList.add("custom-frames-frame");
        this.frame.classList.add(`custom-frames-${getId(this.data)}`);
        this.frame.setAttribute("style", style);
        let src = this.data.url;
        if (urlSuffix) {
            if (!urlSuffix.startsWith("/"))
                src += "/";
            src += urlSuffix;
        }
        this.frame.setAttribute("src", src);
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
