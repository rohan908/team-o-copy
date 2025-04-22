import React, { useState } from 'react';
import { Button, Stack, Text } from '@mantine/core';

interface HoverButtonProps {
  icon: React.ReactNode;
  labelOne: string;
  labelTwo: string;
  onClick?: () => void;
  disabled?: boolean;
}
// exporting to own file to utilize useState to change color on hover
const HoverButton: React.FC<HoverButtonProps> = ({ icon, labelOne, labelTwo, onClick, disabled = false }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "8px",
        width: 250,
        height: 200,
        padding: '0.5rem',
        backgroundColor: hovered ? '#285CC6' : '#5A83DB',
      }}
    >
      <Stack align="center" h="100%">
        {icon}
        <Text>
          {labelOne + " "}
          {labelTwo}
        </Text>
      </Stack>
    </Button>
  );
};

export default HoverButton;
