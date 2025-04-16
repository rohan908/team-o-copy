import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Flex, useMantineTheme, Text } from '@mantine/core';

export function Display() {
    const theme = useMantineTheme();
    const location = useLocation();

    // Safely handle missing state
    if (!location.state?.requestData) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Text>No submission data found. Please submit the form again.</Text>
            </Flex>
        );
    }
    const { requestData } = location.state;

    return (
        <Flex w="100%" h="100vh" align="center" direction="column" p="xl">
            <Text size="xl" fw={700} mb="lg">
                Service Request Submitted
            </Text>
            <Box
                bg="gray.1"
                p="xl"
                w="100%"
                maw="600px"
                style={{
                    borderRadius: theme.radius.md,
                    border: '3px solid',
                    borderColor: '#90EE90',
                }}
            >
                {requestData.map((item, idx) => (
                    <Text mb="sm" key={idx}>
                        <strong>{item.title}:</strong> {item.value}
                    </Text>
                ))}
            </Box>
        </Flex>
    );
}

export default Display;
