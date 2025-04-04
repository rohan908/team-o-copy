import React from 'react';

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode;

}

const LogInPopUp = ({ isOpen, onClose, title, children }: PopUpProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <br/>
                <div className="mb-2">{children}</div>
            </div>
        </div>
    );
};
export default LogInPopUp;