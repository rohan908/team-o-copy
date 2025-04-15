import { Textarea, TextareaProps } from '@mantine/core';

const NameEntry: React.FC<TextareaProps> = (props) => {
  return (
    <Textarea
      {...props}
      label="Enter Employee Name"
      placeholder="FirstName LastName"
      radius="sm"
      autosize
      mb="sm"
      size = "xs"
    />
  );
};

export default NameEntry;
