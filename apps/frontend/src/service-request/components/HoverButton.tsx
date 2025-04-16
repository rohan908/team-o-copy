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
            c="blueBase.9"
            radius="lg"
            w="300"
            h="250"
            bg="themeGold.0"
            style={{
                padding: '1.5rem',
                shadow: 'lg',
                backdropBlur: 'sm"',
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
