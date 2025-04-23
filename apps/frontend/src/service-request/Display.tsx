import React from 'react';
import { Box, Flex, useMantineTheme, Text, Button } from '@mantine/core';

interface DisplayProps {
    data: { title: string; value: string | undefined }[];
    onBack: () => void;
}
const Display: React.FC<DisplayProps> = ({ data, onBack }) => {
    const theme = useMantineTheme();

    // Safely handle missing state

    return (
        <Flex w="100%" h="100vh" align="center" direction="column" p="xl">
            <Text size="xl" fw={700} mb="lg" c="#2658bd">
                Service Request Submitted
            </Text>
            <Box
                p="xl"
                w="100%"
                maw="600px"
                bg="#D6E0F8"
                /*Border Radius is only possible through style prop afaik -Connor*/
            >
                {data.map((item, idx) => (
                    <Text mb="sm" key={idx} c="#2658bd">
                        <strong>{item.title}:</strong> {item.value}
                    </Text>
                ))}
                <Box mr="auto" mt="lg">
                    <Button radius="md" onClick={onBack} bg="#5A83DB" style={{ width: '100px' }}>
                        Back
                    </Button>
                </Box>
            </Box>
        </Flex>
    );
};

export default Display;
