import { Select, SelectProps, Flex, Box, useMantineTheme } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import { notifications } from '@mantine/notifications';
import { useFilterContext } from '../../contexts/FilterContext.tsx';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';

const maintenanceOptions = [
    'Elevator',
    'HVAC',
    'Medical Equipment',
    'Plumbing',
    'Electrical',
    'Building Structure',
];

interface MaintenanceSelectProps extends SelectProps {
    value: string;
    onChange: (value: string | null, option?: { value: string; label: string }) => void;
}
const MaintenanceFilter: React.FC<MaintenanceSelectProps> = ({ value, onChange, ...props }) => {
    const theme = useMantineTheme();
    const { addFilter } = useFilterContext();

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected);
            addFilter('maintenanceType', selected);
        }
    };

    return (
        <Select
            placeholder="Maintenance"
            data={maintenanceOptions}
            value={value}
            onChange={handleSelection}
            nothingFoundMessage="No Maitenance selected"
            radius="0"
            searchable
            w="100%"
            size="xs"
            mt="sm"
            mb="sm"
            variant="unstyled"
            rightSection={<IconChevronDown size="16" />}
            leftSection={<IconSearch size="16" />}
            styles={{
                input: {
                    boxShadow: `0 2px 1px 0 ${theme.colors.greys[3]}`,
                },
                dropdown: {
                    borderRadius: '8px',
                },
            }}
        />
    );
};

export default MaintenanceFilter;
