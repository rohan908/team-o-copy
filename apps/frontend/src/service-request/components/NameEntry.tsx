import { TextInputProps, TextInput } from '@mantine/core';

const NameEntry: React.FC<TextInputProps> = (props) => {
    return (
        <TextInput
            {...props}
            label="Enter Employee Name"
            placeholder="--Enter Name--"
            radius="sm"
            mb="sm"
            size="xs"
            required
        />
    );
};

export default NameEntry;
