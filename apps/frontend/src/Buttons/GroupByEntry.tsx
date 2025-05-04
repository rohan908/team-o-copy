import React from 'react';
import { Select, Flex, Box } from '@mantine/core';
import { IconChartCandle } from '@tabler/icons-react';

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
          leftSection={<IconChartCandle />}
        value={value}
        onChange={handleChange}
        data={options}
        placeholder="Select a Filter"
        radius="sm"
        size="xs"
        required
          style={{ width: 220}}

          styles={{
            input: {
              backgroundColor: '#FFD43B',
              color: '#285CC6',
              fontWeight: 500,
            },
            section: {
              color: '#285CC6',
            },
            dropdown: {
              backgroundColor: '#fff',
              borderRadius: 6,
            },
          }}/>
    </Flex>
  );
};

export default GroupByEntry;
