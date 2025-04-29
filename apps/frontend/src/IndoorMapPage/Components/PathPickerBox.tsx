import { Box, Select, Stack, Text, useMantineTheme } from '@mantine/core';
import {
    useBwhCampusContext,
    useChestnutHillContext,
    useFaulknerHospitalContext,
    usePatriotContext,
} from '../../contexts/DirectoryContext.tsx';
import { useNavSelectionContext } from '../../contexts/NavigationContext.tsx';
import { useState } from 'react';
import { DirectoryNodeItem } from '../../contexts/DirectoryItem.ts';
import { TwoPartInteractiveBox } from '../../common-compoents/standAloneFrame.tsx';
import { NavSelectionItem } from '../../contexts/NavigationItem.ts';

export function PathPickerBox() {
    const theme = useMantineTheme();
    const Patriot = usePatriotContext();
    const Chestnut = useChestnutHillContext();
    const Faulkner = useFaulknerHospitalContext();
    const BWHCampus = useBwhCampusContext();
    const NavSelection = useNavSelectionContext();
    const [departmentOptions, setDepartmentOptions] = useState<{ value: string; label: string }[]>(
        []
    );
    // keep local states so we're not setting and access the context in one file
    const [department, setDepartment] = useState<string | null>(null);
    const [hospital, setHospital] = useState<string | null>(null);
    const [algo, setAlgo] = useState<string | null>("A*");

    const MapDepartment = (department: DirectoryNodeItem[]) =>
        department.map((department: DirectoryNodeItem) => ({
            value: department.name,
            label: department.name,
        }));

    const setHospitalLocation = (hospital: string | null) => {
        setHospital(hospital);
        if (hospital == '20 Patriot Pl' || hospital == '22 Patriot Pl') {
            setDepartmentOptions(MapDepartment(Patriot));
        } else if (hospital == 'Chestnut Hill') {
            setDepartmentOptions(MapDepartment(Chestnut));
        } else if (hospital == 'Faulkner Hospital') {
            setDepartmentOptions(MapDepartment(Faulkner));
        } else if (hospital == 'BWH Campus') {
            setDepartmentOptions(MapDepartment(BWHCampus));
        } else {
            setDepartmentOptions([]);
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

    const setSelectedDepartment = (department: string | null) => {
        setDepartment(department);
        NavSelection.dispatch({
            type: 'SET_NAV_REQUEST',
            data: {
                HospitalName: hospital,
                Department: department,
            } as NavSelectionItem,
        });
    };

    const setSelectedAlgo = (algo: string | null) => {
        setAlgo(algo);
        NavSelection.dispatch({
            type: 'SET_NAV_REQUEST',
            data: {
                HospitalName: hospital,
                Department: department,
            } as NavSelectionItem,
        });
    };

    const lowerSelectors = (
        <Stack w="100%">
            <Text ta="left" fw={500}>
                Select Hospital:
            </Text>
            <Select
                w={'100%'}
                color="gray"
                placeholder="Hospital"
                data={[
                    { value: '20 Patriot Pl', label: '20 Patriot Pl' },
                    { value: '22 Patriot Pl', label: '22 Patriot Pl' },
                    { value: 'Chestnut Hill', label: 'Chestnut Hill' },
                    { value: 'Faulkner Hospital', label: 'Faulkner Hospital' },
                    { value: 'BWH Campus', label: 'BWH Campus' },
                ]}
                value={hospital}
                onChange={(value) => {
                    setHospitalLocation(value);
                }}
            />
            <Text ta="left" fw={500}>
                Select Department:
            </Text>
            <Select
                color="gray"
                placeholder="Department"
                data={departmentOptions}
                value={department}
                onChange={(value) => {
                    setSelectedDepartment(value);
                }}
                mb="md"
                disabled={!hospital || departmentOptions.length === 0}
            />
            {/*<Text ta="left" fw={500}>*/}
            {/*    Select Navigation Method:*/}
            {/*</Text>*/}
            {/*<Select*/}
            {/*    color="gray"*/}
            {/*    placeholder="Navigation Method"*/}
            {/*    data={[*/}
            {/*        { value: 'BFS', label: 'Breadth First Search' },*/}
            {/*        {*/}
            {/*            value: 'A*',*/}
            {/*            label: 'A Star',*/}
            {/*        },*/}
            {/*        { value: 'DFS', label: 'Depth First Search' },*/}
            {/*    ]}*/}
            {/*    defaultValue="BFS"*/}
            {/*    value={algo}*/}
            {/*    onChange={(value) => {*/}
            {/*        setSelectedAlgo(value);*/}
            {/*    }}*/}
            {/*/>*/}
        </Stack>
    );

    return (
        <Box pos={'absolute'} style={{ zIndex: 10 }}>
            <TwoPartInteractiveBox title="Navigation Options">
                {lowerSelectors}
            </TwoPartInteractiveBox>
        </Box>
    );
}
