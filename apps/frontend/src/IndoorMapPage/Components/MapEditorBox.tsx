import React, { useContext, useEffect, useState } from 'react';
import {
    ActionIcon,
    Tooltip,
    Box,
    Stack,
    Container,
    Flex,
    Input,
    TextInput,
    NativeSelect,
    Collapse,
    Text,
    Modal,
    Transition,
    Title,
    Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDeviceFloppy,
  IconCirclePlus,
  IconVectorBezier2,
  IconHandMove, IconQuestionMark,
} from '@tabler/icons-react';
import { MapContext } from '../MapEditor.tsx';
import { useAllNodesContext } from '../../contexts/DirectoryContext.tsx';
import axios from 'axios';
const MapEditorBox = () => {
    const mapProps = useContext(MapContext);
    const allNodes = useAllNodesContext();
    const [saveLabel, setSaveLabel] = useState(false);
    const [nodeInfoOpen, setNodeInfoOpen] = useState(false);
    const [openedEditMenu, { open, close }] = useDisclosure(false);
    const [openedHelp, setOpenedHelp] = useState(false);

    const [selectedNodeType, setSelectedNodeType] = useState<string>(mapProps.currentNode?.nodeType || "");

    const SaveAllNodes = async () => {
        await axios.post('api/directory/import/direct', { data: allNodes });
        setSaveLabel(true);
        setTimeout(() => setSaveLabel(false), 1500);
    };

    function toggleHelp(){
      setOpenedHelp(!openedHelp);
    }

    useEffect(() => {
        if (mapProps.currentNode) {
            setNodeInfoOpen(true);
        } else {
            setNodeInfoOpen(false);
        }
    }, [mapProps.currentNode]);

    return (
        <Box pos="fixed" top="60%" left={20} style={{ transform: 'translateY(-50%)', zIndex: 999 }}>
            <Flex direction="row" gap={'lg'} align={'center'}>
                <Stack spacing="sm">
                    <Tooltip label="Move Tool" position="right" disabled={openedHelp}>
                        <ActionIcon
                            size="xl"
                            variant="filled"
                            color={mapProps.selectedTool == 'pan' && !openedHelp ? '#003EB1' : '#285CC6'}
                            style={{
                                border: '2px solid #1C43A7',
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                            }}
                            onClick={() => mapProps.setSelectedTool('pan')}
                        >
                            <IconHandMove size={32} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Add Node" position="right" disabled={openedHelp}>
                        <ActionIcon
                            size="xl"
                            variant="filled"
                            color={mapProps.selectedTool == 'add-node' && !openedHelp ? '#003EB1' : '#285CC6'}
                            style={{
                                border: '2px solid #1C43A7',
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                            }}
                            onClick={() => mapProps.setSelectedTool('add-node')}
                        >
                            <IconCirclePlus size={32} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Add or Remove Edge" position="right" disabled={openedHelp}>
                        <ActionIcon
                            size="xl"
                            variant="filled"
                            color={mapProps.selectedTool == 'add-edge' && !openedHelp ? '#003EB1' : '#285CC6'}
                            style={{
                                border: '2px solid #1C43A7',
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                            }}
                            onClick={() => mapProps.setSelectedTool('add-edge')}
                        >
                            <IconVectorBezier2 size={32} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Save Changes" position="right" disabled={openedHelp} withArrow>
                        <ActionIcon
                            size="xl"
                            variant="filled"
                            color={saveLabel ? 'green' : '#285CC6'}
                            style={{
                                border: '2px solid #1C43A7',
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                            }}
                            onClick={SaveAllNodes}
                        >
                            <IconDeviceFloppy size={32} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Help" position="right" disabled={openedHelp}>
                        <ActionIcon
                            size="xl"
                            variant="filled"
                            color={openedHelp ? '#003EB1' : '#285CC6'}
                            style={{
                                border: '2px solid #1C43A7',
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                            }}
                            onClick={() => toggleHelp()}
                        >
                            <IconQuestionMark size={32} />
                        </ActionIcon>
                    </Tooltip>
                    <Collapse
                        in={nodeInfoOpen}
                        transitionDuration={250}
                        transitionTimingFunction="linear"
                    >
                        <Box
                            p="sm"
                            w="auto"
                            miw="300px"
                            bg="primaryBlues.0"
                            style={{
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
                                                connectingNodes:
                                                    mapProps.currentNode.connectingNodes,
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
                                    <Modal
                                        opened={openedEditMenu}
                                        onClose={close}
                                        title={'Edit Node'}
                                        size={'auto'}
                                        centered
                                        overlayProps={{
                                            backgroundOpacity: 0.55,
                                            blur: 3,
                                        }}
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
                                                    connectingNodes:
                                                        mapProps.currentNode.connectingNodes,
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
                                                    connectingNodes:
                                                        mapProps.currentNode.connectingNodes,
                                                })
                                            }
                                        ></TextInput>
                                    </Modal>
                                    <ActionIcon
                                        size="xxxl"
                                        variant="filled"
                                        color="#285CC6"
                                        onClick={open}
                                    >
                                        Edit Node
                                    </ActionIcon>
                                </Flex>
                            </Flex>
                        </Box>
                    </Collapse>
                </Stack>
                <Transition
                    mounted={openedHelp}
                    transition="slide-right"
                    duration={400}
                    timingFunction="linear"
                >
                    {(styles) => (
                        <div style={styles}>
                            <Stack
                                gap="0px"
                                p="sm"
                                w="auto"
                                miw="200px"
                                maw="250px"
                                bg="primaryBlues.0"
                                style={{
                                    borderRadius: 20,
                                }}
                            >
                                <Title c={'secondaryBlues.7'} fz={'md'} fw={'bold'} mb={"xs"}>
                                    Map Editor Controls:
                                </Title>
                                <Divider w={"100%"} mt={"xs"} mb={"xs"} color={"yellowAccent.4"} size={"xs"}/>
                                <Text c={'secondaryBlues.7'} fz={'sm'} fw={'bold'}>
                                    Move Tool:
                                </Text>
                                <Text c={'secondaryBlues.7'} fz={'sm'} fw={'normal'} mb={"xs"}>
                                    To move a node, click on the node you wish to move and drag it.
                                </Text>
                                <Divider w={"100%"} mt={"xs"} mb={"xs"} color={"yellowAccent.4"} size={"xs"}/>
                                <Text c={'secondaryBlues.7'} fz={'sm'} fw={'bold'}>
                                    Add Node:
                                </Text>
                                <Text c={'secondaryBlues.7'} fz={'sm'} fw={'normal'} mb={"xs"}>
                                    Click where you would like to place a new node.
                                </Text>
                                <Divider w={"100%"} mt={"xs"} mb={"xs"} color={"yellowAccent.4"} size={"xs"}/>
                                <Text c={'secondaryBlues.7'} fz={'sm'} fw={'bold'}>
                                    Add or Remove Edges: <br/>
                                </Text>
                                <Text c={'secondaryBlues.7'} fz={'sm'} fw={'normal'}>
                                    Click on the starting node and the ending node to add or remove
                                    an edge between them.
                                </Text>
                            </Stack>
                        </div>
                    )}
                </Transition>
            </Flex>
        </Box>
    );
};

export default MapEditorBox;
