// effect from: https://stackoverflow.com/questions/70906977/tailwind-underline-hover-animation
import { Box, BoxProps } from '@mantine/core';
import classes from './HoverUnderline.module.css';
import { PropsWithChildren } from 'react';
export function HoverUnderline({children, ...props}: PropsWithChildren<BoxProps>) {
    return (
        <Box className={classes.container} {...props}>
            {children}
            <div className={classes.underline} />
        </Box>
    );
}
