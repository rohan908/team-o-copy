import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconCarFilled, IconChevronDown, IconMapPinFilled } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';

export function ModeOfTravelSelector() {
    const theme = useMantineTheme();
    const { setTravelMode, travelMode } = useTimeline();
    return (
        <Select
            placeholder="Mode of Transport"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={
                <IconCarFilled size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            data={[
                { value: 'WALKING', label: 'Walking' },
                { value: 'TRANSIT', label: 'Public Transportation' },
                { value: 'DRIVING', label: 'Driving' },
            ]}
            value={travelMode}
            onChange={setTravelMode}
            radius="sm"
            mb="sm"
            size="xs"
            w={{ xl: '350px', lg: '300px', sm: '100%' }}
        />
    );
}
