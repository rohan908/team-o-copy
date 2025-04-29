import { Box, useMantineTheme } from '@mantine/core';
import { AboutPage } from '../AboutPage/Aboutpage.tsx';
import { CreditPage } from './CreditPage.tsx';

export default function CombinedPage() {
    const theme = useMantineTheme();

    return (
        <>
            {/*Courtesy of Ethan R.*/}
            <AboutPage />
            <Box bg={theme.colors.yellowAccent[3]} w="100%" h="2px" />
            {/*Courtesy of Camden B.*/}
            <CreditPage />
        </>
    );
}
