import React, { useState, useEffect } from 'react';
import { Patriot20, Patriot22 } from '../directory/components/directorydata.tsx';
import { Space } from '@mantine/core'
import {
    Box,
    Text,
    Title,
    Flex,
    Button,
    Divider,
    Select,
    useMantineTheme,
    Collapse,
} from '@mantine/core';
import * as L from 'leaflet';

interface HospitalSelectBoxProps {
    onSelectHospital: (coordinate: L.LatLng) => void;
    onSelectDepartment?: (dept: string) => void;
}

const SelectBox: React.FC<HospitalSelectBoxProps> = ({
                                                         onSelectHospital,
                                                         onSelectDepartment,
                                                     }) => {
    const theme = useMantineTheme();
    const [hospital, setHospital] = useState<string | null>(null);
    const [department, setDepartment] = useState<string | null>(null);
    const [collapsed, setCollapsed] = useState(false);
    const [departmentOptions, setDepartmentOptions] = useState<
        { value: string; label: string }[]
    >([]);


    const handleFindPath = () => {
        if (!hospital) {
             return;
        }
        if (department == "pharmacy"){
            onSelectHospital(new L.LatLng(42.09308766703694, -71.26829740033861));
            console.log("you selected :",department )
        }
        else{
            onSelectHospital(new L.LatLng(42.091902, -71.266422));
            console.log("else you selected :",department )
        }
        if (department && onSelectDepartment) {
            onSelectDepartment(department);
        }
        setCollapsed(true);
    };

    useEffect(() => {
        if (hospital === '20 Patriot St') {
            const options = Patriot20.map((dept) => ({
                value: dept.slug,
                label: dept.title,
            }));
            setDepartmentOptions(options);
        } else if (hospital === '22 Patriot St') {
            const options = Patriot22.map((dept) => ({
                value: dept.slug,
                label: dept.title,
            }));
            setDepartmentOptions(options);
        } else {
            setDepartmentOptions([]);
        }

        // Reset department when hospital changes
        setDepartment(null);
    }, [hospital]);

    return (
        <Box
            pos="fixed"
            bottom="0"
            left={0}
            right={0}
            style={{
                zIndex: 999,
                display: 'flex',
                justifyContent: 'center',
                transition: 'all 0.4s ease-in-out',
                paddingBottom: collapsed ? 0 : '1.5rem',
            }}
        >
            <Box
                bg="white"
                p={collapsed ? 0 : { base: 'xl', sm: '2rem' }}
                w="100%"
                maw={{ base: '95%', sm: '80%', md: '600px' }}
                style={{
                    opacity: 0.95,
                    borderRadius: theme.radius.lg,
                    backdropFilter: 'blur(5px)',
                    boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                }}
            >
                <Collapse in={!collapsed}>
                    <Title order={2} mb="md" c="black" ta="left" fw={700} fz={{ sm: 'xl', md: 'xxxl' }}>
                        Find your Way!
                    </Title>

                    <Text
                        mb="sm"
                        ta="left"
                        fz={{ base: 'xxs', sm: 'sm', md: 'sm' }}
                        c="dimmed"
                        style={{
                            fontStyle: 'italic',
                            lineHeight: 1.5,
                            maxWidth: '90%',
                        }}
                    >
                        Use our interactive map to locate hospital departments, find the best parking spots, and
                        navigate your route efficiently.
                    </Text>

                    <Divider variant="dotted" size="lg" mb="lg" />

                    <Text ta="left" mb="sm" fw={500}>
                        Select Hospital:
                    </Text>
                    <Select
                        placeholder="Hospital"
                        data={[
                            { value: '20 Patriot St', label: '20 Patriot St' },
                            { value: '22 Patriot St', label: '22 Patriot St' },
                        ]}
                        value={hospital}
                        onChange={setHospital}
                        mb="md"
                    />

                    <Text ta="left" mb="sm" fw={500}>
                        Select Department:
                    </Text>
                    <Select
                        placeholder="Department"
                        data={departmentOptions}
                        value={department}
                        onChange={setDepartment}
                        mb="md"
                        disabled={!hospital || departmentOptions.length === 0}
                    />

                    <Flex justify="flex-end" gap="md">


                        <Button
                            onClick={handleFindPath}
                            color="dark"
                            fw="600"
                            bg="black"
                            fz={{ base: 'xs', sm: 'sm', md: 'sm' }}

                            style={{
                                borderRadius: '50px',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Find Path
                        </Button>
                        <Button
                            onClick={handleFindPath}
                            color="dark"
                            fw="600"
                            bg="green"
                            fz={{ base: 'xs', sm: 'sm', md: 'sm' }}

                            style={{
                                borderRadius: '50px',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            I've Arrived
                        </Button>
                    </Flex>
                </Collapse>

                {collapsed && (
                    <Button.Group>
                        <Button
                            px="md"
                            variant="subtle"
                            fullWidth
                            size="lg"
                            onClick={() => setCollapsed(false)}
                            style={{
                                borderRadius: 0,
                                height: '3rem',
                                fontWeight: 600,
                                fontSize: '1rem',
                                backgroundColor: theme.colors.gray[1],
                                borderTop: `1px solid ${theme.colors.gray[3]}`,
                            }}
                        >
                            Expand Directions Menu
                        </Button>

                    </Button.Group>

                )}

            </Box>
            <Space h ="md"/>
        </Box>

    );
};

export default SelectBox;
