export const defaultSettings: CustomFramesSettings = {
    frames: [],
    padding: 5
};
export const presets: Record<string, CustomFrameSettings> = {
    "obsidian": {
        url: "https://forum.obsidian.md/",
        displayName: "Obsidian Forum",
        icon: "edit",
        hideOnMobile: true,
        addRibbonIcon: true,
        openInCenter: true,
        zoomLevel: 1,
        forceIframe: false,
        customCss: "",
        customJs: ""
    },
    "detexify": {
        url: "https://detexify.kirelabs.org/classify.html",
        displayName: "Detexify",
        icon: "type",
        hideOnMobile: true,
        addRibbonIcon: true,
        openInCenter: false,
        zoomLevel: .95,
        forceIframe: false,
        customCss: `/* hide info clutter and ad banner */
#classify--info-area,
.adsbygoogle {
	display: none !important
}`,
        customJs: ""
    },
    "calendar": {
        url: "https://calendar.google.com/calendar",
        displayName: "Google Calendar",
        icon: "calendar",
        hideOnMobile: true,
        addRibbonIcon: true,
        openInCenter: true,
        zoomLevel: 1,
        forceIframe: false,
        customCss: `/* hide the menu bar "Calendar" text and remove minimum width */
div[style*="min-width: 238px"] {
    min-width: 0 !important;
    padding-right: 0 !important;
}
div[style*="min-width: 238px"] span[role*="heading"] {
    display: none !important;
}`,
        customJs: ""
    },
    "keep": {
        url: "https://keep.google.com",
        displayName: "Google Keep",
        icon: "files",
        hideOnMobile: true,
        addRibbonIcon: false,
        openInCenter: false,
        zoomLevel: 1,
        forceIframe: false,
        customCss: `/* hide the menu bar, the "Keep" text and the Google Apps button */
html > body > div:nth-child(2) > div:nth-child(2) > div:first-child,
html > body > div:first-child > header:first-child > div > div:first-child > div > div:first-child > a:first-child > span,
html > body > div:first-child > header:first-child > div:nth-child(2) > div:first-child > div:first-child,
html > body > div:first-child > header:first-child > div:nth-child(2) > div:nth-child(3) > div:first-child > div:first-child > div:first-child {
	display: none !important;
}
html > body > div:first-child > header:first-child > div > div:first-child > div > div:first-child > a:first-child {
	cursor: default;
}`,
        customJs: ""
    },
    "todoist": {
        url: "https://todoist.com",
        displayName: "Todoist",
        icon: "list-checks",
        hideOnMobile: true,
        addRibbonIcon: false,
        openInCenter: false,
        zoomLevel: 1,
        forceIframe: false,
        customCss: `/* hide the help, home, search, and productivity overview buttons, create extra space, and prevent toast pop-up from acting weird */
                    [aria-label="Go to Home view"], #quick_find, [aria-label="Productivity"], [aria-label="Help & Feedback"] {
                        display: none !important;
                    }

                    .view_content {
                        padding-left: 15px;
                    }

                    .view_header {
                        padding-left: 15px;
                        padding-top: 10px;
                    }

                    .undo_toast {
                        width: 95%;
                    }`,
        customJs: ""
    },
    "notion": {
        url: "https://www.notion.so/",
        displayName: "Notion",
        icon: "box",
        hideOnMobile: true,
        addRibbonIcon: true,
        openInCenter: true,
        zoomLevel: 1,
        forceIframe: false,
        customCss: "",
        customJs: ""
    },
    "twitter": {
        url: "https://twitter.com",
        displayName: "Twitter",
        icon: "twitter",
        hideOnMobile: true,
        addRibbonIcon: false,
        openInCenter: false,
        zoomLevel: 1,
        forceIframe: false,
        customCss: "",
        customJs: ""
    },
    "tasks": {
        url: "https://tasks.google.com/embed/?origin=https://calendar.google.com&fullWidth=1",
        displayName: "Google Tasks",
        icon: "list-checks",
        hideOnMobile: true,
        addRibbonIcon: false,
        openInCenter: false,
        zoomLevel: 1,
        forceIframe: false,
        customCss: "",
        customJs: ""
    },
    "readwise-daily-review": {
        "url": "https://readwise.io/dailyreview",
        "displayName": "Readwise Daily Review",
        "icon": "highlighter",
        "hideOnMobile": true,
        "addRibbonIcon": false,
        "openInCenter": false,
        "zoomLevel": 1,
        "forceIframe": false,
        "customCss": ".fixed-nav {\n    display: none !important;\n}",
        "customJs": ""
    },
    "chatgpt": {
        url: "https://chat.openai.com",
        displayName: "ChatGPT",
        icon: "aperture",
        hideOnMobile: true,
        addRibbonIcon: true,
        openInCenter: false,
        zoomLevel: 1,
        forceIframe: false,
        customCss: `
            .copy-button {
                position: absolute;
                bottom: 8px;
                right: 8px;
                padding: 4px 8px;
                background: rgba(0, 0, 0, 0.1);
                border: 1px solid #ccc;
                border-radius: 3px;
                color: white;
                cursor: pointer;
                font-size: 12px;
                transition: background-color 0.3s ease;
            }
            .copy-button:hover {
                background: rgba(0, 0, 0, 0.2);
            }
            .save-button {
                position: absolute;
                bottom: 8px;
                right: 8px;
                padding: 4px 8px;
                background: rgba(0, 0, 0, 0.1);
                border: 1px solid #ccc;
                border-radius: 3px;
                color: white;
                cursor: pointer;
                font-size: 12px;
                transition: background-color 0.3s ease;
                z-index: 1000;
            }
            .save-button:hover {
                background: rgba(0, 0, 0, 0.2);
            }
            .markdown {
                position: relative;
            }
            pre {
                position: relative;
            }
        `,
        customJs: `
                function addButtons() {
                    // 定期檢查並添加按鈕
                    setInterval(() => {
                        const responses = document.querySelectorAll('.markdown:not(.has-save-button)');
                        responses.forEach((response, index) => {
                            response.classList.add('has-save-button');
                            const saveButton = document.createElement('button');
                            saveButton.className = 'save-button';
                            saveButton.textContent = 'Save';
                            
                            saveButton.onclick = async () => {
                                const content = response.textContent;
                                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                                const filename = 'chatgpt-response-' + timestamp + '.md';
                                
                                try {
                                    console.log('Sending message via electronAPI...');
                                    window.electronAPI.sendMessage('custom-frame-message', {
                                        action: 'save-content',
                                        filename: filename,
                                        content: content
                                    });
                                    saveButton.textContent = 'Sent';
                                    console.log('Message sent successfully');
                                } catch (error) {
                                    console.error('Failed to send message:', error);
                                    saveButton.textContent = 'Error!';
                                }

                                setTimeout(() => {
                                    saveButton.textContent = 'Save';
                                }, 2000);
                            };
                            
                            response.appendChild(saveButton);
                        });

                        // 處理程式碼區塊的複製按鈕
                        const codeBlocks = document.querySelectorAll('pre:not(.copy-button-added)');
                        codeBlocks.forEach(block => {
                            block.classList.add('copy-button-added');
                            if (block.querySelector('code')) {
                                const button = document.createElement('button');
                                button.className = 'copy-button';
                                button.textContent = 'Copy';
                                button.onclick = function() {
                                    const code = block.querySelector('code').textContent;
                                    const textArea = document.createElement('textarea');
                                    textArea.value = code;
                                    document.body.appendChild(textArea);
                                    textArea.select();
                                    try {
                                        document.execCommand('copy');
                                        button.textContent = 'Copied!';
                                        console.log('Copy successfully');
                                    } catch (err) {
                                        console.error('Failed to copy:', err);
                                        button.textContent = 'Failed!';
                                    }
                                    document.body.removeChild(textArea);
                                    setTimeout(() => {
                                        button.textContent = 'Copy';
                                    }, 2000);
                                };

                                block.appendChild(button);
                            }
                        });
                    }, 1000);
                }

                // Add buttons when the page loads
                addButtons();
        `
    },
};

export interface CustomFramesSettings {
    frames: CustomFrameSettings[];
    padding: number;
}

export interface CustomFrameSettings {
    url: string;
    displayName: string;
    icon: string;
    hideOnMobile: boolean;
    addRibbonIcon: boolean;
    openInCenter: boolean;
    zoomLevel: number;
    forceIframe: boolean;
    customCss: string;
    customJs: string;
}

export function getIcon(settings: CustomFrameSettings) {
    return settings.icon ? `lucide-${settings.icon}` : "documents";
}

export function getId(settings: CustomFrameSettings) {
    return settings.displayName.toLowerCase().replace(/\s/g, "-");
}
