import React, { ReactNode } from 'react';
import { Box, Divider, Flex, Title } from '@mantine/core';

interface BoxProps {
    title: string;
    subtitle;
    lowerPart;
}

export const standAloneFrame: React.FC<BoxProps> = ({ title, ...props }) => {
    return (
        <Flex w="100%" h="100vh" justify="center" align="center" pl={{ md: '20%', sm: '0%' }}>
            <Box
                bg="white"
                p={{ base: 'xl', sm: '2rem', md: '3rem' }}
                w="100%"
                maw={{ base: '90%', sm: '70%', md: '600px' }}
                pos="relative"
                style={{
                    opacity: 0.85,
                    borderRadius: theme.radius.lg,
                    backdropFilter: 'blur(5px)',
                }}
            >
                <Title
                    order={1}
                    mb={{ base: 'md', sm: 'lg', md: 'xl' }}
                    c="black"
                    ta="left"
                    fw={700}
                    fz={{ sm: 'xl', md: 'xxxl' }}
                >
                    {title}
                </Title>

                <Divider variant={'dotted'} size={'lg'} mb={'lg'} />
            </Box>
        </Flex>
    );
};
