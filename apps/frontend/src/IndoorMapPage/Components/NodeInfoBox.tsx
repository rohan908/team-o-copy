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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { MapContext, MapEditorProps } from '../MapEditor.tsx';
import { BlackButton } from '../../common-compoents/commonButtons.tsx';

const NodeInfoBox = () => {
    const mapProps = useContext(MapContext);
    const theme = useMantineTheme();
    const collapsed = false;

    const [nodeInfoOpen, setNodeInfoOpen] = useState(false);
    const [expandInfo, setExpandInfo] = useState(false);

    const toggleMoreInfo = () => {
        if (expandInfo) {
            setExpandInfo(false);
        } else {
            setExpandInfo(true);
        }
    };

    useEffect(() => {
        if (mapProps.currentNode) {
            setNodeInfoOpen(true);
        } else {
            setNodeInfoOpen(false);
            setExpandInfo(false);
        }
    }, [mapProps.currentNode]);

    return (
        <Collapse in={nodeInfoOpen} transitionDuration={250} transitionTimingFunction="linear">
            <Stack>
                <Box
                    //bg="#FCB024"
                    p="sm"
                    style={{
                        width: 'auto',
                        minWidth: '300px',
                        backgroundColor: '#285CC6',
                        border: '2px solid #1C43A7',
                        borderRadius: 24,
                    }}
                >
                    <Flex direction="column">
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
                                placeholder={`X: ${mapProps.currentNode?.x || 0}`}
                                variant="filled"
                            ></Input>
                            <Input
                                size="sm"
                                radius="xl"
                                w={80}
                                placeholder={`Y: ${mapProps.currentNode?.y || 0}`}
                                variant="filled"
                            ></Input>
                        </Flex>
                        <Flex direction="row" p="xs" gap="xs">
                            <NativeSelect
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
                            <ActionIcon
                                size="xxxl"
                                variant="filled"
                                color="#285CC6"
                                onClick={() => toggleMoreInfo()}
                            >
                                Edit Node
                            </ActionIcon>
                        </Flex>
                    </Flex>
                </Box>
                <Collapse
                    in={expandInfo}
                    transitionDuration={250}
                    transitionTimingFunction="linear"
                >
                    <TextInput
                        label={'Node Name'}
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
                </Collapse>
            </Stack>
        </Collapse>
    );
};

export default NodeInfoBox;
