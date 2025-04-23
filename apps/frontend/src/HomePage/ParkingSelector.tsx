import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconBuilding, IconChevronDown } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { hospitalOptions } from './GmapsDestinationSelector.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { useChestnutHillContext, usePatriotContext } from '../contexts/DirectoryContext.tsx';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';

export function ParkingSelector() {
    const { setSelectedHospital, setDirectoryOptions, department, selectedAlgorithm } =
        useTimeline();

    const theme = useMantineTheme();

    const Patriot = usePatriotContext();
    const Chestnut = useChestnutHillContext();

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
        } else {
            setDirectoryOptions([]);
        }
        if (department && selectedAlgorithm) {
            NavSelection.dispatch({
                type: 'SET_NAV_REQUEST',
                data: {
                    HospitalName: hospital,
                    Department: department,
                    AlgorithmName: selectedAlgorithm,
                } as NavSelectionItem,
            });
        }
        //setSelectedHospitalName(hospital);
        //setSelectedDepartment(null);
    };

    return (
        <Autocomplete
            placeholder="Hospital Destination"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={<IconBuilding size="16" style={{ color: theme.colors.primaryBlues[8] }} />}
            data={hospitalOptions}
            onChange={setHospitalLocation}
            radius="sm"
            mb="sm"
            size="xs"
            w={'100%'}
        />
    );
}
