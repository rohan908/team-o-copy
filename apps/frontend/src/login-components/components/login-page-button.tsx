import React, {useState} from 'react';
import "./login-stylesheet.css"

interface ButtonProps {
    onClick: () => void;
    children?: React.ReactNode;
    variant: 'primary' | 'secondary';
    disabled: boolean;
    popupContent?: React.ReactNode; // Content that will make up the popup (no popup will show if not passed)
    popupTitle?: string;
}

const LogInPageButton = ({ onClick, children, variant, disabled, popupContent, popupTitle = "Title Not Found" }: ButtonProps) => {
    const [open, setOpen] = useState(false);

    return (
        <button
            className={`flex-1 ${variant == 'primary' ? ' bg-blue-600 hover:bg-blue-400 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} font-semibold py-2 px-4 rounded border border-gray-400`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// Export the component so it can be used in other files
export default LogInPageButton;