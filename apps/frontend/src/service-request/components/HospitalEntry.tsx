import { Select, SelectProps } from '@mantine/core';
import React from 'react';

interface HospitalSelectProps extends SelectProps {
    value: string;
    onChange: (value: string) => void;
}

const HospitalSelect: React.FC<HospitalSelectProps> = ({ value, onChange, ...props }) => {
    return (
        <Select
            label="Choose the Hospital Needed"
            placeholder="--Select a Hospital--"
            searchable
            data={['20 Patriot Place', '22 Patriot Place', 'Chestnut Hill']}
            value={value}
            onChange={(val) => onChange(val || '')} // fallback for null values
            nothingFoundMessage="Hospital not found"
            radius="sm"
            mb="md"
            size="xs"
            required
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

export default HospitalSelect;
