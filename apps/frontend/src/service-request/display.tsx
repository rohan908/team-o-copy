import React from 'react';
import { useLocation } from 'react-router-dom';
import {Box, Flex, useMantineTheme} from "@mantine/core";


export function Display() {
    const theme = useMantineTheme();


    const location = useLocation();
    const {
        label,
        selectedDate,
        selectedTime,
        roomNumber,
        requestDescription,
    } = location.state || {}; // fallback for safety

    return (
        <div>

            <br/>
            <Flex
                w-="100%"
                h="100%"
                justify="center"
                align="center"
                direction="column"
            >
                <h1 style={{textAlign: 'center'}}> Service Request Submitted</h1>
                <Box
                    bg="greys.1"
                    p={{ md: '2rem' }}
                    w="100%"
                    maw={{ base: '90%', sm: '70%', md: '600px' }}
                    pos="relative"
                    style={{
                        opacity: 0.85,
                        borderRadius: theme.radius.md,
                        backdropFilter: 'blur(5px)',
                    }}


                    >

                    <div>
                        <p><strong>Language:</strong> {label}</p>
                        <p><strong>Date:</strong> {selectedDate}</p>
                        <p><strong>Time:</strong> {selectedTime}</p>
                        <p><strong>Room:</strong> {roomNumber}</p>
                        <p><strong>Details:</strong> {requestDescription || 'N/A'}</p>
                    </div>
                </Box>
            </Flex>
        </div>
    );
}
