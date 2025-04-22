import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconCarFilled, IconChevronDown, IconMapPinFilled } from '@tabler/icons-react';

const hospitalOptions = [
    { value: '20 Patriot Pl', label: '20 Patriot Pl' },
    { value: '22 Patriot Pl', label: '22 Patriot Pl' },
    { value: 'Chestnut Hill', label: 'Chestnut Hill' },
];

export function ModeOfTravelSelector({ props }: { props: any }) {
    const theme = useMantineTheme();
    return (
        <Autocomplete
            placeholder="Mode of Transport"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={
                <IconCarFilled size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            searchable
            data={hospitalOptions}
            nothingFoundMessage="Hospital Not Available"
            radius="sm"
            mb="sm"
            size="xs"
            w={'100%'}
            {...props}
        />
    );
}
