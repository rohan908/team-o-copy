import { useContext, useState, useEffect, useRef } from 'react';
import {
    useMantineTheme,
    Box,
    Timeline,
    Text,
} from '@mantine/core';
import { MapContext} from '../MapEditor.tsx';
import { DirectoryNodeItem } from '../../contexts/DirectoryItem.ts';
import { useAllNodesContext } from '../../contexts/DirectoryContext.tsx';

const FloorConnectionBox = () => {
    const allNodes = useAllNodesContext();
    const mapProps = useContext(MapContext);
    const theme = useMantineTheme();

    const allStairs = useRef<DirectoryNodeItem[]>([]);

    const [currentFloor, setCurrentFloor] = useState(0);

    const [floor1, setFloor1] = useState('');
    const [floor3, setFloor3] = useState('');
    const [floor4, setFloor4] = useState('');

    const getAllStairs = () => {
        allNodes.forEach((node) => {
            if (node.nodeType == 'staircase' && !allStairs.current.includes(node)) {
                allStairs.current.push(node);
            }
        });
    };

    useEffect(() => {
        getAllStairs();
    }, [allNodes]);

    useEffect(() => {
        floorEntryData();
        getAllStairs();
    }, [mapProps.currentNode]);

    const floorEntryData = () => {
        // for floor 1 description
        if (mapProps.currentNode?.floor == 1) {
            setFloor1('Current Floor: ' + mapProps.currentNode.name);
        } else {
            setFloor1('No Connections');
            allStairs.current.forEach((node) => {
                if (mapProps.currentNode?.connectingNodes.includes(node.id) && node.floor == 1) {
                    setFloor1(node.name);
                }
            });
        }

        // for floor 2 description
        if (mapProps.currentNode?.floor == 2) {
            setFloor3('Current Floor: ' + mapProps.currentNode.name);
        } else {
            setFloor3('No Connections');
            allStairs.current.forEach((node) => {
                if (mapProps.currentNode?.connectingNodes.includes(node.id) && node.floor == 2) {
                    setFloor3(node.name);
                }
            });
        }

        // for floor 3 description
        if (mapProps.currentNode?.floor == 3) {
            setFloor4('Current Floor: ' + mapProps.currentNode.name);
        } else {
            setFloor4('No Connections');
            allStairs.current.forEach((node) => {
                if (mapProps.currentNode?.connectingNodes.includes(node.id) && node.floor == 3) {
                    setFloor4(node.name);
                }
            });
        }
    };

    if (mapProps.currentNode?.mapId == 1) {
        return (
            <Box
                p="sm"
                miw='300px'
                bg='#ebf2ff'
                style={{
                    width: 'fit-content',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.7)',
                    borderRadius: 24,
                    zIndex: 999,
                }}
            >
                <Timeline
                    active={3}
                    styles={{
                        itemTitle: {
                            color: '#3568d4',
                        },
                        itemBody: {
                          color: '#3568d4',
                        },
                    }}
                >
                    <Timeline.Item title="Floor 4">
                        <Text size={'xxs'}>{floor4}</Text>
                    </Timeline.Item>

                    <Timeline.Item title="Floor 3">
                        <Text size={'xxs'}>{floor3}</Text>
                    </Timeline.Item>

                    <Timeline.Item title="Floor 1">
                        <Text size={'xxs'}>{floor1}</Text>
                    </Timeline.Item>
                </Timeline>
            </Box>
        );
    } else {
        return (
            <Box
                p="sm"
                miw='300px'
                bg='#ebf2ff'
                style={{
                    width: 'fit-content',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.7)',
                    borderRadius: 24,
                    zIndex: 999,
                }}
            >
                <Text>No Additional Floors</Text>
            </Box>
        );
    }
};

export default FloorConnectionBox;
