
import {DateInput, DateInputProps} from '@mantine/dates';


const DateEntry: React.FC<DateInputProps> = (props) => {

  return (
    <DateInput
      {...props}
      placeholder="Select a date"
      label="Enter Date"
      required
      radius="sm"
      popoverProps={{
        shadow: 'md',
        radius: 'md',
        withArrow: true,
        withinPortal: true,
        styles: {
          dropdown: {
            padding: '0.75rem',
            maxWidth: '22rem',
          },
        },
      }}
    />
  );
};
// had to get the default style of Calendar because something was messing it up with our Mantine
export default DateEntry;
