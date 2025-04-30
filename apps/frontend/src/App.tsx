import React from 'react';
import { Routing } from './home-page/routing.tsx';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { DirectoryProvider } from './contexts/DirectoryContext.tsx';
import { RequestProvider } from './contexts/RequestContext.tsx';
import { NavigationProvider } from './contexts/NavigationContext.tsx';
import {
    createTheme,
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
import { TimelineProvider } from './HomePage/TimeLineContext.tsx';
import { Notifications } from '@mantine/notifications';
import { FilterProvider } from './contexts/FilterContext.tsx';
import { AlgorithmProvider } from './contexts/AlgorithmContext.tsx';

const themeGold: MantineColorsTuple = [
    '#FFF8EB',
    '#FDF0D5',
    '#FCDFA4',
    '#FCCD6F',
    '#FCBE45',
    '#FCB024',
    '#DB993C',
    '#D9932E',
    '#AC7018',
    '#96600A',
];

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
    '#0043ad',
];

const terquAccet: MantineColorsTuple = [
    '#ebfeff',
    '#d7fbfd',
    '#DBFBE6',
    '#7df3fb',
    '#61f0fb',
    '#56effa',
    '#4deefb',
    '#40d3df',
    '#2fbcc7',
    '#00a3ad',
];

const greys: MantineColorsTuple = [
    '#f1f4fe',
    '#e4e6ed', //MAIN GREY
    '#c8cad3',
    '#a9adb9',
    '#9094a3',
    '#7f8496',
    '#777c91',
    '#656a7e',
    '#595e72',
    '#4a5167',
];

const secondaryBlues: MantineColorsTuple = [
    '#eaf3ff',
    '#d6e2fa',
    '#acc2ee',
    '#7fa0e4',
    '#5a83db',
    '#4271d6',
    '#3568d4',
    '#2658bd', //MAIN REGULAR BLUE
    '#1d4eaa',
    '#0c4397',
];

const primaryBlues: MantineColorsTuple = [
    '#ebf2ff', //MAIN LIGHT BLUE FOR BACKGROUND
    '#d6e0f8',
    '#abbeee',
    '#7d9ae5',
    '#577bdd',
    '#4068d9',
    '#325ed8',
    '#254ec0',
    '#1d45ad', //MAIN DARK BLUE
    '#0e3b99',
];

const yellowAccent: MantineColorsTuple = [
    '#fff9e2',
    '#fef2ce',
    '#fbe49f',
    '#f8d56b', //MAIN ONE
    '#f6c841',
    '#f4c025',
    '#f4bc14',
    '#d9a504',
    '#c19200',
    '#a77e00',
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
        xxxs: rem(12),
        xxs: rem(14),
        xs: rem(16),
        sm: rem(16), //subheadings, etc
        md: rem(18),
        lg: rem(22), //section headers,
        xl: rem(30), //dont use this unless you have a good reason
        xxl: rem(36), //dont use this
        xxxl: rem(57), //use this for the hero section but not much else
    },
    fontFamily: 'Inter, sans-serif',

    headings: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '300',
        sizes: {
            h1: { fontSize: '300' },
            h2: { fontSize: '400' },
        },
    },

    colors: {
        blueBase,
        terquAccet,
        greys,
        themeGold,
        secondaryBlues,
        primaryBlues,
        yellowAccent,
    },
    primaryShade: { light: 6, dark: 9 },
    defaultRadius: 30,

    // variantColorResolver: myvariantColorResolver(theme)
});
function App() {
    return (
        <MantineProvider theme={theme}>
            <Notifications />
            <DirectoryProvider>
                <RequestProvider>
                    <NavigationProvider>
                        <TimelineProvider>
                            <FilterProvider>
                                <AlgorithmProvider>
                                    <Routing />
                                </AlgorithmProvider>
                            </FilterProvider>
                        </TimelineProvider>
                    </NavigationProvider>
                </RequestProvider>
            </DirectoryProvider>
        </MantineProvider>
    );
}

export default App;
