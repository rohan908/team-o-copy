import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Title, Paper, Box, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import TimeEntry from './components/TimeEntry';
import DateInputForm from './components/DateEntry';
import RequestDescription from './components/RequestDescription';
import HospitalSelect from './components/HospitalEntry.tsx';
import PriorityButtons from './components/PriorityButtons.tsx';
import StatusSelect from './components/StatusSelect.tsx';
import DepartmentSelect from './components/DepartmentSelect.tsx';
import NameEntry from './components/NameEntry.tsx';
import MaintenanceSelect from './components/MaintenanceSelect.tsx';
import {
    ChestnutHill,
    Patriot20,
    Patriot22,
    HospitalDepartment,
} from '../directory/components/directorydata';

interface RequestData {
    employeeName: string;
    department: string;
    hospital: string;
    priority: string;
    status: string;
    date: string;
    time: string;
    description: string;
    maintenanceType: string;
}

function Maintenance() {
    const navigate = useNavigate();
    const [departmentOptions, setDepartmentOptions] = useState<HospitalDepartment[]>([]);
    const form = useForm<RequestData>({
        initialValues: {
            employeeName: '',
            department: '',
            hospital: '',
            priority: '',
            status: '',
            date: '',
            time: '',
            description: '',
            maintenanceType: '',
        },
    });
    // logic for dependant department selection
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
            const response = await fetch('/api/maintenanceSR', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeName: RequestData.employeeName,
                    date: RequestData.date,
                    time: RequestData.time,
                    department: RequestData.department,
                    description: RequestData.description,
                    priority: RequestData.priority,
                    hospital: RequestData.hospital,
                    maintenanceType: RequestData.maintenanceType,
                    status: RequestData.status,
                }),
            });

            if (response.ok) {
                navigate('/submission', {
                    state: {
                        requestData: [
                            { title: 'Name', value: RequestData.employeeName },
                            { title: 'Maintenance Type', value: RequestData.maintenanceType },
                            { title: 'Hospital', value: RequestData.hospital },
                            { title: 'Department', value: RequestData.department },
                            { title: 'Date', value: RequestData.date },
                            { title: 'Time', value: RequestData.time },
                            { title: 'Priority', value: RequestData.priority },
                            { title: 'Status', value: RequestData.status },
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
      <Flex className="min-h-screen w-full" bg="#EBF2FF" justify="center" align="center" p="xl">
        <Paper bg="#EBF2FF" p="xl" radius="8px" w="65%">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction="column" ta="center" justify="center">
              <Title
                order={2}
                c="#285CC6"
                fz={'xl'}
                fw={400}
                ta={"center"}
                w={'auto'}
                mb={"md"}
              >
                Maintenance Request Form
              </Title>
              <Text mb="md" fz="xxxs" c="#285CC6">
                Connor Daly and Yanding Mario
              </Text>
            </Flex>
                    <Flex align="stretch" gap="lg" wrap="wrap" mb="md">
                        <Box flex="1" miw="300px">
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
                            <MaintenanceSelect
                                required
                                {...form.getInputProps('maintenanceType')}
                            />
                        </Box>

                        <Box flex="1" miw="300px">
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

export default Maintenance;
