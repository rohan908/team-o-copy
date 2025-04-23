import {TextInputProps, TextInput} from '@mantine/core';

const NameEntry: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      label="Enter Employee Name"
      placeholder="--Enter Name--"
      radius="sm"
      mb="sm"
      size = "xs"
      c={"#285CC6"}
    />
  );
};

export default NameEntry;
