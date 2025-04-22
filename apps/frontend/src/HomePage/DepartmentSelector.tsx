import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconBuilding, IconChevronDown, IconHospital } from '@tabler/icons-react';

//need to change this to actual api call autocomplete later
const hospitalOptions = [
    { value: '20 Patriot Pl', label: '20 Patriot Pl' },
    { value: '22 Patriot Pl', label: '22 Patriot Pl' },
    { value: 'Chestnut Hill', label: 'Chestnut Hill' },
];

export function DepartmentSelector({ props }: { props: any }) {
    const theme = useMantineTheme();
    return (
        <Autocomplete
            placeholder="Select a Department"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={<IconHospital size="16" style={{ color: theme.colors.primaryBlues[8] }} />}
            data={hospitalOptions}
            nothingFoundMessage="Location Not Available"
            radius="sm"
            mb="sm"
            size="xs"
            w={{ base: '100%', sm: '400px' }}
            {...props}
        />
    );
}
