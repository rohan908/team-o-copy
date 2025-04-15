import {TextInputProps, TextInput} from '@mantine/core';

const NameEntry: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      label="Enter Employee Name"
      placeholder="FirstName LastName"
      radius="sm"
      mb="sm"
      size = "xs"
    />
  );
};

export default NameEntry;
