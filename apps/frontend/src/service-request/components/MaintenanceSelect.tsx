import { Select, SelectProps } from '@mantine/core';

const MaintenanceSelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            label="Choose the Maintenance Needed"
            placeholder="--Select a Cleanup Type--"
            searchable
            data={[
                'Elevator',
                'HVAC',
                'Medical Equipment',
                'Plumbing',
                'Electrical',
                'Building Structure',
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

export default MaintenanceSelect;
