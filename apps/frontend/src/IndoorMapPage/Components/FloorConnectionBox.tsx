import { useContext, useState, useEffect, useRef } from 'react';
import {
    useMantineTheme,
    Box,
    Flex,
    TextInput,
    Menu,
    Collapse,
    NativeSelect,
    Modal,
    ActionIcon,
    Input,
    Stack,
    Timeline,
    Text,
    Button,
    MantineProvider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { MapContext, MapEditorProps } from '../MapEditor.tsx';
import { IconArrowBadgeRight, IconArrowBadgeDown } from '@tabler/icons-react';
import { BlackButton } from '../../common-compoents/commonButtons.tsx';
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
                pos="fixed"
                top={'10%'}
                left={20}
                style={{
                    width: 'fit-content',
                    minWidth: '300px',
                    backgroundColor: '#285CC6',
                    border: '2px solid #1C43A7',
                    borderRadius: 24,
                    zIndex: 999,
                }}
            >
                <Timeline
                    styles={{
                        itemTitle: {
                            color: 'white',
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
                pos="fixed"
                top={'10%'}
                left={20}
                style={{
                    width: 'fit-content',
                    minWidth: '300px',
                    backgroundColor: '#285CC6',
                    border: '2px solid #1C43A7',
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
