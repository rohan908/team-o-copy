import {Select, SelectProps } from '@mantine/core';

const HospitalSelect: React.FC<SelectProps> = (props) => {
  return (
      <Select
          label="Choose the Hospital Needed"
          placeholder="--Select a Hospital--"
          searchable
          data={['22 Patriot Place', ' 20 Patriot Place', 'Chestnut Hill']}
          nothingFoundMessage="Hospital not found"
          radius="sm"
          mb="sm"
          {...props}
      />
  );
};

export default HospitalSelect;
