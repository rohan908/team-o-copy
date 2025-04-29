import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import {IconBuildings, IconChevronDown, IconMapPinFilled} from '@tabler/icons-react';
import { useState } from 'react';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import { useTimeline } from './TimeLineContext.tsx';
import {
    useChestnutHillContext,
    useFaulknerHospitalContext,
    usePatriotContext,
    useBwhCampusContext,
} from '../contexts/DirectoryContext.tsx';

interface GmapsDestinationSelectorProps {
  hasIcon: boolean
  w: string
}

export const hospitalOptions = [
    { value: '20 Patriot Pl', label: '20 Patriot Pl' },
    { value: '22 Patriot Pl', label: '22 Patriot Pl' },
    { value: 'Chestnut Hill', label: 'Chestnut Hill' },
    { value: 'Faulkner Hospital', label: 'Faulkner Hospital' },
    { value: 'BWH Campus', label: 'BWH Campus' },
];

export function GmapsDestinationSelector(props:GmapsDestinationSelectorProps) {
    const { setSelectedHospital, setDirectoryOptions } = useTimeline();

    const theme = useMantineTheme();

    const Patriot = usePatriotContext();
    const Chestnut = useChestnutHillContext();
    const Faulkner = useFaulknerHospitalContext();
    const BWH = useBwhCampusContext();

    const NavSelection = useNavSelectionContext();

    const MapDepartment = (department: DirectoryNodeItem[]) =>
        department.map((department: DirectoryNodeItem) => ({
            value: department.name,
            label: department.name,
        }));

    const setHospitalLocation = (hospital: string | null) => {
        setSelectedHospital(hospital);
        if (hospital == '20 Patriot Pl' || hospital == '22 Patriot Pl') {
            setDirectoryOptions(MapDepartment(Patriot));
        } else if (hospital == 'Chestnut Hill') {
            setDirectoryOptions(MapDepartment(Chestnut));
        } else if (hospital == 'Faulkner Hospital') {
            setDirectoryOptions(MapDepartment(Faulkner));
        } else if (hospital == 'BWH Campus') {
            setDirectoryOptions(MapDepartment(BWH));
        } else {
            setDirectoryOptions([]);
        }
        //setSelectedHospitalName(hospital);
        //setSelectedDepartment(null);
    };
    return (
        <Select
            placeholder="Hospital Destination"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={!props.hasIcon ? null :
              <IconBuildings size="16" style={{ color: theme.colors.primaryBlues[8]}} />
            }
            data={hospitalOptions}
            onChange={setHospitalLocation}
            radius="md"
            mb="sm"
            size="xs"
            w={props.w}
        />
    );
}
