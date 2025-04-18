import React, { useState, useCallback } from 'react';
import { Button, Stack, Transition } from '@mantine/core';
import { useHover, useMouse, useMergedRef } from '@mantine/hooks';

interface HoverButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}
// exporting to own file to utilize useState to change color on hover
const HoverButton: React.FC<HoverButtonProps> = ({ icon, label, onClick, disabled = false }) => {
  const { hovered, ref: hoverRef } = useHover();
  const { x, y, ref: mouseRef } = useMouse({ resetOnExit: true});

  const mergedRef = useMergedRef(
    hoverRef,
    mouseRef
  );

  const xRotation = useCallback((buttonHeight: number) => {
    return -(y - buttonHeight/2);
  }, [y])

  const yRotation = useCallback((buttonWidth: number) => {
    return (x - buttonWidth/2);
  }, [x])

  return (
      <Button
        ref={mergedRef}
        disabled={disabled}
        onClick={onClick}
        style={{
          width: 300,
          height: 250,
          padding: '1.5rem',
          backgroundColor: hovered ? '#002B70' : '#003A97',
          transform: hovered ? `rotateX(${xRotation(250)/3}deg) rotateY(${yRotation(300)/3}deg) scale(1.1)` : 'scale(1)',
          transition: "all 0.25s linear",
          perspective: "100px",
          boxShadow: '10px 10px 20px rgba(36, 36, 36, 0.5)',
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

/*
<Transition
  mounted={hovered}
  transition="scale"
  duration={500}
  timingFunction="ease"
>
  {transitionStyle => (

  )}
</Transition>

 */
