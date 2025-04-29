import { ActionIcon, Flex, Box } from '@mantine/core';
import { TimeInput, TimeInputProps } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import * as chrono from 'chrono-node';
import { notifications } from '@mantine/notifications';


const TimeEntry: React.FC<TimeInputProps> = (props) => {
  const [value, setValue] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);
  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>);

  const handleSpeechResult = (text: string) => {
    const parsedTime = chrono.parseDate(text);
    if (parsedTime) {
      const hours = parsedTime.getHours().toString().padStart(2, '0');
      const minutes = parsedTime.getMinutes().toString().padStart(2, '0');
      setValue(`${hours}:${minutes}`);
    } else {
      notifications.show({
        title: 'Speech Error',
        message: 'Could not Recognized a Valid Time',
        color: 'red',
      });    }
  };
    return (
      <Flex align="center" gap="sm">

      <TimeInput
            {...props}
            label="Enter Time"
            radius="sm"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            w="240px"
            ref={ref}
            mb="md"
            size="xs"
            leftSection={pickerControl}
            required
            c={"#285CC6"}
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

export default TimeEntry;
