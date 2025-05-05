import React from 'react';
import { Box, Flex, Text, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BasicOutlinedButton, BlackButton } from '../../common-compoents/commonButtons.tsx';
import { TwoPartInteractiveBox } from '../../common-compoents/standAloneFrame.tsx';
import { SignInButton, useUser } from '@clerk/clerk-react';

const LogInBox = () => {
    // change from handlers to clerk
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    return (
        <Flex w="100%" h="100vh" justify="center" align="center" pl={{ md: '20%', sm: '0%' }}>
            <TwoPartInteractiveBox
                bg={'#D6E0F8'}
                title="Let's Get Started"
                subtitle="Looking for Directions?"
                subContents={
                    <>
                        <Stack gap="0">
                            <BasicOutlinedButton onClick={() => navigate('/map-API')}>
                                Get Directions!
                            </BasicOutlinedButton>

                            <Text fw={500} py="xs" ta="left" fz={{ base: 'sm' }}>
                                Use our interactive map to find departments, parking, and efficient
                                routes
                            </Text>
                        </Stack>
                    </>
                }
            >
                {!isSignedIn ? (
                    <Stack gap="sm" w="100%">
                        <Box>
                            <Text fw={700} mb="sm" fz={{ base: 'md' }}>
                                Login here for Staff:
                            </Text>
                            <SignInButton mode="modal">
                                <BlackButton bg={'#285CC6'}>Login</BlackButton>
                            </SignInButton>
                        </Box>
                    </Stack>
                ) : (
                    <Stack gap="sm" w="100%"></Stack>
                )}
            </TwoPartInteractiveBox>
        </Flex>
    );
};

export default LogInBox;
