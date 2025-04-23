import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconMapPinFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import { useTimeline } from './TimeLineContext.tsx';

export const hospitalOptions = [
    { value: '20 Patriot Pl', label: '20 Patriot Pl' },
    { value: '22 Patriot Pl', label: '22 Patriot Pl' },
    { value: 'Chestnut Hill', label: 'Chestnut Hill' },
];

export function GmapsDestinationSelector() {
    const NavSelection = useNavSelectionContext();

    const { setSelectedHospital } = useTimeline();

    const theme = useMantineTheme();

    return (
        <Autocomplete
            placeholder="Hospital Destination"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={
                <IconMapPinFilled size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            data={hospitalOptions}
            onChange={setSelectedHospital}
            radius="sm"
            mb="sm"
            size="xs"
            w={{ xl: '350px', lg: '300px', sm: '100%' }}
        />
    );
}
