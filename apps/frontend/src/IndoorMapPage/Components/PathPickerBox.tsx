import { Box, Select, Stack, Text, useMantineTheme } from '@mantine/core';
import { useChestnutHillContext, usePatriotContext } from '../../contexts/DirectoryContext.tsx';
import { useState } from 'react';
import { DirectoryNodeItem } from '../../contexts/DirectoryItem.ts';

interface PathPickerBoxProps {
    currAlgo?: string | null;
    setPathAlgo: (algo: string) => void;
    currHospital?: string | null;
    setSelectedHospitalName: (hospital: string | null) => void;
    selectedDepartment?: string | null;
    setSelectedDepartment: (department: string | null) => void;
}

export function PathPickerBox({
    currAlgo,
    setPathAlgo,
    currHospital,
    setSelectedHospitalName,
    selectedDepartment,
    setSelectedDepartment,
}: PathPickerBoxProps) {
    const theme = useMantineTheme();
    const Patriot = usePatriotContext();
    const Chestnut = useChestnutHillContext();
    const [departmentOptions, setDepartmentOptions] = useState<{ value: string; label: string }[]>(
        []
    );

    const MapDepartment = (department: DirectoryNodeItem[]) =>
        department.map((department: DirectoryNodeItem) => ({
            value: department.name,
            label: department.name,
        }));

    const setHospitalLocation = (hospital: string | null) => {
        if (hospital == '20 Patriot Pl' || hospital == '22 Patriot Pl') {
            setDepartmentOptions(MapDepartment(Patriot));
        } else if (hospital == 'Chestnut Hill') {
            setDepartmentOptions(MapDepartment(Chestnut));
        } else {
            setDepartmentOptions([]);
        }
        setSelectedHospitalName(hospital);
        setSelectedDepartment(null);
    };

    return (
        <Box
            bg={theme.colors.themeGold[1]}
            maw={'30%'}
            style={{
                zIndex: 1000,
                borderBottomRightRadius: '10px',
                '.mantine-Select-root': { zIndex: 9000 },
            }}
            pos={'absolute'}
            p={'xl'}
        >
            <Stack gap={2} style={{ zIndex: 1001 }} pos={'relative'}>
                <Text ta="left" mb="sm" fw={500}>
                    Select Hospital:
                </Text>
                <Select
                    color="gray"
                    placeholder="Hospital"
                    data={[
                        { value: '20 Patriot Pl', label: '20 Patriot Pl' },
                        { value: '22 Patriot Pl', label: '22 Patriot Pl' },
                        { value: 'Chestnut Hill', label: 'Chestnut Hill' },
                    ]}
                    value={currHospital}
                    onChange={setHospitalLocation}
                    mb="md"
                    style={{ zIndex: 2000 }}
                />

                <Text ta="left" mb="sm" fw={500}>
                    Select Department:
                </Text>
                <Select
                    color="gray"
                    placeholder="Department"
                    data={departmentOptions}
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                    mb="md"
                    disabled={!currHospital || departmentOptions.length === 0}
                    style={{ zIndex: 2000 }}
                />
                <Text ta="left" mb="sm" fw={500}>
                    Select Navigation Method:
                </Text>
                <Select
                    color="gray"
                    placeholder="Navigation Method"
                    data={[
                        { value: 'BFS', label: 'Breadth First Search' },
                        {
                            value: 'A*',
                            label: 'A Star',
                        },
                    ]}
                    value={currAlgo}
                    onChange={(value) => {
                        setPathAlgo(value || 'BFS');
                    }}
                    mb="md"
                    style={{ zIndex: 2000 }}
                />
            </Stack>
        </Box>
    );
}
