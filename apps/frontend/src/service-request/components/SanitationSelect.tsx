import { useMantineTheme, Select, SelectProps } from '@mantine/core';

const SanitationSelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            label="Choose the Cleanup Type Needed"
            placeholder="--Select a Cleanup Type--"
            searchable
            data={[
                'Biohazard Cleanup',
                'General Room Cleaning',
                'Waste Removal',
                'Floor Cleaning (mop, vacuum, etc.)',
                'Restroom Cleaning',
                'Spill Cleanup',
                'Equipment Cleaning',
            ]}
            nothingFoundMessage="Cleanup Type not found"
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

export default SanitationSelect;
