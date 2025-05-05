import { Flex, Box, Select, SelectProps, useMantineTheme } from '@mantine/core';
import ISO6391 from 'iso-639-1';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import { notifications } from '@mantine/notifications';
import { useFilterContext } from '../../contexts/FilterContext.tsx';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';

const languageOptions = ['ASL (American Sign Language)', ...ISO6391.getAllNames()];

interface LanguageSelectProps extends SelectProps {
    label: string;
    onChange: (value: string | null) => void;
}

const LanguageFilter: React.FC<LanguageSelectProps> = ({ value, onChange, ...props }) => {
    const theme = useMantineTheme();
    const { addFilter, setHovered } = useFilterContext();

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected);
            addFilter('language', selected);
        }
    };

    return (
        <Select
            placeholder="Language"
            data={languageOptions}
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
export default LanguageFilter;
