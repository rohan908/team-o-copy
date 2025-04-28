import { Select, SelectProps, Flex, Box } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';

const priorityOptions = ['Emergency', 'High', 'Medium', 'Low'];

interface PrioritySelectProps extends SelectProps {
  value: string;
  onChange: (value: string | null) => void;
}

const PrioritySelect: React.FC<PrioritySelectProps> = ({ value, onChange, ...props }) => {
  const handleSpeechResult = (text: string) => {
    const matched = priorityOptions.find((option) =>
      option.toLowerCase().includes(text.toLowerCase())
    );
    if (matched) {
      onChange(matched)
    }
    else {
      alert('No matching priority found');
    }
  };
    return (
      <Flex align="center" gap="sm">

      <Select
            label="Choose the Priority level"
            placeholder="Select a priotriy"
            searchable
            data={priorityOptions}
            value={value}
            onChange={(val) => onChange(val)}
            nothingFoundMessage="No Priority selected"
            radius="sm"
            w="240px"
            mb="md"
            size="xs"
            required
            c={"#285CC6"}
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

export default PrioritySelect;
