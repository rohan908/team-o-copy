import React, { useEffect, useState } from 'react';
import { Autocomplete, Flex, Box } from '@mantine/core';
import SpeechToText from '../../Buttons/SpeechToText';

interface NameEntryProps {
    value: string;
    onChange: (value: string) => void;
}

const NameEntrySR: React.FC<NameEntryProps> = ({ value, onChange }) => {
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
    // idk what this does, it was just in yandings trust
    const handleSpeechResult = (text: string) => {
        onChange(text);
    };

    return (
        <Flex align="center" gap="sm">
            {/* Changed to keep open when an option is selected */}
            <Autocomplete
                data={data}
                label="Enter Employee Name"
                placeholder="Enter Name"
                radius="sm"
                mb="md"
                size="xs"
                required
                value={value}
                onChange={onChange}
                c="#285CC6"
                w="240px"
                styles={{
                    label: { fontSize: '18px', fontWeight: 350 },
                }}
            />
            <Box mt={14}>
                <SpeechToText OnResult={handleSpeechResult} />
            </Box>
        </Flex>
    );
};

export default NameEntrySR;
