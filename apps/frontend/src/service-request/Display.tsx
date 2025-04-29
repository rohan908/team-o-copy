import React from 'react';
import { Box, Flex, Text, Button } from '@mantine/core';

interface DisplayProps {
    data: { title: string; value: string | undefined }[];
    onBack: () => void;
}

const Display: React.FC<DisplayProps> = ({ data, onBack }) => {
    return (
        <Box p="xl" bg="#ebf2ff">
            <Text
                size="xl"
                fw={700}
                mb="lg"
                c="#2658bd"
                ta="center"
                style={{ borderBottom: '1px solid #2658bd', paddingBottom: '8px' }}
            >
                Service Request Submitted
            </Text>

            <Box mb="xl">
                {data.map((item, idx) => (
                    <Flex key={idx} mb="sm" gap="sm">
                        <Text fw={600} c="#2658bd" style={{ minWidth: '140px' }}>
                            {item.title}:
                        </Text>
                        <Text c="#2658bd">{item.value || 'Not specified'}</Text>
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};

export default Display;
