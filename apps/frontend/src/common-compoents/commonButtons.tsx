import React, { ReactNode } from 'react';
import { Button, Group, Title, UnstyledButton } from '@mantine/core';

interface CustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: string;
    onClick?: () => void;
    disabled?: boolean;
    bg?: string;
}

interface ColorChangingButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    leftSection?: React.ReactNode;
    onClick?: () => void;
    w?: string;
    disabled?: boolean;
    firstColor?: string;
    secondColor?: string;
    ValueToCheck: string;
    ValueForTrigger?: string;
    borderRadius?: string;
    size?: string;
    icon?: React.ReactNode;
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

export const ColorChangingButton: React.FC<ColorChangingButtonProps> = ({
    children,
    onClick,
    ...props
}) => (
    <Button
        size={props.size}
        ff="Inter"
        fw="400"
        bg={props.ValueToCheck === props.ValueForTrigger ? props.firstColor : props.secondColor}
        onClick={onClick}
        leftSection={props.leftSection}
        fullWidth={false}
        style={{
            borderRadius: props.borderRadius,
            transition: 'all 0.4s ease',
        }}
        {...props}
    >
        {children}
    </Button>
);

export const SidebarButton: React.FC<ColorChangingButtonProps> = ({
    children,
    onClick,
    icon,
    ...props
}) => {
    const firstColor = 'primaryBlues.9';
    const secondColor = 'secondaryBlues.7';
    return (
        <UnstyledButton
            c={props.ValueToCheck === props.ValueForTrigger ? firstColor : secondColor}
            onClick={onClick}
            style={{
                transition: 'all 0.4s ease',
            }}
            {...props}
        >
            <Group gap="xs">
                {icon}
                <Title>{children}</Title>
            </Group>
        </UnstyledButton>
    );
};
