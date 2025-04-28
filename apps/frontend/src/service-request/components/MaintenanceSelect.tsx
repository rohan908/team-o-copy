import { Select, SelectProps, Flex, Box } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';

const maintenanceOptions = [
  'Elevator',
  'HVAC',
  'Medical Equipment',
  'Plumbing',
  'Electrical',
  'Building Structure',
];

interface MaintenanceSelectProps extends SelectProps {
  value: string;
  onChange: (value: string | null, option?: { value: string; label: string }) => void;
}
const MaintenanceSelect: React.FC<MaintenanceSelectProps> = ({ value, onChange, ...props }) => {
  const handleSpeechResult = (text: string) => {
    const matchedMaintenance = maintenanceOptions.find(option =>
      option.toLowerCase().includes(text.toLowerCase())
    );
    if (matchedMaintenance) {
      onChange(matchedMaintenance, { value: matchedMaintenance, label: matchedMaintenance });
    } else {
      alert('No matching maintenance type found');
    }
  };
    return (
      <Flex align="center" gap="sm">

      <Select
            label="Choose the Maintenance Needed"
            placeholder="Select a Cleanup Type"
            searchable
            data={maintenanceOptions}
            value={value}
            onChange={(val, option) => onChange(val, option)}
            nothingFoundMessage="Cleanup Type not found"
            radius="sm"
            mb="md"
            size="xs"
            required
            c={"#285CC6"}
            w="240px"
            {...props}
            styles={{
                label: {
                    fontSize: '18px',
                    fontWeight: 350,
                },
            }}
        />
        <Box mt={35}>
          <SpeechToText OnResult={handleSpeechResult} />
        </Box>
      </Flex>
    );
};

export default MaintenanceSelect;
