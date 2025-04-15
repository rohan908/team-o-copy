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
                '',
            ]}
            nothingFoundMessage="Cleanup Type not found"
            radius="sm"
            mb="sm"
            size="xs"
            {...props}
        />
    );
};

export default SanitationSelect;
