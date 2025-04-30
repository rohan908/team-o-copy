import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import { IconBuilding, IconChevronDown, IconRouteSquare } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import { ALGORITHM } from 'common/src/constants.ts';
import axios from 'axios';
import { getAlgoId, setAlgo } from '../IndoorMapPage/HelperFiles/setAlgoRouting.ts';
import { useEffect, useState } from 'react';

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
    hasIcon: boolean;
    w: string;
}

export function AlgorithmSelector(props: AlgorithmSelectorProps) {
    const theme = useMantineTheme();

    const [algoStr, setAlgoStr] = useState<string>(''); // default empty string
    //need useEffect because its an async call to get the world selected algo
    useEffect(() => {
        const fetchAlgoStr = async () => {
            const algoId: number = await getAlgoId(); // make sure getAlgoId returns Promise<number>

            setAlgoStr(algoId.toString()); // update state after fetching
        };

        fetchAlgoStr(); // call the async function
    }, []);

    const { selectedHospital, department, setDepartment } = useTimeline();
    const NavSelection = useNavSelectionContext();

    const setSelectedAlgo = (algo: string | null) => {
        setAlgoStr(algo!);
        setAlgo(+algo!);
        console.log('selector algo just changed to: ', algo);

        // setDepartment(department);
        // NavSelection.dispatch({
        //     type: 'SET_NAV_REQUEST',
        //     data: {
        //         HospitalName: selectedHospital,
        //         Department: department,
        //         AlgorithmChange: true,
        //     } as NavSelectionItem,
        // });
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
            mb="sm"
            radius="md"
            size="xs"
            value={algoStr ?? ''}
            onChange={setSelectedAlgo}
            w={props.w}
        />
    );
}
