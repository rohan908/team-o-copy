import { Select, SelectProps } from '@mantine/core';

const MaintenanceSelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            label="Choose the Maintenance Needed"
            placeholder="Select Maintenance Issue"
            searchable
            data={[
                'Elevator',
                'HVAC',
                'Medical Equipment',
                'Plumbing',
                'Electrical',
                'Building Structure',
            ]}
            nothingFoundMessage="Maintenance Type not found"
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

export default MaintenanceSelect;
