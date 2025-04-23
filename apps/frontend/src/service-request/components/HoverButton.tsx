import React, { useState, useCallback } from 'react';
import { Button, Stack, Text, Transition, Overlay, useMantineTheme } from '@mantine/core';
import { useHover, useMouse, useMergedRef } from '@mantine/hooks';

interface HoverButtonProps {
  icon: React.ReactNode;
  labelOne: string;
  labelTwo: string;
  onClick?: () => void;
  disabled?: boolean;
}
// exporting to own file to utilize useState to change color on hover
// component for large service request buttons
const HoverButton: React.FC<HoverButtonProps> = ({ icon, labelOne, labelTwo, onClick, disabled = false }) => {
    const theme = useMantineTheme();
    const { hovered, ref: hoverRef } = useHover();
    const { x, y, ref: mouseRef } = useMouse({ resetOnExit: true });

    // limits the button rotation, lower = bigger effect
    const rotationConstrain: number = 5;

    const mergedRef = useMergedRef(hoverRef, mouseRef);

    const xRotation = useCallback(
        (buttonHeight: number) => {
            return -(y - buttonHeight / 2) / rotationConstrain;
        },
        [y]
    );

    const yRotation = useCallback(
        (buttonWidth: number) => {
            return (x - buttonWidth / 2) / rotationConstrain;
        },
        [x]
    );

    // in-line styling is needed for the CSS hover effects
    // one hard-coded color for meeting the style guide
    return (
        <Button
            ref={mergedRef}
            disabled={disabled}
            onClick={onClick}
            style={{
                borderRadius: "8px",
                width: 250,
                height: 220,
                padding: '0.5rem',
                border: hovered ? '10px solid' + "#285CC6" : '10px solid' + "#5A83DB",
                transform: hovered
                    ? `rotateX(${xRotation(250)}deg) rotateY(${yRotation(300)}deg) scale(1.1)`
                    : 'scale(1)',
                transition: 'all 0.25s linear',
                perspective: '100px',
                boxShadow: hovered ? '10px 10px 20px 5px rgba(36, 36, 36, 0.5)' : '00px 00px 0px',
            }}
        >
            <Overlay
                style={{
                    padding: '1.5rem',
                    // the one hard-coded color from style guide, not in mantine yet
                    backgroundColor: hovered ? '#285CC6' : "#5A83DB", //this hardcoded color is going to fuck us up later but today is tommarrows yesterday
                    transition: 'all 0.25s linear',
                }}
            >
                <Stack
                    align="center"
                    style={{
                        transform: hovered
                            ? `translate3d(${yRotation(250)}px, ${-xRotation(300)}px, 20px) scale(0.9)`
                            : `translateZ(0px)`,
                        transition: 'all 0.25s linear',
                    }}
                >
                    {icon}
                  <Text>
                    {labelOne + " "}
                    {labelTwo}
                  </Text>
                </Stack>
            </Overlay>
        </Button>
    );
};

export default HoverButton;
