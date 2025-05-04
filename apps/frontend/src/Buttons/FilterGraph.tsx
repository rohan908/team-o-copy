import React, { useState } from 'react';
import {
  Popover,
  Button,
} from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import GroupByEntry from './GroupByEntry';

interface FilterGraphProps {
  value: string;
  onChange: (val: string) => void;
}

const FilterGraph: React.FC<FilterGraphProps> = ({ value, onChange }) => (
   <Popover
      width={300}
      trapFocus={false}
      position="bottom"
      withArrow
      shadow="md"
      radius="md"
      arrowSize={15}
      offset={{ mainAxis: 10, crossAxis: 50 }}
      closeOnClickOutside
    >
      <Popover.Target>
        <Button
          leftSection={<IconFilter />}
          radius="md"
          bg="yellowAccent.4"
          fw="400"
          m="xs"
          c="primaryBlues.5"
          w='auto'
        >
          Filter
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        <GroupByEntry value={value} onChange={onChange} />
      </Popover.Dropdown>
    </Popover>
  );

export default FilterGraph;
