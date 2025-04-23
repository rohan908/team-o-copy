import { DraggableMap } from './DraggableMap.tsx';
import { Flex, Box } from '@mantine/core';
import { DisplayDirectionsBox } from './DisplayDirectionsBox.tsx';

export function IndoorMapsPage() {
    return (
        <Flex direction="row">
            <DisplayDirectionsBox />
            <Box>
                <DraggableMap />
            </Box>
        </Flex>
    );
}
export default IndoorMapsPage;
