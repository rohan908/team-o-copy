import { Box, Button, Flex, SimpleGrid, Title, Stack } from '@mantine/core';
import { IconLanguage, IconExclamationCircleFilled } from '@tabler/icons-react';
import HoverButton from './components/HoverButton.tsx';
import { useNavigate } from 'react-router-dom';
export function ServiceRequestPage() {
    const navigate = useNavigate();
    return (
        <div>
            <Box bg="themeGold.0" py="xl">
                <Flex w="100%" h="85.5vh" justify="center" align="center">
                    <Stack>
                        <Title order={2} ta="left" c={'#001D4D'} mb="lg">
                            Select Request Type:
                        </Title>
                        {/* basic grid for button layout*/}
                        <SimpleGrid cols={3} spacing="50">
                            {/* button for language interpreter request*/}
                            <HoverButton
                                icon={<IconLanguage size={120} />}
                                label="Interpreter Request"
                                onClick={() => navigate('/language-form')}
                            />

                            {/* button for ___ Request */}
                            <HoverButton
                                icon={<IconExclamationCircleFilled size={120} />}
                                label="Type 2"
                                onClick={() => navigate('/')}
                            />
                            {/* button for ___ Request */}
                            <HoverButton
                                icon={<IconExclamationCircleFilled size={120} />}
                                label="Sanitation Request"
                                onClick={() => navigate('/sanitation-form')}
                            />
                            {/* button for ___ Request */}
                            <HoverButton
                                icon={<IconExclamationCircleFilled size={120} />}
                                label="Type 4"
                                onClick={() => navigate('/')}
                            />
                            {/* button for ___ Request */}
                            <HoverButton
                                icon={<IconExclamationCircleFilled size={120} />}
                                label="Type 5"
                                onClick={() => navigate('/')}
                                disabled={true}
                            />
                            {/* button for ___ Request */}
                            <HoverButton
                                icon={<IconExclamationCircleFilled size={120} />}
                                label="Type 6"
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
