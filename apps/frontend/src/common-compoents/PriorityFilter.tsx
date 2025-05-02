import { Select, SelectProps, Flex, Box } from '@mantine/core';
import React from 'react';
import SpeechToText from './../Buttons/SpeechToText.tsx';
import { notifications } from '@mantine/notifications';

const priorityOptions = ['Emergency', 'High', 'Medium', 'Low'];

interface PrioritySelectProps extends SelectProps {
    value: string;
    onChange: (value: string | null) => void;
}

const PriorityFilter: React.FC<PrioritySelectProps> = ({ value, onChange, ...props }) => {
    const handleSpeechResult = (text: string) => {
        const matched = priorityOptions.find((option) =>
            option.toLowerCase().includes(text.toLowerCase())
        );
        if (matched) {
            onChange(matched);
        } else {
            notifications.show({
                title: 'Speech Error',
                message: 'No Matching Priority Found',
                color: 'red',
            });
        }
    };

    const handleSelection = (selected: string | null) => {
        if (selected) {
            onChange(selected); // add to filter
        }
    };

    return (
        <Flex align="center" gap="sm">
            <Select
                label="Filter by Priority"
                placeholder="Select a priotriy"
                data={priorityOptions}
                value={value}
                onChange={handleSelection}
                nothingFoundMessage="No Priority selected"
                radius="sm"
                w="240px"
                size="xs"
                mt="sm"
                c={'#285CC6'}
                {...props}
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

export default PriorityFilter;
