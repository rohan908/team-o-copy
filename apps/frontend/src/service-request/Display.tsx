import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Flex, useMantineTheme, Text, Button } from '@mantine/core';

interface DisplayProps {
    data: { title: string; value: string | undefined }[];
    onBack: () => void;
}
const Display: React.FC<DisplayProps> = ({ data, onBack }) => {
    const theme = useMantineTheme();
    const location = useLocation();

    // Safely handle missing state

    return (
        <Flex
            w="100%"
            h="100vh"
            align="center"
            direction="column"
            p="xl"
            style={{
                backgroundImage: `radial-gradient(circle at center, white 0%, ${theme.colors.blue[0]} 100%)`,
            }}
        >
            <Text size="xl" fw={700} mb="lg">
                Service Request Submitted
            </Text>
            <Box
                p="xl"
                w="100%"
                maw="600px"
                bd="3px solid"
                bg="#D6E0F8"
                /*Border Radius is only possible through style prop afaik -Connor*/
                style={{
                    borderRadius: theme.radius.md,
                }}
            >
                {data.map((item, idx) => (
                    <Text mb="sm" key={idx}>
                        <strong>{item.title}:</strong> {item.value}
                    </Text>
                ))}
                <Box mr="auto" mb="lg">
                    <Button radius="md" onClick={onBack} bg="#5A83DB" style={{ width: '100px' }}>
                        Back
                    </Button>
                </Box>
            </Box>
        </Flex>
    );
};

export default Display;
