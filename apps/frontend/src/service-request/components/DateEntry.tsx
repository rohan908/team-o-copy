import { DateInput, DateInputProps } from '@mantine/dates';

const DateEntry: React.FC<DateInputProps> = (props) => {
    return (
        <DateInput
            {...props}
            placeholder="Select a date"
            label="Enter Date"
            mb="md"
            radius="sm"
            size="xs"
            required
            c={"#285CC6"}
            styles={{
                label: {
                    fontSize: '18px',
                    fontWeight: 350,
                },
            }}
        />
    );
};
// had to get the default style of Calendar because something was messing it up with our Mantine
export default DateEntry;
