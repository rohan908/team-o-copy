import { ActionIcon } from '@mantine/core';
import { TimeInput, TimeInputProps } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';
import { useRef } from 'react';

const TimeEntry: React.FC<TimeInputProps> = (props) => {
    const ref = useRef<HTMLInputElement>(null);
    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock size={16} stroke={1.5} />
        </ActionIcon>
    );
    return (
        <TimeInput
            {...props}
            label="Enter Time"
            radius="sm"
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
    );
};

export default TimeEntry;
