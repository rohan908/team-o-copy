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
            mb="sm"
            size="xs"
            required
            {...props}
            styles={{
                label: {
                    fontSize: '16px',
                    fontWeight: 400,
                },
            }}
        />
    );
};

export default PrioritySelect;
