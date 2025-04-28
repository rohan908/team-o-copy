import { Flex, Box, Select, SelectProps } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';

const sanitationOptions = [
  'Biohazard Cleanup',
  'General Room Cleaning',
  'Waste Removal',
  'Floor Cleaning (mop, vacuum, etc.)',
  'Restroom Cleaning',
  'Spill Cleanup',
  'Equipment Cleaning',
];

interface SanitationSelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const SanitationSelect: React.FC<SanitationSelectProps> = ({ value, onChange }) => {
  const handleSpeechResult = (text: string) => {
    const matched = sanitationOptions.find((option) =>
      option.toLowerCase().includes(text.toLowerCase())
    );
    if (matched) {
      onChange(matched);
    } else {
      alert('No matching cleanup type found');
    }
  };
  return (
    <Flex align="center" gap="sm">

      <Select
        label="Choose the Cleanup Type"
        placeholder="Select a Cleanup Type"
        searchable
        data={sanitationOptions}
        value={value}
        onChange={(val) => onChange(val)}
        nothingFoundMessage="Cleanup Type not found"
        radius="sm"
        mb="md"
        size="xs"
        w = '240px'
        c={"#285CC6"}
        required
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

export default SanitationSelect;
