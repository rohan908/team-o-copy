import { Box, Button, Flex, SimpleGrid, Title, Stack } from '@mantine/core';
import {
    IconLanguage,
    IconExclamationCircleFilled,
    IconShieldHalf,
    IconTrash,
    IconBellExclamation,
} from '@tabler/icons-react';
import HoverButton from './components/HoverButton.tsx';
import { useNavigate } from 'react-router-dom';
import React from 'react';

type ServiceRequestItem = {
    label: string;
    icon: React.ReactNode;
    link: string;
    disabled?: boolean | true;
};
export const ServiceRequestItems: ServiceRequestItem[] = [
    { label: 'Interpreter Request', icon: <IconLanguage size={120} />, link: '/language-form' },
    { label: 'Security Request', icon: <IconShieldHalf size={120} />, link: '/security-form' },
    {
        label: 'Sanitization Request',
        icon: <IconTrash stroke={2} size={120} />,
        link: '/sanitation-form',
    },
    {
        label: 'Maintenance Request',
        icon: <IconBellExclamation stroke={2} size={120} />,
        link: '/maintenance-form',
    },
    {
        label: 'Type 5',
        icon: <IconExclamationCircleFilled size={120} />,
        link: "'/'",
        disabled: false,
    },
    {
        label: 'Type 6',
        icon: <IconExclamationCircleFilled size={120} />,
        link: "'/'",
        disabled: false,
    },
];

export function ServiceRequestPage() {
    const navigate = useNavigate();
    return (
        <div>
            <Box bg="terquAccet.2" py="xl">
                <Flex w="100%" h="85.5vh" justify="center" align="center">
                    <Stack>
                        <Title order={2} ta="left" c={'#001D4D'} mb="lg">
                            Select Request Type:
                        </Title>
                        {/* basic grid for button layout*/}
                        <SimpleGrid cols={3} spacing="50">
                            {ServiceRequestItems.map((item, index) => (
                                <HoverButton
                                    key={index}
                                    icon={item.icon}
                                    label={item.label}
                                    onClick={() => navigate(item.link)}
                                />
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Flex>
            </Box>
        </div>
    );
}
export default ServiceRequestPage;
