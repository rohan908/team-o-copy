import { useState } from 'react';
import {DateInput, DateInputProps} from '@mantine/dates';

const DateEntry: React.FC<DateInputProps> = (props) => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DateInput
      {...props}
      value={value}
      onChange={setValue}
      label="Date input"
      placeholder="Date input"
      styles={{
        calendar: {
          // Calendar header (month/year navigation)
          calendarHeader: {
            margin: '0 auto',
            maxWidth: '100%',
          },
          // Weekday names (Mon, Tue, etc.)
          weekday: {
            fontWeight: 'normal',
            padding: '0.25rem 0',
            fontSize: '0.75rem',
          },
          // Individual day cells
          day: {
            height: '2rem',
            width: '2rem',
            fontSize: '0.875rem',
            margin: '0.1rem',
            borderRadius: 'sm',
          },
          // Month table
          month: {
            width: '100%',
            tableLayout: 'fixed',
          },
          // Cell container
          cell: {
            padding: '0.1rem',
          },
        },
      }}
      // Ensures consistent popover behavior
      dropdownType="popover"
      popoverProps={{
        withinPortal: true,
        zIndex: 1000,
      }}
    />
  );
};

export default DateEntry;
