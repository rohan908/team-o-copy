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
    labelOne: string;
    labelTwo: string;
    icon: React.ReactNode;
    link: string;
    disabled?: boolean | true;
};

export const ServiceRequestItems: ServiceRequestItem[] = [
    {
        labelOne: 'Interpreter',
        labelTwo: 'Request',
        icon: <IconLanguage size={120} />,
        link: '/language-form' },
    {
        labelOne: 'Security',
        labelTwo: 'Request',
        icon: <IconShieldHalf size={120} />,
        link: '/security-form' },
    {
        labelOne: 'Sanitation',
        labelTwo: 'Request',
        icon: <IconTrash stroke={2} size={120} />,
        link: '/sanitation-form',
    },
    {
        labelOne: 'Maintenance',
        labelTwo: 'Request',
        icon: <IconBellExclamation stroke={2} size={120} />,
        link: '/maintenance-form',
    },
    {
        labelOne: 'Type 5',
        labelTwo: '',
        icon: <IconExclamationCircleFilled size={120} />,
        link: "'/'",
        disabled: true,
    },
    {
        labelOne: 'Type 6',
        labelTwo: '',
        icon: <IconExclamationCircleFilled size={120} />,
        link: "'/'",
        disabled: true,
    },
];

export function ServiceRequestPage() {
    const navigate = useNavigate();
    return (
        <div>
            <Box py="xl">
                <Flex w="100%" h="65vh" justify="center" align="center">
                    <Stack>
                        <Title order={2} ta="left" c={'#001D4D'} mb="lg">
                            Select Request Type:
                        </Title>
                        {/* basic grid for button layout*/}
                        <SimpleGrid cols={3} spacing="30">
                            {ServiceRequestItems.map((item, index) => (
                                <HoverButton
                                    key={index}
                                    icon={item.icon}
                                    labelOne={item.labelOne}
                                    labelTwo={item.labelTwo}
                                    onClick={() => navigate(item.link)}
                                    disabled={item.disabled}
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
