import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconBuilding, IconChevronDown, IconRouteSquare } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';

//need to change this to actual api call autocomplete later
const algoOptions = [
    { value: 'BFS', label: 'Breadth First Search' },
    { value: 'A*', label: 'A Star' },
    { value: 'DFS', label: 'Depth First Search' },
];

interface AlgorithmSelectorProps {
  hasIcon: boolean
  w: string
}

export function AlgorithmSelector(props: AlgorithmSelectorProps) {
    const theme = useMantineTheme();
    const { setSelectedAlgorithm, selectedHospital, department, selectedAlgorithm } = useTimeline();
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
        <Select
            placeholder="Select an Algorithm"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={!props.hasIcon ? null :
                <IconRouteSquare size="16" style={{ color: theme.colors.primaryBlues[8]}} />
            }
            data={algoOptions}
            radius="md"
            mb="sm"
            size="xs"
            value={selectedAlgorithm ?? ''}
            onChange={setSelectedAlgo}
            disabled={!selectedHospital || !department}
            w={props.w}
        />
    );
}
