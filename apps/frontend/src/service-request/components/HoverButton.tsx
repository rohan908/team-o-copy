import React, { useState, useCallback } from 'react';
import { Button, Stack, Transition, Overlay } from '@mantine/core';
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
          border: '10px solid #003A97',
          transform: hovered ? `rotateX(${xRotation(250)/5}deg) rotateY(${yRotation(300)/5}deg) scale(1.1)` : 'scale(1)',
          transition: "all 0.25s linear",
          perspective: "100px",
          boxShadow: hovered ? '10px 10px 20px 10px rgba(36, 36, 36, 0.5)' : '10px 10px 20px rgba(36, 36, 36, 0.5)',

        }}
      >
        <Overlay style={{
          padding: '1.5rem',
          backgroundColor: hovered ? '#002B70' : '#003A97',
          transition: "all 0.25s linear",}}>
          <Stack align="center"
                 style={{
                   transform: hovered ? `translate3d(${yRotation(250)/5}px, ${-xRotation(300)/5}px, 20px) scale(0.9)` : `translateZ(0px)`,
                   transition: "all 0.25s linear",
                 }}>
            {icon}
            <span>{label}</span>
          </Stack>
        </Overlay>
      </Button>
  );
};

export default HoverButton;
