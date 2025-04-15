import React, { useState } from 'react';
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
import NameEntry from './components/NameEntry.tsx';
import LanguageSelect from './components/LanguageSelect.tsx';
import StatusSelect from './components/StatusSelect.tsx';
import DepartmentSelect from './components/DepartmentSelect.tsx';
import {
    ChestnutHill,
    Patriot20,
    Patriot22,
    HospitalDepartment,
} from '../directory/components/directorydata';

interface RequestData {
    service: string;
    date: string;
    department: string;
    room: string;
    time: string;
    employeeName: string;
    priority: string;
    status: string;
    hospital: string;
    description: string;
}
//Needed simple edit. Ignore this.
function Security() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const [departmentOptions, setDepartmentOptions] = useState<HospitalDepartment[]>([]);

    const form = useForm<RequestData>({
        initialValues: {
            service: '',
            date: '',
            department: '',
            room: '',
            time: '',
            hospital: '',
            priority: '',
            employeeName: '',
            status: '',
            description: '',
        },
    });

    // logic for dependant department slection
    const handleHospitalChange = (hospital: string | null) => {
        form.setFieldValue('hospital', hospital || '');

        switch (hospital) {
            case 'Chestnut Hill':
                setDepartmentOptions(ChestnutHill);
                break;
            case '20 Patriot Place':
                setDepartmentOptions(Patriot20);
                break;
            case '22 Patriot Place':
                setDepartmentOptions(Patriot22);
                break;
            default:
                setDepartmentOptions([]);
        }

        form.setFieldValue('department', '');
    };
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
                    department: RequestData.department,
                    priority: RequestData.priority,
                    employeeName: RequestData.employeeName,
                    status: RequestData.status,
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
                            department: RequestData.department,
                            priority: RequestData.priority,
                            employeeName: RequestData.employeeName,
                            status: RequestData.status,
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
        <Flex justify="center" align="center" p="xl">
            <Paper bg="gray.2" p="xl" shadow="xl" radius="md" w="65%">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Title order={2} ta="center" mb="lg">
                        Interpreter Request Form
                    </Title>
                    <p
                        style={{
                            textAlign: 'center',
                            fontSize: '16px',
                        }}
                    >
                        Ethan Ramoth and Camden Brayton
                    </p>

                    <Flex align="stretch" gap="lg" wrap="wrap" mb="md">
                        <Box flex="1" miw="300px">
                            {' '}
                            {/*< column 1!!!*/}
                            <NameEntry required {...form.getInputProps('employeeName')} />
                            <HospitalSelect
                                required
                                value={form.values.hospital}
                                onChange={handleHospitalChange}
                            />
                            <DepartmentSelect
                                required
                                departments={departmentOptions.map(
                                    (department) => department.title
                                )}
                                {...form.getInputProps('department')}
                            />
                            <SecuritySelect required {...form.getInputProps('service')} />
                        </Box>

                        <Box flex="1" miw="300px">
                            {' '}
                            {/* column 2!!!*/}
                            <DateInputForm required {...form.getInputProps('date')} />
                            <TimeEntry required {...form.getInputProps('time')} />
                            <PriorityButtons {...form.getInputProps('priority')} />
                            <StatusSelect required {...form.getInputProps('status')} />
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
