import {Box, Flex, Grid, Stack, Title, useMantineTheme} from '@mantine/core';
import { CustomTimeline } from './CustomTimeline.tsx';
import { useState } from 'react';
import { ContentSwitcher } from './ContentSwitcher.tsx';
import { TimelineProvider } from './TimeLineContext.tsx';
import { HoverUnderline } from '../common-compoents/HoverUnderline.js';

export function HomePage() {
    const theme = useMantineTheme();

    return (
          <Flex h="100%" justify="center" align="center" bg={theme.colors.terquAccet[1]}> {/* background */}
            <Flex justify={'space-around'} wrap={'wrap'} > {/*row flex of info inputs and picture side by side*/}
                <Stack h={"90%"} pt={"xl"}>
                  <HoverUnderline>
                    <Title order={1}>How can We Help?</Title> {/* h1 heading */}
                  </HoverUnderline>
                </Stack>
                <Image src
            </Flex>
          </Flex>
    );
}
