import { Select, SelectProps, Flex, Box } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx'; // Adjust the path

const statusOptions = ['Unassigned', 'Assigned', 'Working', 'Done'];

interface StatusSelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange }) => {
  const handleSpeechResult = (text: string) => {
    const matchedStatus = statusOptions.find((option) =>
      option.toLowerCase().includes(text.toLowerCase())
    );
    if (matchedStatus) {
      onChange(matchedStatus);
    } else {
      alert('No matching status found');
    }
  };

    return (
      <Flex align="center" gap="sm">
      <Select
            label="What is the Status "
            placeholder="Select a Status"
            data={statusOptions}
            value={value}
            onChange={(val) => onChange(val)}
            nothingFoundMessage="Hospital not found"
            radius="sm"
            mb="md"
            size="xs"
            required
            c={"#285CC6"}
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

export default StatusSelect;
