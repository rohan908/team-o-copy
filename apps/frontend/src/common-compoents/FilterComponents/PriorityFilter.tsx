import { Select, SelectProps, Flex, Box, useMantineTheme, Autocomplete } from '@mantine/core';
import React, { useState } from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import { notifications } from '@mantine/notifications';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import DisplayBadges from '../DisplayBadges.tsx';
import { useFilterContext } from '../../contexts/FilterContext.tsx';

const priorityOptions = ['Emergency', 'High', 'Medium', 'Low'];

interface PrioritySelectProps extends SelectProps {
    value: string;
    onChange: (value: string | null) => void;
}

const PriorityFilter: React.FC<PrioritySelectProps> = ({ value, onChange, ...props }) => {
    const theme = useMantineTheme();
    const { addFilter } = useFilterContext();
    const [dropdownValue, setDropdownValue] = useState<string>('');

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected);
            addFilter('priority', selected);
            setDropdownValue('');
        }
    };

    return (
        <Select
            placeholder="Priotriy"
            data={priorityOptions}
            value={dropdownValue}
            onChange={handleSelection}
            nothingFoundMessage="No Priority selected"
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

export default PriorityFilter;
