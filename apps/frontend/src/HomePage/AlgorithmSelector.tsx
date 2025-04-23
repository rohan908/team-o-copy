import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconBuilding, IconChevronDown, IconRouteSquare } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';

//need to change this to actual api call autocomplete later
const algoOptions = [
    { value: 'BFS', label: 'Breadth First Search' },
    {
        value: 'A*',
        label: 'A Star',
    },
    { value: 'DFS', label: 'Depth First Search' },
];

export function AlgorithmSelector() {
    const theme = useMantineTheme();
    const { setSelectedAlgorithm, selectedHospital, department } = useTimeline();
    const NavSelection = useNavSelectionContext();

    const setSelectedAlgo = (algo: string | null) => {
        setSelectedAlgorithm(algo);
        NavSelection.dispatch({
            type: 'SET_NAV_REQUEST',
            data: {
                HospitalName: selectedHospital,
                Department: department,
                AlgorithmName: algo,
            } as NavSelectionItem,
        });
    };
    return (
        <Autocomplete
            placeholder="Select an Algorithm"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={
                <IconRouteSquare size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            data={algoOptions}
            radius="sm"
            mb="sm"
            size="xs"
            onChange={setSelectedAlgo}
            disabled={!selectedHospital || !department}
            w={{ base: '100%', sm: '400px' }}
        />
    );
}
