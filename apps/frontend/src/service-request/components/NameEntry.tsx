import { TextInputProps, TextInput } from '@mantine/core';

const NameEntry: React.FC<TextInputProps> = (props) => {
    return (
        <TextInput
            {...props}
            label="Enter Employee Name"
            placeholder="--Enter Name--"
            radius="sm"
            mb="md"
            size="xs"
            required
            styles={{
                label: {
                    fontSize: '18px',
                    fontWeight: 350,
                },
            }}
        />
    );
};

export default NameEntry;
