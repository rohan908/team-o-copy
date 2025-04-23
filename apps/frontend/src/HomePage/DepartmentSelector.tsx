import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconBuilding, IconChevronDown, IconHospital } from '@tabler/icons-react';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { useTimeline } from './TimeLineContext.tsx';

export function DepartmentSelector() {
    const theme = useMantineTheme();

    const { directoryOptions, selectedHospital } = useTimeline();

    return (
        <Autocomplete
            placeholder="Select a Department"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={<IconHospital size="16" style={{ color: theme.colors.primaryBlues[8] }} />}
            data={directoryOptions}
            radius="sm"
            mb="sm"
            size="xs"
            disabled={directoryOptions.length === 0}
            w={{ xl: '350px', lg: '300px', sm: '100%' }}
        />
    );
}
