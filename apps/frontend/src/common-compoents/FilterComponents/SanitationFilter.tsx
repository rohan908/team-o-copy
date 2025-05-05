import { Flex, Box, Select, SelectProps, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import { notifications } from '@mantine/notifications';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import { useFilterContext } from '../../contexts/FilterContext.tsx';

const sanitationOptions = [
    'Biohazard Cleanup',
    'General Room Cleaning',
    'Waste Removal',
    'Floor Cleaning (mop, vacuum, etc.)',
    'Restroom Cleaning',
    'Spill Cleanup',
    'Equipment Cleaning',
];

interface SanitationSelectProps {
    value: string;
    onChange: (value: string | null) => void;
}

const SanitationFilter: React.FC<SanitationSelectProps> = ({ value, onChange }) => {
    const theme = useMantineTheme();
    const { addFilter } = useFilterContext();
    const [dropdownValue, setDropdownValue] = useState<string>('');

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected);
            addFilter('cleanupType', selected);
            setDropdownValue('');
        }
    };
    return (
        <Select
            placeholder="Sanitation"
            data={sanitationOptions}
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

export default SanitationFilter;
