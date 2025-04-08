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


    const hospitalCoords = new L.LatLng(42.09593582153, -71.26322174072266);

    const handleFindPath = () => {
        if (hospital) {
            onSelectHospital(hospitalCoords);
        }
        if (department && onSelectDepartment) {
            onSelectDepartment(department);
        }
    };

    return (
        <Flex
            justify="flex-start"
            align="center"
            style={{ position: 'relative' }}
        >
            {/* Background box similar to your login box */}
            <Box
                bg="white"
                p={{ base: 'xl', sm: '2rem', md: '3rem' }}
                maw={{ base: '90%', sm: '70%', md: '450px' }}
                style={{
                    opacity: 0.85,
                    borderRadius: theme.radius.lg,
                    backdropFilter: 'blur(5px)',
                }}
            >
                <Title
                    order={1}
                    mb={{ base: 'md', sm: 'lg', md: 'xl' }}
                    c="black"
                    ta="left"
                    fw={700}
                    fz={{ sm: 'xl', md: 'xxxl' }}
                >
                    Find your Way!
                </Title>


                <Flex gap="md" wrap="wrap" mb={{ base: 'xs' }}>
                    <Text mb="0" ta="left" fz={{ base: 'xs' }}>
                        Use our interactive map to find departments, parking, and efficient routes
                    </Text>
                </Flex>

                <Divider variant="dotted" size="lg" mb="lg" />

                <Text ta="left" mb="sm">
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

                <Text ta="left" mb="sm">
                    Select Department (Optional):
                </Text>
                <Select
                    placeholder="Department"
                    data={[
                        { value: 'cardiology', label: 'Cardiology' },
                        { value: 'neurology', label: 'Neurology' },
                        // Add or remove as needed
                    ]}
                    value={department}
                    onChange={setDepartment}
                    mb="md"


                />
                <Button onClick={handleFindPath}>Find Path</Button>

            </Box>
        </Flex>
    );
};

export default SelectBox;