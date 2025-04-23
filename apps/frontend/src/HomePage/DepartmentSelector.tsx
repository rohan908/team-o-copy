import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconBuilding, IconChevronDown, IconHospital } from '@tabler/icons-react';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { useTimeline } from './TimeLineContext.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';

export function DepartmentSelector() {
    const theme = useMantineTheme();

    const { directoryOptions, selectedHospital, setDepartment, selectedAlgorithm } = useTimeline();
    const NavSelection = useNavSelectionContext();

    const setSelectedDepartment = (department: string | null) => {
        setDepartment(department);
        if (selectedAlgorithm) {
            NavSelection.dispatch({
                type: 'SET_NAV_REQUEST',
                data: {
                    HospitalName: selectedHospital,
                    Department: department,
                    AlgorithmName: selectedAlgorithm,
                } as NavSelectionItem,
            });
        }
    };

    return (
        <Autocomplete
            placeholder="Select a Department"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={<IconHospital size="16" style={{ color: theme.colors.primaryBlues[8] }} />}
            data={directoryOptions}
            onChange={setSelectedDepartment}
            radius="sm"
            mb="sm"
            size="xs"
            disabled={!selectedHospital && directoryOptions.length === 0}
            w={{ xl: '350px', lg: '300px', sm: '100%' }}
        />
    );
}
