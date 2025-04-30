// NameEntrySR.tsx
import React, { useEffect, useState } from 'react';
import { Autocomplete, Flex, Box, Select } from '@mantine/core';
import SpeechToText from '../../Buttons/SpeechToText';

interface NameEntryProps {
    value: string;
    onChange: (value: string) => void;
    onItemSelect?: (value: string) => void;
}

const NameEntrySR: React.FC<NameEntryProps> = ({ value, onChange, onItemSelect }) => {
    const [data, setData] = useState<string[]>([]);

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

    const handleSpeechResult = (text: string) => {
        onChange(text);
    };

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected); // add to filter
        }
    };

    return (
        <Flex align="center" gap="sm">
            <Select
                data={data}
                label="Filter By Name"
                placeholder="Choose Employee"
                radius="sm"
                mb="md"
                size="xs"
                value={value}
                onChange={handleSelection}
                searchable
                clearable
                c="#285CC6"
                w="240px"
                styles={{
                    label: { fontSize: '18px', fontWeight: 350 },
                    dropdown: {
                        borderRadius: '8px',
                    },
                }}
            />
            <Box mt={14}>
                <SpeechToText OnResult={handleSpeechResult} />
            </Box>
        </Flex>
    );
};

export default NameEntrySR;
