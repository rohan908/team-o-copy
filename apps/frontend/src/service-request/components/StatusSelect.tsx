import { Select, SelectProps } from '@mantine/core';

const StatusSelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            label="What is the Status "
            placeholder="--Select a Status--"
            searchable
            data={['Unassigned', 'Assigned', 'Working', 'Done']}
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

export default StatusSelect;
