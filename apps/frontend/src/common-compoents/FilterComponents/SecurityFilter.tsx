import { Flex, Box, Select, SelectProps, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import { notifications } from '@mantine/notifications';
import { useFilterContext } from '../../contexts/FilterContext.tsx';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';

const securityOptions = ['Escort Service', 'Safety Hazard', 'Building Security', 'Surveillance'];
interface SecuritySelectProps {
    value: string;
    onChange: (value: string | null) => void;
}
const SecurityFilter: React.FC<SecuritySelectProps> = ({ value, onChange }) => {
    const theme = useMantineTheme();
    const { addFilter } = useFilterContext();
    const [dropdownValue, setDropdownValue] = useState<string>('');

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected);
            addFilter('security', selected);
            setDropdownValue('');
        }
    };

    return (
        <Select
            placeholder="Secuirty"
            data={securityOptions}
            value={dropdownValue}
            onChange={handleSelection}
            nothingFoundMessage="No Security selected"
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
export default SecurityFilter;
