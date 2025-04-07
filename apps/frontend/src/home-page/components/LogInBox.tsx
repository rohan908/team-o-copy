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
} from '@mantine/core';
import { useLogin } from './LoginContext';
import { useNavigate } from 'react-router-dom';
const LogInBox = () => {
    const theme = useMantineTheme();
    const { isLoggedIn, login, logout } = useLogin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState<'success' | 'error' | ''>('');
    const navigate = useNavigate();


    const handleLogin = () => {
        const success = login(username, password);
        setLoginStatus(success ? 'success' : 'error');
        setUsername('');
        setPassword('');
    };

    const handleLogout = () => {
        logout();
        setLoginStatus('');
    };

    return (
        <Flex w="100%" h="100vh" justify="center" align="center" pl={{ md: '20%', sm: '0%' }}>
            <Box
                bg="white"
                p={{ base: 'xl', sm: '2rem', md: '3rem' }}
                w="100%"
                maw={{ base: '90%', sm: '70%', md: '600px' }}
                pos="relative"
                style={{
                    opacity: 0.85,
                    borderRadius: theme.radius.lg,
                    backdropFilter: 'blur(5px)',
                }}
            >
                <Title order={1} mb={{ base: 'md', sm: 'lg', md: 'xl' }} c="black" ta="left" fw={700} fz={{ sm: 'xl', md: 'xxxl' }}>
                    Let's get started
                </Title>

                <Text mb="md" ta="left">Looking for directions?</Text>

                <Flex gap="md" wrap="wrap" mb={{ base: 'xs' }}>
                    <Button variant="outline" color="dark"
                            onClick={()=>navigate('/map-page')}
                            style={{
                        borderRadius: '20px',
                        transition: 'all 0.3s ease',
                        fontSize: 'clamp(12px, 3vw, 18px)',
                    }}>
                        Find Your Way Now
                    </Button>
                    <Text mb="0" ta="left" fz={{ base: 'xs' }}>
                        Use our interactive map to find departments, parking, and efficient routes
                    </Text>
                </Flex>

                <Divider variant={'dotted'} size={'lg'} mb={'lg'} />

                {!isLoggedIn ? (
                    <>
                        <Box mb="md" ta="left">
                            Login here for Staff:
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
                        <Group justify="flex-start" w="100%">
                            <Button
                                size="md"
                                color="dark"
                                fw="600"
                                bg="black"
                                onClick={handleLogin}
                                disabled={!username || !password}
                                style={{ borderRadius: '50px', transition: 'all 0.3s ease' }}
                            >
                                Login
                            </Button>
                        </Group>
                        {loginStatus && (
                            <Text mt="md" c={loginStatus === 'success' ? 'green' : 'red'} fw={600}>
                                {loginStatus === 'success' ? 'Welcome back!' : 'Incorrect username or password.'}
                            </Text>
                        )}
                    </>
                ) : (
                    <Group justify="space-between" mt="xl">
                        <Text c="green" fw={600}>Logged in as admin</Text>
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
            </Box>
        </Flex>
    );
};

export default LogInBox;
