import React from 'react';
import {Button} from "@mantine/core";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant: 'primary' | 'secondary';
    disabled: boolean;
}

const ExampleButton = ({ onClick, children, variant, disabled }: ButtonProps) => {
    return (
        <Button
            variant="outline"
            color="blueBase.9"
            className="navButton"

            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

export default ExampleButton;
