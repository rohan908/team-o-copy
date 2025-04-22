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
export function ServiceRequestPage() {
    const navigate = useNavigate();
    return (
        <div>
            <Box py="xl">
                <Flex w="100%" h="60vh" justify="center" align="center">
                    <Stack>
                        <Title order={2} ta="left" c={'#001D4D'} mb="lg">
                            Select Request Type:
                        </Title>
                        {/* basic grid for button layout*/}
                        <SimpleGrid cols={3} spacing="30">
                            {/* button for language interpreter request*/}
                            <HoverButton
                                icon={<IconLanguage size={120} />}
                                labelOne="Interpreter"
                                labelTwo="Request"
                                onClick={() => navigate('/language-form')}
                            />

                            {/* button for Security Service Request */}
                            <HoverButton
                                icon={<IconShieldHalf size={120} />}
                                labelOne="Security"
                                labelTwo="Request"
                                onClick={() => navigate('/security-form')}
                            />
                            {/* button for Sanitization Request */}
                            <HoverButton
                                icon={<IconTrash stroke={2} size={120} />}
                                labelOne="Sanitization"
                                labelTwo="Request"
                                onClick={() => navigate('/sanitation-form')}
                            />
                            {/* button for Maintenance Request */}
                            <HoverButton
                                icon={<IconBellExclamation stroke={2} size={120} />}
                                labelOne="Maintenance"
                                labelTwo="Request"
                                onClick={() => navigate('/maintenance-form')}
                            />
                            {/* button for ___ Request */}
                            <HoverButton
                                icon={<IconExclamationCircleFilled size={120} />}
                                labelOne="Type 5"
                                labelTwo=""
                                onClick={() => navigate('/')}
                                disabled={true}
                            />
                            {/* button for ___ Request */}
                            <HoverButton
                                icon={<IconExclamationCircleFilled size={120} />}
                                labelOne="Type 6"
                                labelTwo=""
                                onClick={() => navigate('/')}
                                disabled={true}
                            />
                        </SimpleGrid>
                    </Stack>
                </Flex>
            </Box>
        </div>
    );
}
export default ServiceRequestPage;
