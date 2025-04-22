import { DateInput, DateInputProps } from '@mantine/dates';

const DateEntry: React.FC<DateInputProps> = (props) => {
    return (
        <DateInput
            {...props}
            placeholder="--Select a date--"
            label="Enter Date"
            required
            mb="sm"
            radius="sm"
            size="xs"
        />
    );
};
// had to get the default style of Calendar because something was messing it up with our Mantine
export default DateEntry;
