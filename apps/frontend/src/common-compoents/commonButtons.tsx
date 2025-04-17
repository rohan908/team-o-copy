import React, { ReactNode } from 'react';
import { Button } from '@mantine/core';

interface CustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: string;
    onClick?: () => void;
    disabled?: boolean;
    bg?: string;
}

export const BasicOutlinedButton: React.FC<CustomButtonProps> = ({
    children,
    onClick,
    ...props
}) => {
    return (
        <Button
            variant="outline"
            size="compact-md"
            color="dark"
            onClick={onClick}
            fullWidth={false}
            style={{
                borderRadius: 'md',
                transition: 'all 0.3s ease',
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export const BlackButton: React.FC<CustomButtonProps> = ({ children, onClick, ...props }) => {
    return (
        <Button
            size="md"
            color="dark"
            fw="600"
            bg="black"
            onClick={onClick}
            fullWidth={false}
            style={{
                borderRadius: 'md',
                transition: 'all 0.3s ease',
            }}
            {...props}
        >
            {children}
        </Button>
    );
};
