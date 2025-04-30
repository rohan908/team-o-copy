import { Autocomplete, AutocompleteProps, Flex, Box } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';

// add employee type
type Employee = {
    name: string;
};

const NameEntry: React.FC<AutocompleteProps> = (props) => {
    // adding fetching of names from backend
    const [data, setData] = useState<string[]>([]);

    // add use effect to fetch
    useEffect(() => {
        const fetchNames = async () => {
            try {
                console.log('Fetching names...');
                const response = await fetch('/api/employees');
                const names: Employee[] = await response.json();
                setData(names.map((emp) => emp.name));
            } catch (error) {
                console.error('Error fetching names.', error);
            }
        };
        fetchNames();
    }, []);

    const handleSpeechResult = (text: string) => {
        props.onChange?.(text);
    };
    return (
        <Flex align="center" gap="sm">
            <Autocomplete
                {...props}
                data={data}
                label="Enter Employee Name"
                placeholder="Enter Name"
                radius="sm"
                mb="md"
                size="xs"
                required
                c="#285CC6"
                w="240px"
                styles={{
                    label: {
                        fontSize: '18px',
                        fontWeight: 350,
                    },
                }}
            />
            <Box mt={14}>
                <SpeechToText OnResult={handleSpeechResult} />
            </Box>
        </Flex>
    );
};

export default NameEntry;
