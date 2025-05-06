import { Select, SelectProps, Flex, Box, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import { useFilterContext } from '../../contexts/FilterContext.tsx';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';

const statusOptions = ['Unassigned', 'Assigned', 'Working', 'Done'];

interface StatusSelectProps {
    value: string;
    onChange: (value: string | null) => void;
}

const StatusFilter: React.FC<StatusSelectProps> = ({ value, onChange }) => {
    const theme = useMantineTheme();
    const { addFilter } = useFilterContext();
    const [dropdownValue, setDropdownValue] = useState<string>('');

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected);
            addFilter('status', selected);
            setDropdownValue('');
        }
    };

    return (
        <Select
            placeholder="Status"
            data={statusOptions}
            value={dropdownValue}
            onChange={handleSelection}
            nothingFoundMessage="No Status selected"
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

export default StatusFilter;
