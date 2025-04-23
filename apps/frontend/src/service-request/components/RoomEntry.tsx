import { TextInput, TextInputProps } from '@mantine/core';

const RoomNumberInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      type="text"
      inputMode="numeric"
      placeholder="--Room Number--"
      label="Enter Room Number"
      radius="sm"
      mb="sm"
      size = "xs"
      c={"#285CC6"}
    />
  );
};

export default RoomNumberInput;
