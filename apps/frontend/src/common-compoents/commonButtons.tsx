import React, { ReactNode } from 'react';
import { Button } from '@mantine/core';

interface CustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: string;
    onClick?: () => void;
    disabled?: boolean;
}

// <Button
//   variant="outline"
//   color="dark"
//   onClick={() => navigate('/map-page')}
//   style={{
//     borderRadius: '20px',
//     transition: 'all 0.3s ease',
//     fontSize: 'clamp(12px, 3vw, 18px)',
//   }}
// >
//   Find Your Way Now
// </Button>

export const BasicOutlinedButton: React.FC<CustomButtonProps> = ({
    children,
    onClick,
    ...props
}) => {
    return (
        <Button
            variant="outline"
            // display="inline-block"
            size="compact-md"
            color="dark"
            onClick={onClick}
            style={{
                width: 'fit-content',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                // fontSize: 'clamp(12px, 3vw, 18px)',
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
            style={{
                // width: 'fit-content',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

// <Button
//   size="md"
//   color="dark"
//   fw="600"
//   bg="black"
//   onClick={handleLogin}
//   disabled={!username || !password}
//   style={{ borderRadius: '50px', transition: 'all 0.3s ease' }}
// >
//   Login
// </Button>
