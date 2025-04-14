import React from 'react';
import {Routing} from './home-page/routing.tsx';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { createTheme,
    MantineProvider,
    MantineColorsTuple,
    rem,
    VariantColorsResolver,
    Group,
    defaultVariantColorsResolver,
    parseThemeColor,
    rgba,
    darken,
    MantineRadiusValues,
} from '@mantine/core';

const blueBase: MantineColorsTuple = [
    '#ebf2ff',
    '#d3e2fa',
    '#a2c2f7',
    '#6fa0f6',
    '#4883f5',
    '#3371f5',
    '#2a68f7',
    '#1f58dc',
    '#164ec5',
    '#0043ad'
];

const terquAccet: MantineColorsTuple = [
    '#ebfeff',
    '#d7fbfd',
    '#aaf7fc',
    '#7df3fb',
    '#61f0fb',
    '#56effa',
    '#4deefb',
    '#40d3df',
    '#2fbcc7',
    '#00a3ad'
];

const greys: MantineColorsTuple = [
    '#f1f4fe',
    '#e4e6ed',
    '#c8cad3',
    '#a9adb9',
    '#9094a3',
    '#7f8496',
    '#777c91',
    '#656a7e',
    '#595e72',
    '#4a5167'
];

const myvariantColorResolver: VariantColorsResolver = (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    const parsedColor = parseThemeColor({
        color: input.color || input.theme.primaryColor,
        theme: input.theme,
    });

    // Override some properties for variant
    if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
        return {
            ...defaultResolvedColors,
            color: 'var(--mantine-color-black)',
            hoverColor: 'var(--mantine-color-black)',
        };
    }

    // Completely override variant
    if (input.variant === 'navButton') {
        return {
            // variant="outline",
            radius: 300,
            background: 'var(--mantine-color-blueBase-9)',
            hover: 'var(--mantine-color-white)',
            border: `1px solid ${parsedColor.value}`,
            color: 'var(--mantine-color-white)',
        };
    }

    // Add new variants support
    if (input.variant === 'danger') {
        return {
            background: 'var(--mantine-color-red-9)',
            hover: 'var(--mantine-color-red-8)',
            color: 'var(--mantine-color-white)',
            border: 'none',
        };
    }

    return defaultResolvedColors;
};

const theme = createTheme({
    /** Your theme override here */
    fontSizes: {
        xxs: rem(10),
        xs: rem(12),
        sm: rem(14),
        md: rem(16),
        lg: rem(18),
        xl: rem(28),
        xxl: rem(36),
        xxxl: rem(48),
    },

    fontFamily: 'Roboto, sans-serif',
    headings: { fontFamily: 'Roboto slab, sans-serif' },
    colors: {
        blueBase,
        terquAccet,
        greys,
    },
    primaryShade: { light: 6, dark: 9 },
    defaultRadius: 30,

    // variantColorResolver: myvariantColorResolver(theme)

});
function App() {

    return (
            <MantineProvider theme={theme}>
            <Routing />
        </MantineProvider>
    );
}

export default App;
