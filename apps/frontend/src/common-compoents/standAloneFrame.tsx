import React, { ReactNode, PropsWithChildren } from 'react';
import { Box, Divider, Flex, Title, Text, useMantineTheme } from '@mantine/core';
import { reactContent, WithChildren } from './props.tsx';

interface BoxProps extends WithChildren {
    title?: string;
    subtitle?: string;
    subContents?: ReactNode;
    // lowerPart;
}

export const StandAloneFrame: React.FC<PropsWithChildren<BoxProps>> = ({
    children,
    title,
    subtitle,
    subContents,
    ...props
}) => {
    const theme = useMantineTheme();

    return (
        <Box
            bg="themeGold.0"
            p={{ base: 'sm', sm: 'sm', md: 'sm', lg: 'md' }}
            // w={{ base: '90%', sm: '70%', md: '600px' }}
            maw={{ base: '400px', sm: '400px', md: '500px', lg: '600px' }}
            pos="relative"
            display="inline-block"
            opacity=".87"
            style={{
                borderRadius: theme.radius.lg,
                backdropFilter: 'blur(5px)',
            }}
        >
            <Title
                order={1}
                // mb={{ base: 'md', sm: 'lg', md: 'xl' }}
                pt="xs"
                pb="xxs"
                px="sm"
                c="black"
                ta="left"
                fw={500}
                fz="xxxl" //{{ base: 'xxxl', xs: 'xxxl', sm: 'xxxl', md: 'xxxl' }}
            >
                {title}
            </Title>

            <Text
                px="md"
                mb="sm"
                ta="left"
                fz="sm"
                c="dimmed"
                fw={500}
                style={{
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                }}
            >
                {subtitle}
            </Text>
            <Flex px="md" pb="xs">
                {subContents}
            </Flex>

            <Divider
                px="xs"
                variant={'dotted'}
                size={'lg'}
                // mb={'lg'}
                color="themeGold.4 "
            />

            <Flex py="xs" px="sm">
                {children}
            </Flex>
        </Box>
    );
};
