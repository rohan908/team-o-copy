import React, { useState } from 'react';
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

    const hospitalCoords = new L.LatLng(42.09593582153, -71.26322174072266);

    const handleFindPath = () => {
        if (hospital) {
            onSelectHospital(hospitalCoords);
        }
        if (department && onSelectDepartment) {
            onSelectDepartment(department);
        }
        setCollapsed(true);
    };

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
                    <Title
                        order={2}
                        mb="md"
                        c="black"
                        ta="left"
                        fw={700}
                        fz={{ sm: 'xl', md: 'xxxl' }}
                    >
                        Find your Way!
                    </Title>

                    <Text
                        mb="sm"
                        ta="left"
                        fz="sm"
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
                        placeholder="Hospital A or B"
                        data={[
                            { value: 'hospital-a', label: 'Hospital A' },
                            { value: 'hospital-b', label: 'Hospital B' },
                        ]}
                        value={hospital}
                        onChange={setHospital}
                        mb="md"
                    />

                    <Text ta="left" mb="sm" fw={500}>
                        Select Department (Optional):
                    </Text>
                    <Select
                        placeholder="Department"
                        data={[
                            { value: 'cardiology', label: 'Cardiology' },
                            { value: 'neurology', label: 'Neurology' },
                        ]}
                        value={department}
                        onChange={setDepartment}
                        mb="md"
                    />

                    <Flex justify="flex-end">
                        <Button
                            onClick={handleFindPath}
                            color="dark"
                            fw="600"
                            bg="black"
                            style={{
                                borderRadius: '50px',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Find Path
                        </Button>
                    </Flex>
                </Collapse>

                {collapsed && (
                    <Button
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
                )}
            </Box>
        </Box>
    );
};

export default SelectBox;
