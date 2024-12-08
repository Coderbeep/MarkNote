import React, { useEffect, useState } from 'react';
import contextMenuManager, { ContextMenuType } from './ContextMenuManager';

interface ContextMenuState {
    x: number;
    y: number;
    visible: boolean;
}

interface ContextMenuAction {
    label: string;
    action: () => void;
}
const CMImageContextMenu = () => {
    const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu({
            x: event.clientX,
            y: event.clientY,
            visible: true,
        });
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (contextMenu?.visible && !(event.target as HTMLElement).closest('.context-menu')) {
            setContextMenu(null);
        }
    };

    const handleMenuAction = (action: string) => {
        setContextMenu(null);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        contextMenuManager.registerMenu(ContextMenuType.Image, (data: any) => {
            setContextMenu({
                x: data.x,
                y: data.y,
                visible: true,
            });
        });

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const options = [
        { label: 'Option 1', action: () => handleMenuAction('Option 1') },
        { label: 'Option 2', action: () => handleMenuAction('Option 2') },
        { label: 'Option 3', action: () => handleMenuAction('Option 3') },
    ];

    return (
        <div onContextMenu={handleContextMenu} className="cm-image-widget-context">
            {contextMenu?.visible && (
                <div
                    className="context-menu"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    {options.map((option, index) => (
                        <div key={index} className="context-menu-item" onClick={option.action}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CMImageContextMenu;