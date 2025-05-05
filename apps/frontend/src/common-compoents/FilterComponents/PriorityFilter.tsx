import { Select, SelectProps, Flex, Box, useMantineTheme, Autocomplete } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import { notifications } from '@mantine/notifications';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import DisplayBadges from '../DisplayBadges.tsx';

const priorityOptions = ['Emergency', 'High', 'Medium', 'Low'];

interface PrioritySelectProps extends SelectProps {
    value: string;
    onChange: (value: string | null) => void;
}

const PriorityFilter: React.FC<PrioritySelectProps> = ({ value, onChange, ...props }) => {
    const theme = useMantineTheme();
    const handleSpeechResult = (text: string) => {
        const matched = priorityOptions.find((option) =>
            option.toLowerCase().includes(text.toLowerCase())
        );
    };

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected); // add to filter
        }
    };

    return (
        <Flex align="center" gap="sm">
            <Select
                placeholder="Priotriy"
                data={priorityOptions}
                value={value}
                onChange={handleSelection}
                nothingFoundMessage="No Priority selected"
                radius="0"
                searchable
                w="240px"
                size="xs"
                mt="sm"
                mb="sm"
                variant="unstyled"
                rightSection={<IconChevronDown size="16" />}
                leftSection={<IconSearch size="16" />}
                styles={{
                    input: {
                        boxShadow: `0 2px 1px 0 ${theme.colors.greys[3]}`,
                        // borderBottom: `2px solid ${theme.colors.secondaryBlues[7]}`,
                        // borderTop: `2px solid ${theme.colors.secondaryBlues[7]}`,
                    },
                    dropdown: {
                        borderRadius: '8px',
                    },
                }}
            />
        </Flex>
    );
};

export default PriorityFilter;
