/// <reference types="vite/client" />

declare global {
    interface Window {
        api: {
            openFolderDialog: () => Promise<string[]>;
            getFiles: (folderPath: string) => Promise<string[]>;
        };
    }
}