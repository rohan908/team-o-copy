import { DraggableMap } from './DraggableMap.tsx';
import { Flex, Box, Stack } from '@mantine/core';
import { DisplayDirectionsBox } from './DisplayDirectionsBox.tsx';
import { ParkingSelector } from '../HomePage/ParkingSelector.tsx';
import { DepartmentSelector } from '../HomePage/DepartmentSelector.tsx';
import { AlgorithmSelector } from '../HomePage/AlgorithmSelector.tsx';

export function IndoorMapsPage() {
    return (
        <Flex direction="row" h="100vh" w="100vw">
            <Box w={320}>
                {/* Sidebar Panel */}
                <Stack w={320}>
                    <ParkingSelector />
                    <DepartmentSelector />
                    <AlgorithmSelector />
                    <DisplayDirectionsBox />
                </Stack>
            </Box>
            {/* Map */}
            <Box style={{ flexGrow: 1, minWidth: 0, position: 'relative' }}>
                <DraggableMap />
            </Box>
        </Flex>
    );
}
