/**
 Author: Liam O'Driscoll
 Use: Displays Directions from GetTextDirections
 NOTES: CTRL+F !!! for changes that may need to be made
 I use ({Date}) in comments to manually track myself
 */
import { Accordion, Box, Title, Text } from '@mantine/core';
import { usePathContext } from './PathProvider.tsx';
import { GetTextDirections } from './GetTextDirections.tsx';
import { useMemo } from 'react';

export function DisplayDirectionsBox() {
    const { pathNodes } = usePathContext();
    // only call GetTextDirections if/when pathNodes change
    const directions = useMemo(() => {
        if (pathNodes.length > 1) {
            return GetTextDirections(pathNodes);
        }
        return [];
    }, [pathNodes]);
    // group directions by floor so they can be displayed separately
    const directionsByFloor: {
        [floor: number]: { Direction: string; Distance: number; Floor: number }[];
    } = {};
    directions.forEach((direction) => {
        if (!directionsByFloor[direction.Floor]) {
            directionsByFloor[direction.Floor] = [];
        }
        directionsByFloor[direction.Floor].push(direction);
    });
    return (
        <Box>
            <Title>Directions</Title>
            <Accordion
                multiple
                defaultValue={Object.keys(directionsByFloor).map((floor) => `floor-${floor}`)}
            >
                {Object.entries(directionsByFloor).map(([floor, direction]) => (
                    <Accordion.Item key={floor} value={'floor-${floor}'}>
                        <Accordion.Control>Floor {floor}</Accordion.Control>
                        <Accordion.Panel>
                            {direction.map((step, idx) => (
                                <Text key={idx}>{step.Direction}</Text>
                            ))}
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Box>
    );
}
