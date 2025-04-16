import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button, Flex, Title, Paper, Box, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import TimeEntry from './components/TimeEntry';
import DateInputForm from './components/DateEntry';
import RoomNumberInput from './components/RoomEntry';
import RequestDescription from './components/RequestDescription';
import SanitationSelect from './components/SanitationSelect.tsx';
import HospitalSelect from './components/HospitalEntry.tsx';
import PriorityButtons from './components/PriorityButtons.tsx';
import StatusSelect from './components/StatusSelect.tsx';
import NameEntry from './components/NameEntry.tsx';
import DepartmentSelect from './components/DepartmentSelect.tsx';
import {
    ChestnutHill,
    Patriot20,
    Patriot22,
    HospitalDepartment,
} from '../directory/components/directorydata';
import SecuritySelect from './components/SecuritySelect.tsx';

interface RequestData {
    security: string;
    date: string;
    department: string;
    time: string;
    employeeName: string;
    priority: string;
    status: string;
    hospital: string;
    description: string;
}

function Security() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const [departmentOptions, setDepartmentOptions] = useState<HospitalDepartment[]>([]);

    const form = useForm<RequestData>({
        initialValues: {
            security: '',
            date: '',
            department: '',
            time: '',
            employeeName: '',
            hospital: '',
            priority: '',
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
        const rawData = form.values;

        // truncating the time so just the date gets passed in
        const RequestData = {
            ...rawData,
            date: new Date(rawData.date).toISOString().split('T')[0],
        };

        try {
            const response = await fetch('/api/securitySR', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    security: RequestData.security,
                    selectedDate: RequestData.date,
                    selectedTime: RequestData.time,
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
                        requestData: [
                            { title: 'Security', value: RequestData.security },
                            { title: 'Date', value: RequestData.date },
                            { title: 'Time', value: RequestData.time },
                            { title: 'Department', value: RequestData.department },
                            { title: 'Priority', value: RequestData.priority },
                            { title: 'Employee Name', value: RequestData.employeeName },
                            { title: 'Status', value: RequestData.status },
                            { title: 'Hospital', value: RequestData.hospital },
                            { title: 'Details', value: RequestData.description },
                        ],
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
                    <Flex direction="column" ta="center" justify="center">
                        <Title order={2} mb="sm">
                            Security Request
                        </Title>
                        <Text mb="md" fz="xxxs">
                            Ethan R. & Camden B.
                        </Text>
                    </Flex>
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
                            <SecuritySelect required {...form.getInputProps('security')} />
                        </Box>

                        <Box flex="1" miw="300px">
                            {' '}
                            {/* column 2!!!*/}
                            <DateInputForm required {...form.getInputProps('date')} />
                            <TimeEntry required {...form.getInputProps('time')} />
                            <PriorityButtons required {...form.getInputProps('priority')} />
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
