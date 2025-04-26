import React, { ReactNode } from 'react';
import { Button } from '@mantine/core';

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
  disabled?: boolean;
  bg?: string;
  w?: string;
  firstColor: string;
  secondColor: string;
  ValueToCheck: string;
  ValueForTrigger: string;
  borderRadius: string;
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
      w={props.w}
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
};
