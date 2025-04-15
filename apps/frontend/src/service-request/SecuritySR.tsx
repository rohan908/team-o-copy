import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Title, Paper, Box, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';

import TimeEntry from './components/TimeEntry';
import DateInputForm from './components/DateEntry';
import RoomNumberInput from './components/RoomEntry';
import RequestDescription from './components/RequestDescription';
import SecuritySelect from './components/SecuritySelect';
import HospitalSelect from './components/HospitalEntry.tsx';
import PriorityButtons from './components/PriorityButtons.tsx';

interface RequestData {
    service: string;
    date: string;
    room: string;
    time: string;
    priority: string;
    hospital: string;
    description: string;
}

function Security() {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const form = useForm<RequestData>({
        initialValues: {
            service: '',
            date: '',
            room: '',
            time: '',
            hospital: '',
            priority: '',
            description: '',
        },
    });

    const handleSubmit = async () => {
        const RequestData = form.values;
        const label = RequestData.service === '';

        try {
            const response = await fetch('/api/SecuritySR', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service: RequestData.service,
                    selectedDate: RequestData.date,
                    selectedTime: RequestData.time,
                    roomNumber: RequestData.room,
                    priority: RequestData.priority,
                    hospital: RequestData.hospital,
                    description: RequestData.description,
                }),
            });

            if (response.ok) {
                navigate('/submission', {
                    state: {
                        requestData: {
                            service: RequestData.service,
                            selectedDate: RequestData.date,
                            selectedTime: RequestData.time,
                            roomNumber: RequestData.room,
                            priority: RequestData.priority,
                            hospital: RequestData.hospital,
                            description: RequestData.description,
                        },
                    },
                });
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    return (
        <Flex justify="center" align="center" style={{ width: '100vw', padding: '2rem' }}>
            <Paper bg="gray.2" p="xl" shadow="xl" radius="md" w="65%">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Title order={2} ta="center" mb="lg">
                        Security Request Form
                    </Title>
                    <p
                        style={{
                            textAlign: 'center',
                            fontSize: '16px',
                        }}
                    >
                        Ethan Ramoth and Camden Brayton
                    </p>

                    <Flex gap="lg" wrap="wrap" mb="md">
                        <Box flex="1" miw="300px">
                            {' '}
                            {/*< column 1!!!*/}
                            <HospitalSelect required {...form.getInputProps('hospital')} />
                            <PriorityButtons {...form.getInputProps('priority')} />
                            <SecuritySelect required {...form.getInputProps('service')} />
                        </Box>

                        <Box flex="1" miw="300px">
                            {' '}
                            {/* column 2!!!*/}
                            <DateInputForm required {...form.getInputProps('date')} />
                            <TimeEntry required {...form.getInputProps('time')} />
                            <RoomNumberInput required {...form.getInputProps('room')} />
                        </Box>
                    </Flex>

                    <Box mt="md">
                        <RequestDescription {...form.getInputProps('description')} />
                    </Box>

                    <Flex mt="xl" justify="left" gap="md">
                        <Button
                            type="button"
                            variant="outline"
                            color="blueBase.5"
                            style={{ width: '200px' }}
                            onClick={() => form.reset()}
                        >
                            Clear Form
                        </Button>

                        <Button type="submit" color="blueBase.5" style={{ width: '200px' }}>
                            Submit Request
                        </Button>
                    </Flex>
                </form>
            </Paper>
        </Flex>
    );
}

export default Security;
