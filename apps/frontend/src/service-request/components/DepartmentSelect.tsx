import { Select, SelectProps } from '@mantine/core';

interface DepartmentSelectProps extends SelectProps {
    departments: string[]; // Just titles
}

const DepartmentSelect: React.FC<DepartmentSelectProps> = ({ departments, ...props }) => {
    return (
        <Select
            label="Choose the Department"
            placeholder={
                departments.length > 0 ? '--Select a Department--' : 'Select hospital first'
            }
            searchable
            data={departments}
            radius="sm"
            size="xs"
            mb="sm"
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

export default DepartmentSelect;
