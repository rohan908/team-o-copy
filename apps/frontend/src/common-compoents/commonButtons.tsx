import React, { ReactNode } from 'react';
import { Button } from '@mantine/core';

interface CustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: string;
    onClick?: () => void;
    disabled?: boolean;
    bg?: string;
}

interface ColorChangingButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  bg?: string;
  firstColor: string;
  secondColor: string;
  numValueToCheck: number;
  numForTrigger: number;
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
    ...props}) => {
  return (
    <Button
      size="sm"
      ff="Inter"
      fw="400"
      w="100%"
      bg={props.numValueToCheck == props.numForTrigger ? props.firstColor : props.secondColor}
      onClick={onClick}
      fullWidth={false}
      style={{
        borderRadius: '8px',
        transition: 'all 0.4s ease',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
