import { Select, useMantineTheme } from '@mantine/core';
import {IconBuildings, IconChevronDown } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { hospitalOptions } from './GmapsDestinationSelector.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import {
    useBwhCampusContext,
    useChestnutHillContext,
    useFaulknerHospitalContext,
    usePatriotContext,
} from '../contexts/DirectoryContext.tsx';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import { useEffect, useState } from 'react';

interface ParkingSelectorProps {
    hasIcon: boolean;
    w: string;
}

export function ParkingSelector(props: ParkingSelectorProps) {
    const {
        setSelectedHospital,
        setDirectoryOptions,
        setDepartment,
        department,
        selectedHospital,
    } = useTimeline();

    const [localValue, setLocalValue] = useState<string | null>(null);
    useEffect(() => {
        setLocalValue(selectedHospital);
    }, [selectedHospital]);

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
        setLocalValue(hospital);
        setSelectedHospital(hospital);
        setDepartment(null);

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
        NavSelection.dispatch({
            type: 'SET_NAV_REQUEST',
            data: {
                HospitalName: hospital,
                Department: null,
            } as NavSelectionItem,
        });
        //setSelectedHospitalName(hospital);
        //setSelectedDepartment(null);
    };

    return (
        <Select
            placeholder="Hospital Destination"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={
                !props.hasIcon ? null : (
                    <IconBuildings size="16" style={{ color: theme.colors.primaryBlues[8] }} />
                )
            }
            data={hospitalOptions}
            value={localValue}
            onChange={setHospitalLocation}
            mb="sm"
            radius="md"
            size="xs"
            w={props.w}
        />
    );
}
