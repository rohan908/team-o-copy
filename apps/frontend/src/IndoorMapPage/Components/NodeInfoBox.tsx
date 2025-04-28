import { useContext, useState, useEffect } from 'react';
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
    Text,
    Button,
    MantineProvider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { MapContext, MapEditorProps } from '../MapEditor.tsx';
import { IconArrowBadgeRight, IconArrowBadgeDown, IconArrowBadgeLeft } from '@tabler/icons-react';
import { BlackButton } from '../../common-compoents/commonButtons.tsx';
import FloorEditorBox from './FloorEditorBox.tsx';

const NodeInfoBox = () => {
    const mapProps = useContext(MapContext);
    const theme = useMantineTheme();

    const [nodeInfoOpen, setNodeInfoOpen] = useState(false);
    const [expandInfo, setExpandInfo] = useState(false);
    const [floorInfo, setFloorInfo] = useState(false);
    const [isFloorEdge, setIsFloorEdge] = useState(false);

    const toggleMoreInfo = () => {
        if (expandInfo) {
            setExpandInfo(false);
            setFloorInfo(false);
        } else {
            setExpandInfo(true);
        }
    };

    const checkNodeType = () => {
        if (
            mapProps.currentNode?.nodeType == 'staircase' ||
            mapProps.currentNode?.nodeType == 'elevator'
        ) {
            setIsFloorEdge(true);
        } else {
            setIsFloorEdge(false);
        }
    };

    const toggleFloorMenu = () => {
        if (floorInfo) {
            setFloorInfo(false);
        } else {
            setFloorInfo(true);
        }
    };

    useEffect(() => {
        checkNodeType();
        if (mapProps.currentNode) {
            setNodeInfoOpen(true);
        } else {
            setNodeInfoOpen(false);
        }
    }, [mapProps.currentNode]);

    return (
        <Flex direction={'row-reverse'}>
            <Collapse in={nodeInfoOpen} transitionDuration={250} transitionTimingFunction="linear">
                <Box
                    p="sm"
                    style={{
                        width: 'auto',
                        minWidth: '300px',
                        backgroundColor: '#285CC6',
                        border: '2px solid #1C43A7',
                        borderRadius: 24,
                    }}
                >
                    <Flex direction="row" p="xs" gap="xs">
                        <Flex direction="column" align={'flex-start'}>
                            <NativeSelect
                                label={'Node Type'}
                                styles={{
                                    label: {
                                        fontWeight: 600,
                                        textSize: '14px',
                                        textAlign: 'center',
                                        color: 'white',
                                    },
                                }}
                                size="sm"
                                w={160}
                                value={mapProps.currentNode?.nodeType || ''}
                                onChange={(event) =>
                                    mapProps.setCurrentNodeData({
                                        id: mapProps.currentNode.id,
                                        x: mapProps.currentNode.x,
                                        y: mapProps.currentNode.y,
                                        floor: mapProps.currentNode.floor,
                                        mapId: mapProps.currentNode.mapId,
                                        name: mapProps.currentNode.name,
                                        description: mapProps.currentNode.description,
                                        nodeType: event.currentTarget.value,
                                        connectingNodes: mapProps.currentNode.connectingNodes,
                                    })
                                }
                                data={[
                                    '',
                                    'department',
                                    'parking-lot',
                                    'hallway',
                                    'staircase',
                                    'elevator',
                                ]}
                                variant="filled"
                            />
                            <Button
                                variant="filled"
                                color="baseBlue.6"
                                onClick={() => toggleMoreInfo()}
                                size="md"
                                radius="xl"
                                className="navButton"
                                leftSection={
                                    expandInfo ? <IconArrowBadgeLeft /> : <IconArrowBadgeDown />
                                }
                            >
                                More Data
                            </Button>
                        </Flex>
                        <Flex direction="column" align={'flex-start'}>
                            <TextInput
                                label={'Node Name'}
                                styles={{
                                    label: {
                                        fontWeight: 600,
                                        textSize: '14px',
                                        textAlign: 'center',
                                        color: 'white',
                                    },
                                }}
                                size="sm"
                                radius="xl"
                                value={`${mapProps.currentNode?.name || ''}`}
                                variant="filled"
                                onChange={(event) =>
                                    mapProps.setCurrentNodeData({
                                        id: mapProps.currentNode.id,
                                        x: mapProps.currentNode.x,
                                        y: mapProps.currentNode.y,
                                        floor: mapProps.currentNode.floor,
                                        mapId: mapProps.currentNode.mapId,
                                        name: event.currentTarget.value,
                                        description: mapProps.currentNode.description,
                                        nodeType: mapProps.currentNode.nodeType,
                                        connectingNodes: mapProps.currentNode.connectingNodes,
                                    })
                                }
                            ></TextInput>
                            <TextInput
                                label={'Node Description'}
                                styles={{
                                    label: {
                                        fontWeight: 600,
                                        textSize: '14px',
                                        textAlign: 'center',
                                        color: 'white',
                                    },
                                }}
                                size="sm"
                                radius="xl"
                                value={`${mapProps.currentNode?.description || ''}`}
                                variant="filled"
                                onChange={(event) =>
                                    mapProps.setCurrentNodeData({
                                        id: mapProps.currentNode.id,
                                        x: mapProps.currentNode.x,
                                        y: mapProps.currentNode.y,
                                        floor: mapProps.currentNode.floor,
                                        mapId: mapProps.currentNode.mapId,
                                        name: mapProps.currentNode.name,
                                        description: event.currentTarget.value,
                                        nodeType: mapProps.currentNode.nodeType,
                                        connectingNodes: mapProps.currentNode.connectingNodes,
                                    })
                                }
                            ></TextInput>
                        </Flex>
                    </Flex>
                </Box>
            </Collapse>
            <Collapse in={expandInfo} transitionDuration={250} transitionTimingFunction="linear">
                <Box
                    p="sm"
                    style={{
                        width: 'auto',
                        minWidth: '300px',
                        backgroundColor: '#285CC6',
                        border: '2px solid #1C43A7',
                        borderRadius: 24,
                    }}
                >
                    <Text color={'white'}>View-Only Properties</Text>
                    <Flex direction="row" p="xs" gap="xs">
                        <TextInput
                            variant="filled"
                            readOnly
                            value={`ID: ${mapProps.currentNode?.id || 0}`}
                            size="sm"
                            radius="xl"
                            w={80}
                            styles={{
                                input: {
                                    color: 'black',
                                    fontWeight: 400,
                                },
                            }}
                        />
                        <Input
                            size="sm"
                            radius="xl"
                            w={80}
                            value={`X: ${Math.round(mapProps.currentNode?.x * 10) / 10 || 0}`}
                            readOnly
                            variant="filled"
                        ></Input>
                        <Input
                            size="sm"
                            radius="xl"
                            w={80}
                            value={`Y: ${Math.round(mapProps.currentNode?.x * 10) / 10 || 0}`}
                            readOnly
                            variant="filled"
                        ></Input>
                    </Flex>
                    <TextInput
                        label={'Connecting Node IDs'}
                        readOnly
                        styles={{
                            label: {
                                fontWeight: 600,
                                textSize: '14px',
                                textAlign: 'center',
                                color: 'white',
                            },
                        }}
                        size="sm"
                        p={'xs'}
                        radius="xl"
                        value={`${mapProps.currentNode?.connectingNodes || ''}`}
                        variant="filled"
                    ></TextInput>
                    <Collapse
                        in={isFloorEdge}
                        transitionDuration={250}
                        transitionTimingFunction="linear"
                    >
                        <Button
                            variant="filled"
                            color="baseBlue.6"
                            justify="flex-end"
                            onClick={() => toggleFloorMenu()}
                            size="sm"
                            radius="xl"
                            className="navButton"
                            leftSection={
                                floorInfo ? <IconArrowBadgeLeft /> : <IconArrowBadgeRight />
                            }
                        >
                            Link Floors
                        </Button>
                    </Collapse>
                </Box>
            </Collapse>
            <Collapse in={floorInfo} transitionDuration={250} transitionTimingFunction="linear">
                <FloorEditorBox />
            </Collapse>
        </Flex>
    );
};

export default NodeInfoBox;
