/**
 Author: Liam O'Driscoll
 Use: Displays Directions from GetTextDirections
 NOTES: CTRL+F !!! for changes that may need to be made
 I use ({Date}) in comments to manually track myself
 */
import { Accordion, Box, Title, Text } from '@mantine/core';
import { GetTextDirections } from './GetTextDirections.tsx';
import { useMemo } from 'react';
import { usePathContext, useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import { useAllNodesContext } from '../contexts/DirectoryContext.tsx';
import { NodeDataType } from './MapClasses/MapTypes.ts';

/**
 *
 * @param nodeIds : list of numbers representing the nodeIds that are in the calculated path
 * @param allNodes : list of all NodeDataType's
 *
 */
function getPathNodes(nodeIds: number[], allNodes: NodeDataType[]): NodeDataType[] {
    const pathNodes: NodeDataType[] = [];

    for (const id of nodeIds) {
        const node = allNodes.find((node) => node.id === id);
        if (node) {
            pathNodes.push(node);
        }
    }

    return pathNodes;
}

export function DisplayDirectionsBox() {
    const pathNodes = usePathContext();
    const nodeIds = pathNodes.state.pathSelectRequest?.NodeIds;

    const allNodes = useAllNodesContext();

    // only call GetTextDirections if/when pathNodes change
    const directions = useMemo(() => {
        if (nodeIds && nodeIds.length > 1) {
            const fullPathNodes = getPathNodes(nodeIds, allNodes);
            return GetTextDirections(fullPathNodes);
        }
        return [];
    }, [nodeIds, allNodes]);
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
                    <Accordion.Item key={floor} value={`floor-${floor}`}>
                        <Accordion.Control>Floor {floor}</Accordion.Control>
                        <Accordion.Panel>
                            {direction.map((step, idx) => (
                                <Text key={idx}>
                                    {step.Direction === 'Straight'
                                        ? `Continue straight for ${step.Distance.toFixed(1)} units.`
                                        : `Then turn ${step.Direction.toLowerCase()}.`}
                                </Text>
                            ))}
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Box>
    );
}
