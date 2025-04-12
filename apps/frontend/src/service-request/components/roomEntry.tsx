import { TextInput, TextInputProps } from '@mantine/core';

const RoomNumberInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      type="text"
      inputMode="numeric"
      placeholder="000"
      label="Enter the room number for interpreter:"
      radius="sm"
      mb="md"
    />
  );
};

export default RoomNumberInput;
