import { Flex, Grid, Title, useMantineTheme } from '@mantine/core';
import { CustomTimeline } from './CustomTimeline.tsx';
import { useState } from 'react';
import { ContentSwitcher } from './ContentSwitcher.tsx';
import { TimelineProvider } from './TimeLineContext.tsx';

export function HomePage() {
    const theme = useMantineTheme();

    return (
        <TimelineProvider>
            <Flex h="100vh" p="md" justify="center" align="center" bg={theme.colors.terquAccet[1]}>
                <Grid h="100%" gutter="xl" justify="center" align="stretch">
                    <Grid.Col span={6} p="xl">
                        <Title order={1} size="h1">
                            Welcome to Mass Brigham
                        </Title>
                    </Grid.Col>

                    <Grid.Col span={6} p="xl"></Grid.Col>

                    <Grid.Col span={6} p="xl">
                        <CustomTimeline />
                    </Grid.Col>

                    <Grid.Col span={6} p="xl">
                        <ContentSwitcher />
                    </Grid.Col>
                </Grid>
            </Flex>
        </TimelineProvider>
    );
}
