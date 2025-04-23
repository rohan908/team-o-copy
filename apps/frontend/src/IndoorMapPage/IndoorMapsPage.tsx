import { DraggableMap } from './DraggableMap.tsx';
import { Flex, Box, Stack, Title } from '@mantine/core';
import { DisplayDirectionsBox } from './DisplayDirectionsBox.tsx';
import { ParkingSelector } from '../HomePage/ParkingSelector.tsx';
import { DepartmentSelector } from '../HomePage/DepartmentSelector.tsx';
import { AlgorithmSelector } from '../HomePage/AlgorithmSelector.tsx';

export function IndoorMapsPage() {
    return (
        <Flex direction="row" h="100vh" w="100vw">
            <Box w={320} mt={60}>
                {/* Sidebar Panel */}
                <Title order={1} fz={'xl'} pt={'5px'} mb={'sm'} ta={'center'} c={'#0E3B99'}>
                    Navigate to Hospital
                </Title>
                <Stack w={320}>
                    <Box w="100%">
                        <ParkingSelector />
                    </Box>
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
