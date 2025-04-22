import React, { useState } from 'react';
import { Button, Flex, Title, Paper, Box } from '@mantine/core';

import TimeEntry from './components/TimeEntry';
import DateInputForm from './components/DateEntry';
import RequestDescription from './components/RequestDescription';
import HospitalSelect from './components/HospitalEntry.tsx';
import PriorityButtons from './components/PriorityButtons.tsx';
import StatusSelect from './components/StatusSelect.tsx';
import DepartmentSelect from './components/DepartmentSelect.tsx';
import NameEntry from './components/NameEntry.tsx';

// import {
//     ChestnutHill,
//     Patriot20,
//     Patriot22,
//     HospitalDepartment,
// } from '../directory/components/directorydata';
import { useForm } from '@mantine/form';
import { useChestnutHillContext, usePatriotContext } from '../contexts/DirectoryContext.tsx';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';

export interface RequestData {
    employeeName: string;
    hospital: string;
    department: string;
    date: string;
    time: string;
    priority: string;
    status: string;
    description: string;
    language?: string;
    maintenanceType?: string;
    cleanupType?: string;
    security?: string;
}

interface RequestDetails {
    handleSubmit: (values: RequestData) => void;
    children?: (form: ReturnType<typeof useForm<RequestData>>) => React.ReactNode;
    //pass in arbitrary amount of components needed but i dont know how to do that
    newInitialValues: RequestData;
    contributors?: string;
    formLabel: string;
}

const RequestForm: React.FC<RequestDetails> = ({
    handleSubmit,
    children,
    newInitialValues,
    contributors,
    formLabel,
}) => {
    const [departmentOptions, setDepartmentOptions] = useState<HospitalDepartment[]>([]);

    const form = useForm<RequestData>({
        initialValues: newInitialValues,
    });

    const Patriot = usePatriotContext();
    const Chestnut = useChestnutHillContext();

    const MapDepartment = (department: DirectoryNodeItem[]) =>
        department.map((department: DirectoryNodeItem) => ({
            value: department.name,
            label: department.name,
        }));

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

    return (
        <Flex
            className="min-h-screen w-full"
            bg="terquAccet.2"
            justify="center"
            align="center"
            p="xl"
        >
            <Paper bg="themeGold.1" p="xl" shadow="xl" radius="md" w="65%">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Flex direction="column" ta="center" justify="center">
                        <Title order={2} ta="center" mb="md">
                            {formLabel}
                        </Title>
                        <Title mb="md" fz="xxxs">
                            {contributors}
                        </Title>
                    </Flex>

                    <Flex align="stretch" gap="lg" wrap="wrap" mb="md">
                        <Box flex="1" miw="300px">
                            {/*< column 1!!!*/}
                            <NameEntry {...form.getInputProps('employeeName')} />
                            <HospitalSelect
                                value={form.values.hospital}
                                onChange={handleHospitalChange}
                            />
                            <DepartmentSelect
                                departments={departmentOptions.map(
                                    (department) => department.title
                                )}
                                {...form.getInputProps('department')}
                            />
                            {children?.(form)}
                            {/*this is where I want any unique components to go*/}
                        </Box>

                        <Box flex="1" miw="300px">
                            {/* column 2!!!*/}
                            <DateInputForm {...form.getInputProps('date')} />
                            <TimeEntry {...form.getInputProps('time')} />
                            <PriorityButtons {...form.getInputProps('priority')} />
                            <StatusSelect {...form.getInputProps('status')} />
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
};

export default RequestForm;
