import { Select, SelectProps } from '@mantine/core';
import React from 'react';

const PrioritySelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            label="Choose the Priority level"
            placeholder="--Select a priotriy--"
            searchable
            data={['Emergency', 'High', 'Medium', 'Low']}
            nothingFoundMessage="No Priority selected"
            radius="sm"
            mb="md"
            size="xs"
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
    );
};

export default PrioritySelect;
