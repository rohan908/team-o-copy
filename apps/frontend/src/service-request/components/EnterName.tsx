import { Textarea, TextareaProps } from '@mantine/core';

const EnterName: React.FC<TextareaProps> = (props) => {
  return (
    <Textarea
      {...props}
      label="Enter employee name"
      placeholder="--Enter employee name--"
      radius="sm"
      autosize
      minRows={1}
      mb="sm"
      size = "xs"
    />
  );
};

export default EnterName;
