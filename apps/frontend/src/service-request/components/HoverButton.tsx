import React, { useState } from 'react';
import { Button, Stack } from '@mantine/core';

interface HoverButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}
// exporting to own file to utilize useState to change color on hover
const HoverButton: React.FC<HoverButtonProps> = ({ icon, label, onClick, disabled = false }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: 300,
                height: 300,
                padding: '1.5rem',
                backgroundColor: hovered ? '#002B70' : '#003A97',
            }}
        >
            <Stack align="center">
                {icon}
                <span>{label}</span>
            </Stack>
        </Button>
    );
};

export default HoverButton;
