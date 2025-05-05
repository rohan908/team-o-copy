import { Select, SelectProps, Flex, Box, useMantineTheme } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import { notifications } from '@mantine/notifications';
import { useFilterContext } from '../../contexts/FilterContext.tsx';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';

interface HospitalSelectProps extends SelectProps {
    value: string | null;
    onChange: (value: string) => void;
}

const HospitalFilter: React.FC<HospitalSelectProps> = ({ value, onChange, ...props }) => {
    const hospitalData = [
        '20 Patriot Place',
        '22 Patriot Place',
        'Chestnut Hill',
        'Falkner Hospital',
        'BWH Campus',
    ];
    const theme = useMantineTheme();
    const { addFilter, setHovered } = useFilterContext();

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected);
            addFilter('hospital', selected);
        }
    };

    return (
        <Select
            placeholder="Hospital"
            data={hospitalData}
            value={value}
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

export default HospitalFilter;
