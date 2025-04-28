import { DateInput, DateInputProps } from '@mantine/dates';
import { Flex, Box } from '@mantine/core';
import React,  { useState }  from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import * as chrono from 'chrono-node';




const DateEntry: React.FC<DateInputProps> = (props) => {
  const [value, setValue] = useState<Date | null>(null);
  const handleSpeechResult = (text: string) => {
    const parsedDate = chrono.parseDate(text); // Parse the spoken text
    if (parsedDate) {
      setValue(parsedDate); // Only set if it's a valid date
    } else {
      alert('Could not recognize a valid date');
    }
  };
  return (
    <Flex align="center" gap="sm">

    <DateInput
            {...props}
            placeholder="Select a date"
            label="Enter Date"
            mb="md"
            radius="sm"
            size="xs"
            required
            c={"#285CC6"}
            value={value}
            onChange={setValue}
            w="240px"
            styles={{
                label: {
                    fontSize: '18px',
                    fontWeight: 350,
                },
            }}
        />
      <Box mt={14}>
        <SpeechToText OnResult={handleSpeechResult} />
      </Box>
    </Flex>

  );
};
// had to get the default style of Calendar because something was messing it up with our Mantine
export default DateEntry;
