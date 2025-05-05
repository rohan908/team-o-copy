import { DateInput, DateInputProps } from '@mantine/dates';
import { Flex, Box } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import * as chrono from 'chrono-node';
import { notifications } from '@mantine/notifications';




const DateEntry: React.FC<DateInputProps> = (props) => {
  const handleSpeechResult = (text: string) => {
    const parsedDate = chrono.parseDate(text); // Parse the spoken text
    if (parsedDate) {
      props.onChange?.(parsedDate); // Only set if it's a valid date
    } else {
      notifications.show({
        title: 'Speech Error',
        message: 'Could not recognize a valid date',
        color: 'red',
      });    }
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
