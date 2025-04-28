import { Select, SelectProps, Flex, Box } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';

interface DepartmentSelectProps extends SelectProps {
    departments: string[]; // Just titles
    value: string;
    onChange: (value: string) => void;
}

const DepartmentSelect: React.FC<DepartmentSelectProps> = ({ departments, value,onChange, ...props }) => {
  const handleSpeechResult = (text: string) => {
    const matchedDepartment = departments.find(department =>
      department.toLowerCase().includes(text.toLowerCase())
    );
    if (matchedDepartment) {
      onChange(matchedDepartment);
    } else {
      alert('No matching department found');
    }
  };
    return (
      <Flex align="center" gap="sm">

      <Select
            label="Choose the Department"
            placeholder={departments.length > 0 ? 'Select a Department' : 'Select Hospital First'}
            data={departments}
            value={value}
            onChange={(val) => onChange(val || '')}
            w="240px"
            radius="sm"
            size="xs"
            mb="md"
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

export default DepartmentSelect;
