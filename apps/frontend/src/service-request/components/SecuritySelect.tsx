import { Flex, Box, Select, SelectProps } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';

const securityOptions = ['Escort Service', 'Safety Hazard', 'Building Security', 'Surveillance'];
interface SecuritySelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
}
const SecuritySelect: React.FC<SecuritySelectProps> = ({ value, onChange }) => {
  const handleSpeechResult = (text: string) => {
    const matched = securityOptions.find((option) =>
      option.toLowerCase().includes(text.toLowerCase())
    );
    if (matched) {
      onChange(matched);
    } else {
      alert('No matching concern found');
    }
  };
    return (
      <Flex align="center" gap="sm">

      <Select
            label="Choose your Security Concern"
            placeholder="Select a Concern"
            data={securityOptions}
            value={value}
            onChange={(val) => onChange(val)}
            nothingFoundMessage="Service not Offered"
            radius="sm"
            mb="md"
            w="240px"
            size="xs"
            required
            c={"#285CC6"}
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

export default SecuritySelect;
