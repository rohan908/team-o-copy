import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconBuilding, IconChevronDown, IconRouteSquare } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { useAlgorithmContext } from '../contexts/AlgorithmContext.tsx';

//need to change this to actual api call autocomplete later
const algoOptions = [
    { value: 'BFS', label: 'Breadth First Search' },
    { value: 'A*', label: 'A Star' },
    { value: 'DFS', label: 'Depth First Search' },
];

interface AlgorithmSelectorProps {
    hasIcon: boolean;
    w: string;
}

export function AlgorithmSelector(props: AlgorithmSelectorProps) {
    const theme = useMantineTheme();
    const { selectedHospital, department } = useTimeline();
    const { algorithm, setAlgorithm } = useAlgorithmContext();

    const setSelectedAlgo = (algo: string | null) => {
        if (algo) setAlgorithm(algo);
    };
    return (
        <Select
            placeholder="Select an Algorithm"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={
                !props.hasIcon ? null : (
                    <IconRouteSquare size="16" style={{ color: theme.colors.primaryBlues[8] }} />
                )
            }
            data={algoOptions}
            radius="md"
            mb="sm"
            size="xs"
            value={algorithm}
            onChange={setSelectedAlgo}
            disabled={!selectedHospital || !department}
            w={props.w}
        />
    );
}
