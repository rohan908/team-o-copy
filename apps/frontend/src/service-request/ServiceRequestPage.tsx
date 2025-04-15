import { Box, Button, Flex, SimpleGrid, Stack } from '@mantine/core';
import { IconLanguage, IconExclamationCircleFilled } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';
export function ServiceRequestPage() {
    const navigate = useNavigate();
    return (
        <>
            <Box bg="themeGold.0">
                <Flex w="100%" h="100vh" justify="center" align="center">
                    {/* basic grid for button layout*/}
                    <SimpleGrid cols={3} spacing="50">
                        {/* button for language interpreter request*/}
                        <Button
                            key={'Interpreter Request'}
                            style={{
                                width: 300,
                                height: 300,
                                padding: '1.5rem',
                                backgroundColor: '#003A97',
                            }}
                            onClick={() => navigate('/language-form')}
                        >
                            <Stack align="center">
                                <IconLanguage size={120} />
                                <span>{'Interpreter Request'}</span>
                            </Stack>
                        </Button>
                        {/* button for ___ Request */}
                        <Button
                            key={'Type'}
                            style={{
                                width: 300,
                                height: 300,
                                padding: '1.5rem',
                                backgroundColor: '#003A97',
                            }}
                            onClick={() => navigate('/')}
                        >
                            <Stack align="center">
                                <IconExclamationCircleFilled size={120} />
                                <span>{'Type'}</span>
                            </Stack>
                        </Button>
                        {/* button for ___ Request */}
                        <Button
                            key={'Type'}
                            style={{
                                width: 300,
                                height: 300,
                                padding: '1.5rem',
                                backgroundColor: '#003A97',
                            }}
                            onClick={() => navigate('/')}
                        >
                            <Stack align="center">
                                <IconExclamationCircleFilled size={120} />
                                <span>{'Type'}</span>
                            </Stack>
                        </Button>
                        {/* button for ___ Request */}
                        <Button
                            key={'Type'}
                            style={{
                                width: 300,
                                height: 300,
                                padding: '1.5rem',
                                backgroundColor: '#003A97',
                            }}
                            onClick={() => navigate('/')}
                        >
                            <Stack align="center">
                                <IconExclamationCircleFilled size={120} />
                                <span>{'Type'}</span>
                            </Stack>
                        </Button>
                        {/* button for ___ Request */}
                        <Button
                            key={'Type'}
                            style={{
                                width: 300,
                                height: 300,
                                padding: '1.5rem',
                                backgroundColor: '#003A97',
                            }}
                            disabled={true}
                        >
                            <Stack align="center">
                                <IconExclamationCircleFilled size={120} />
                                <span>{'Type'}</span>
                            </Stack>
                        </Button>
                        {/* button for ___ Request */}
                        <Button
                            key={'Type'}
                            style={{
                                width: 300,
                                height: 300,
                                padding: '1.5rem',
                                backgroundColor: '#003A97',
                            }}
                            disabled={true}
                        >
                            <Stack align="center">
                                <IconExclamationCircleFilled size={120} />
                                <span>{'Type'}</span>
                            </Stack>
                        </Button>
                    </SimpleGrid>
                </Flex>
            </Box>
        </>
    );
}
export default ServiceRequestPage;
