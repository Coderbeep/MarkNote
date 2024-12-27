export interface FileItem {
    filename: string;
    path: string;
    isDirectory: boolean;
    children?: FileItem[];
    isOpen?: boolean;
    level?: number;
}