import { DateInput, DateInputProps } from '@mantine/dates';

const DateEntry: React.FC<DateInputProps> = (props) => {
    return (
        <DateInput
            {...props}
            placeholder="--Select a date--"
            label="Enter Date"
            mb="sm"
            radius="sm"
            size="xs"
            required
            styles={{
                label: {
                    fontSize: '16px',
                    fontWeight: 400,
                },
            }}
        />
    );
};
// had to get the default style of Calendar because something was messing it up with our Mantine
export default DateEntry;
