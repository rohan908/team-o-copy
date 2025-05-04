import React from 'react';
import { Select, Flex } from '@mantine/core';

interface Option {
  value: string;
  label: string;
}

interface GroupByEntryProps {
  value: string;
  onChange: (value: string) => void;
}

const options: Option[] = [
  { value: 'priority', label: 'Priority Level' },
  { value: 'hospital', label: 'Hospital Location' },
  { value: 'employeeName', label: 'Employee Name' },
];

const GroupByEntry: React.FC<GroupByEntryProps> = ({ value, onChange }) => {
  const handleChange = (val: string | null) => {
    if (val !== null) {
      onChange(val);
    }
  };

  return (
    <Flex align="center" gap="sm">
      <Select
        value={value}
        onChange={handleChange}
        data={options}
        placeholder="Select a Filter"
        radius="sm"
        size="xs"
        required
        style={{ width: 240, color: '#285CC6' }}
      />
    </Flex>
  );
};

export default GroupByEntry;
