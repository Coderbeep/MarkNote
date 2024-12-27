import { FileItem } from '@shared/models';
import { useState, useEffect, memo } from 'react';
import { GoSearch, GoPlus, GoFile, GoFileDirectory } from 'react-icons/go';

interface FileExplorerProps {
    directoryPath: string;
    onFileSelect: (filePath: string) => void;
}

interface FileItemProps {
    file: FileItem;
    openDirectories: Record<string, boolean>;
    onFileSelect: (filePath: string) => void;
    onDirectorySelect: (directoryPath: string) => void;
    level: number;
}

const FileItemComponent = memo(({ file, openDirectories, onFileSelect, onDirectorySelect, level }: FileItemProps) => {
    return (
        <div>
            <div
                className='file-explorer-item'
                style={{ marginLeft: `${level}em` }}
                onClick={() => {
                    if (file.isDirectory) {
                        onDirectorySelect(file.path);
                    } else {
                        onFileSelect(file.path);
                    }
                }}
            >
                {file.isDirectory ? <GoFileDirectory /> : <GoFile />}
                <span> {file.filename} </span>
            </div>

            {file.isDirectory && openDirectories[file.path] && file.children && file.children.map((childFile) => (
                <FileItemComponent
                    key={childFile.path}
                    file={childFile}
                    openDirectories={openDirectories}
                    onFileSelect={onFileSelect}
                    onDirectorySelect={onDirectorySelect}
                    level={level + 1} />
            ))}
        </div>
    );
});

export const FileExplorer = memo(({ directoryPath, onFileSelect }: FileExplorerProps) => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [openDirectories, setOpenDirectories] = useState<Record<string, boolean>>({});

    const fetchFiles = async (directoryPath: string) => {
        try {
            const result = await window['api'].getFiles(directoryPath);
            return result;
        } catch (err) {
            console.error('Error fetching files:', err);
            return [];
        }
    };

    useEffect(() => {
        const loadFiles = async () => {
            const result = await fetchFiles(directoryPath);
            setFiles(result);
        };

        loadFiles();
    }, [directoryPath]);

    const onDirectorySelect = async (directoryPath: string) => {
        const isOpen = openDirectories[directoryPath] || false;

        if (isOpen) {
            setOpenDirectories(prevState => ({
                ...prevState,
                [directoryPath]: false,
            }));

            setFiles(prevFiles => collapseDirectory(prevFiles, directoryPath));
        } else {
            const children = await fetchFiles(directoryPath);

            setFiles(prevFiles => expandDirectory(prevFiles, directoryPath, children));
            setOpenDirectories(prevState => ({
                ...prevState,
                [directoryPath]: true,
            }));
        }
    };

    const collapseDirectory = (files: FileItem[], directoryPath: string): FileItem[] => {
        let newFiles: FileItem[] = [];

        for (const file of files) {
            if (file.path === directoryPath) {
                newFiles.push({ ...file, isOpen: false, children: [] });
                continue;
            }
            if (file.path.startsWith(directoryPath)) {
                setOpenDirectories(prevState => {
                    const newState = {...prevState};
                    delete newState[file.path];
                    return newState
                })
                continue
            }
                
            newFiles.push(file)
        }
        return newFiles;
    };

    const expandDirectory = (files: FileItem[], directoryPath: string, children: FileItem[]): FileItem[] => {
        let newFiles: FileItem[] = [];
        for (const file of files) {
            newFiles.push(file);
            if (file.path === directoryPath) {
                newFiles.push(
                    ...children.map(child => ({
                        ...child,
                        level: (file.level || 0) + 1,
                    }))
                );
            }
        }
        return newFiles;
    };

    return (
        <div className='file-explorer'>
            <div className="file-explorer-header">
                <div className='file-explorer-button add-button'>
                    <GoPlus />
                    <span> Add content </span>
                </div>
                <div className='file-explorer-button search-button'>
                    <GoSearch />
                </div>
            </div>
            <div className="file-explorer-category">
                <span>Notes</span>
            </div>
            <div className='file-explorer-list'>
                {files.map((file) => (
                    <FileItemComponent
                        key={file.path}
                        file={file}
                        openDirectories={openDirectories}
                        onFileSelect={onFileSelect}
                        onDirectorySelect={onDirectorySelect}
                        level={file.level || 0}
                    />
                ))}
            </div>
        </div>
    );
});