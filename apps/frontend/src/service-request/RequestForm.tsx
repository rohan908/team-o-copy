import React, { useState } from 'react';
import { Button, Flex, Title, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

import TimeEntry from './components/TimeEntry';
import DateInputForm from './components/DateEntry';
import RequestDescription from './components/RequestDescription';
import HospitalSelect from './components/HospitalEntry.tsx';
import PriorityButtons from './components/PriorityButtons.tsx';
import StatusSelect from './components/StatusSelect.tsx';
import DepartmentSelect from './components/DepartmentSelect.tsx';
import NameEntry from './components/NameEntry.tsx';
import {
    useBwhCampusContext,
    useChestnutHillContext,
    useFaulknerHospitalContext,
    usePatriotContext,
} from '../contexts/DirectoryContext.tsx';
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
    newInitialValues: RequestData;
    contributors?: string;
    formLabel: string;
    onBack: () => void;
}

const RequestForm: React.FC<RequestDetails> = ({
    handleSubmit,
    children,
    newInitialValues,
    contributors,
    formLabel,
    onBack,
}) => {
    const [departmentOptions, setDepartmentOptions] = useState<string[]>([]);
    const [resetKey, setResetKey] = useState(0); // Key to force remount

    const form = useForm<RequestData>({
        initialValues: newInitialValues,
    });

    const Patriot = usePatriotContext();
    const Chestnut = useChestnutHillContext();
    const Faulkner = useFaulknerHospitalContext();
    const BWHCampus = useBwhCampusContext();

    const mapDepartment = (department: DirectoryNodeItem[]) =>
        department.map((department) => department.name);

    const handleHospitalChange = (hospital: string | null) => {
        form.setFieldValue('hospital', hospital || '');

        switch (hospital) {
            case 'Chestnut Hill':
                setDepartmentOptions(mapDepartment(Chestnut));
                break;
            case '20 Patriot Place':
                setDepartmentOptions(mapDepartment(Patriot));
                break;
            case '22 Patriot Place':
                setDepartmentOptions(mapDepartment(Patriot));
                break;
            case 'Falkner Hospital':
                setDepartmentOptions(mapDepartment(Faulkner));
                break;
            case 'BWH Campus':
                setDepartmentOptions(mapDepartment(BWHCampus));
                break;
            default:
                setDepartmentOptions([]);
        }

        form.setFieldValue('department', '');
    };

    const handleReset = () => {
        const freshValues = { ...newInitialValues };

        form.setValues(freshValues);
        form.reset();

        setDepartmentOptions([]);

        setResetKey((prev) => prev + 1);
    };

    return (
        <Flex justify="center" align="center" p="xxl" key={`form-container-${resetKey}`}>
            <Box p="xl">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.onSubmit(handleSubmit)();
                    }}
                    key={`form-${resetKey}`}
                >
                    <Flex direction="column" ta="center" justify="center">
                        <Title order={2} ta="center" mb="md" fz="xl" c={'#285CC6'}>
                            {formLabel}
                        </Title>
                        <Title mb="md" fz="xxxs" c={'#285CC6'}>
                            {contributors}
                        </Title>
                    </Flex>

                    <Flex align="stretch" gap="xl" wrap="wrap" mb="md">
                        <Box flex="1" miw="275">
                            <NameEntry
                                {...form.getInputProps('employeeName')}
                                key={`name-${resetKey}`}
                            />
                            <HospitalSelect
                                value={form.values.hospital}
                                onChange={handleHospitalChange}
                                key={`hospital-${resetKey}`}
                            />
                            <DepartmentSelect
                                departments={departmentOptions}
                                {...form.getInputProps('department')}
                                key={`department-${resetKey}`}
                            />
                            {children?.(form)}
                        </Box>

                        <Box flex="1" miw="275">
                            <DateInputForm
                                {...form.getInputProps('date')}
                                key={`date-${resetKey}`}
                            />
                            <TimeEntry {...form.getInputProps('time')} key={`time-${resetKey}`} />
                            <PriorityButtons
                                {...form.getInputProps('priority')}
                                key={`priority-${resetKey}`}
                            />
                            <StatusSelect
                                {...form.getInputProps('status')}
                                key={`status-${resetKey}`}
                            />
                        </Box>
                    </Flex>
                    <Box mt="md">
                        <RequestDescription
                            {...form.getInputProps('description')}
                            key={`description-${resetKey}`}
                        />
                    </Box>
                    <Flex mt="xl" justify="left" gap="md">
                        <Button
                            type="button"
                            variant="outline"
                            color="#5A83DB"
                            radius="md"
                            w="200px"
                            onClick={handleReset}
                        >
                            Clear Form
                        </Button>

                        <Button radius="md" type="submit" bg="#5A83DB" w="100%">
                            Submit
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Flex>
    );
};

export default RequestForm;
