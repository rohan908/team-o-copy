import React, { useState } from 'react';
import {
    Box,
    TextInput,
    Button,
    Group,
    useMantineTheme,
    Title,
    Flex,
    Text,
    Divider,
    Stack,
} from '@mantine/core';
import { useLogin } from './LoginContext';
import { useNavigate } from 'react-router-dom';
import { BasicOutlinedButton, BlackButton } from '../../common-compoents/commonButtons.tsx';
import { TwoPartInteractiveBox } from '../../common-compoents/standAloneFrame.tsx';

const LogInBox = () => {
    const theme = useMantineTheme();
    const { isLoggedIn, login, logout } = useLogin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState<'success' | 'error' | ''>('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const success: boolean = login(username, password);
        setLoginStatus(success ? 'success' : 'error');
        setUsername('');
        setPassword('');

        if (success) {
            setTimeout(() => {
                navigate('/map-API');
            }, 1000);
        }
    };

    const handleLogout = () => {
        logout();
        setLoginStatus('');
    };

    return (
        <Flex w="100%" h="100vh" justify="center" align="center" pl={{ md: '20%', sm: '0%' }}>
            <TwoPartInteractiveBox
                title="Let's Get Started"
                subtitle="Looking for Directions?"
                subContents={
                    <>
                        <Stack gap="0">
                            <BasicOutlinedButton onClick={() => navigate('/map-API')}>
                                Get Directions!
                            </BasicOutlinedButton>

                            <Text py="xs" ta="left" fz={{ base: 'md' }}>
                                Use our interactive map to find departments, parking, and efficient
                                routes
                            </Text>
                        </Stack>
                    </>
                }
            >
                {!isLoggedIn ? (
                    <>
                        <Stack w="100%">
                            <Box>
                                <Text fz={{ base: 'lg' }}>Login here for Staff:</Text>
                                <TextInput
                                    placeholder="Username"
                                    mt="md"
                                    mb="md"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <TextInput
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Box>
                            {/*<Group justify="flex-start" w="100%">*/}
                            <BlackButton
                                onClick={handleLogin}
                                disabled={!username || !password}
                                style={{ width: 'fit-content' }}
                            >
                                Login
                            </BlackButton>
                            {/*</Group>*/}
                            {loginStatus && (
                                <Text
                                    mt="md"
                                    c={loginStatus === 'success' ? 'green' : 'red'}
                                    fw={600}
                                >
                                    {loginStatus === 'success'
                                        ? 'Welcome back!'
                                        : 'Incorrect username or password.'}
                                </Text>
                            )}
                        </Stack>
                    </>
                ) : (
                    <Group justify="space-between" mt="xl">
                        <Text c="green" fw={600}>
                            Logged in as admin
                        </Text>
                        <Button
                            variant="light"
                            color="red"
                            onClick={handleLogout}
                            style={{ borderRadius: '50px' }}
                        >
                            Log Out
                        </Button>
                    </Group>
                )}
            </TwoPartInteractiveBox>
        </Flex>
    );
};

export default LogInBox;
