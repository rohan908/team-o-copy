// NameEntrySR.tsx
import React, { useEffect, useState } from 'react';
import { Select, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import { useFilterContext } from '../../contexts/FilterContext.tsx';

interface NameEntryProps {
    value: string;
    onChange: (value: string) => void;
}

const NameEntry: React.FC<NameEntryProps> = ({ value, onChange }) => {
    const [data, setData] = useState<string[]>([]);
    const theme = useMantineTheme();
    const { addFilter } = useFilterContext();
    const [dropdownValue, setDropdownValue] = useState<string>('');

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const response = await fetch('/api/employees');
                const names: { name: string }[] = await response.json();
                setData(names.map((emp) => emp.name));
            } catch (err) {
                console.error('Error fetching names', err);
            }
        };
        fetchNames();
    }, []);

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected);
            addFilter('employeeName', selected);
            setDropdownValue('');
        }
    };

    return (
        <Select
            data={data}
            value={dropdownValue}
            onChange={handleSelection}
            placeholder="Employee"
            radius="0"
            size="xs"
            w="100%"
            variant="unstyled"
            mb="sm"
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

export default NameEntry;
