import {Select, SelectProps } from '@mantine/core';

const HospitalSelect: React.FC<SelectProps> = (props) => {
  return (
    <Select
      label="What is the Status "
      placeholder="--Select a Status--"
      searchable
      data={['Unassigned', 'Assigned', 'Working', 'Done']}
      nothingFoundMessage="Hospital not found"
      radius="sm"
      mb="sm"
      {...props}
    />
  );
};

export default HospitalSelect;
