import { useState, useEffect, memo } from 'react';
import { GoSearch, GoPlus, GoFile } from 'react-icons/go';

interface FileExplorerProps {
    directoryPath: string;
    onFileSelect: (filePath: string) => void;
}

export const FileExplorer = memo(({ directoryPath, onFileSelect }: FileExplorerProps) => {
    const [files, setFiles] = useState<string[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const result = await window['api'].getFiles(directoryPath);
                setFiles(result);
            } catch (err) {
                console.error('Error fetching files:', err);
            }
        };

        fetchFiles();
    }, [directoryPath]);

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
                    <div className='file-explorer-item'
                        key={file}
                        onClick={() => onFileSelect(file)}
                    >
                        <GoFile /> {file}
                    </div>
                ))}
            </div>
        </div>
    );
});

