import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconBuilding, IconChevronDown, IconRouteSquare } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import { ALGORITHM } from 'common/src/constants.ts';
import axios from 'axios';
import { setAlgo } from './setAlgoRouting.ts';

//need to change this to actual api call autocomplete later
const algoOptions = [
    { value: ALGORITHM.BFS.toString(), label: 'Breadth First Search' },
    {
        value: ALGORITHM.AStar.toString(),
        label: 'A Star',
    },
    { value: ALGORITHM.DFS.toString(), label: 'Depth First Search' },
];

interface AlgorithmSelectorProps {
  hasIcon: boolean
  w: string
}

export function AlgorithmSelector(props: AlgorithmSelectorProps) {
    const theme = useMantineTheme();
    const { selectedHospital, department } = useTimeline();
    const NavSelection = useNavSelectionContext();

    const setSelectedAlgo = (algo: string | null) => {
        setAlgo(+algo!);
        console.log('selector algo just changed to: ', algo);
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
            radius="sm"
            mb="sm"
            size="xs"
            value={''}
            onChange={setSelectedAlgo}
            disabled={!selectedHospital || !department}
            w={props.w}
        />
    );
}
