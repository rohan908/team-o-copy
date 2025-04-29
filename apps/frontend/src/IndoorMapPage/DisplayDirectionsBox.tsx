/**
 Author: Liam O'Driscoll
 Use: Displays Directions from GetTextDirections
 NOTES: CTRL+F !!! for changes that may need to be made
 I use ({Date}) in comments to manually track myself
 */
import {Accordion, Box, Text, Group, Divider, Flex} from '@mantine/core';
import { GetTextDirections } from './GetTextDirections.tsx';
import { useMemo } from 'react';
import { usePathContext } from '../contexts/NavigationContext.tsx';
import { useAllNodesContext } from '../contexts/DirectoryContext.tsx';
import { NodeDataType } from './MapClasses/MapTypes.ts';
import {
    IconArrowLeft,
    IconArrowRight,
    IconArrowNarrowUp,
    IconStairs,
    IconArrowUp,
} from '@tabler/icons-react';
import TTSButton from '../Buttons/TTSButton.tsx';

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
        <Box w="90%" h="335px" style={{
          overflowY: 'auto',
          boxShadow: nodeIds && nodeIds.length > 1 ? "0px 0px 4px 0px #AAAAAA" : "0px 0px 0px 0px #ebf2ff",
          borderRadius: "8px",
        }}>
            <Accordion
                multiple
                styles={{
                    item: { marginBottom: '0px' },
                }}
                defaultValue={Object.keys(directionsByFloor).map((floor) => `floor-${floor}`)}
            >
                {Object.entries(directionsByFloor).map(([floor, direction]) => {
                    const floorTTS = direction.map((step) => {
                        if (step.Direction.startsWith('Take')) return step.Direction;
                        if (step.Direction === 'Straight')
                            return `Continue straight for ${(step.Distance * 1.5).toFixed(0)} feet.`;
                        return `Turn ${step.Direction.toLowerCase()}`;
                    });
                    return (
                        <Accordion.Item key={floor} value={`floor-${floor}`}>
                            <Accordion.Control>
                                <Group>
                                    <Text fw={700} size="md" c="blue.7">
                                        {/* Stupid ass logic to change the floor bc we didn't do it right the first time*/}
                                        {/* Changing for Faulkner and Chestnut*/}
                                        {Number(floor) === 1
                                            ? 'Floor 1'
                                            : Number(floor) === 4
                                              ? 'Chestnut'
                                              : Number(floor) === 5
                                                ? 'Faulkner'
                                                : `Floor ${Number(floor) + 1}`}
                                    </Text>
                                    <TTSButton text={floorTTS} />
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                {direction.map((step, idx) => {
                                    const icon = step.Direction.toLowerCase().includes(
                                        'elevator'
                                    ) ? (
                                        <IconStairs size={20} color="#0E3B99" />
                                    ) : step.Direction.toLowerCase().includes('stairs') ? (
                                        <IconStairs size={20} color="#0E3B99" />
                                    ) : step.Direction === 'Straight' ? (
                                        <IconArrowUp size={20} color="#0E3B99" />
                                    ) : step.Direction === 'Left' ? (
                                        <IconArrowLeft size={20} color="#0E3B99" />
                                    ) : (
                                        <IconArrowRight size={20} color="#0E3B99" />
                                    );

                                    const label = step.Direction.startsWith('Take')
                                        ? step.Direction
                                        : step.Direction === 'Straight'
                                          ? `Continue straight for ${(step.Distance * 1.5).toFixed(0)} feet.`
                                          : `Turn ${step.Direction.toLowerCase()}`;

                                    return (
                                        <Box key={idx} mb="xs">
                                            <Flex direction="row" gap="xs" align="center">
                                                {icon}
                                                <Text size="sm" fw={500} c="blue">
                                                    {label}
                                                </Text>
                                            </Flex>
                                            <Divider my="xs" />
                                        </Box>
                                    );
                                })}
                            </Accordion.Panel>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </Box>
    );
}
