import { TimeInput, TimeInputProps } from '@mantine/dates';

const TimeEntry: React.FC<TimeInputProps> = (props) => {
  return (
    <TimeInput
      {...props}
      placeholder="Select a time"
      radius="sm"
      mb="md"
    />
  );
};

export default TimeEntry;
