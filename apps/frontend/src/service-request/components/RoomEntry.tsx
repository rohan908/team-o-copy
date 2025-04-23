import { TextInput, TextInputProps } from '@mantine/core';

const RoomNumberInput: React.FC<TextInputProps> = (props) => {
    return (
        <TextInput
            {...props}
            type="text"
            inputMode="numeric"
            placeholder="Room Number"
            label="Enter Room Number"
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

export default RoomNumberInput;
