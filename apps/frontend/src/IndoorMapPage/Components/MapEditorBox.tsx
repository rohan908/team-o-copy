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
  Modal, Transition,
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

    const [selectedNodeType, setSelectedNodeType] = useState<string>(mapProps.currentNode?.nodeType || "");

    const SaveAllNodes = async () => {
        await axios.post('api/directory/import/direct', { data: allNodes });
        setSaveLabel(true);
        setTimeout(() => setSaveLabel(false), 1500);
    };

    useEffect(() => {
        if (mapProps.currentNode) {
            setNodeInfoOpen(true);
        } else {
            setNodeInfoOpen(false);
        }
    }, [mapProps.currentNode]);

    return (
        <Box pos="fixed" top="60%" left={20} style={{ transform: 'translateY(-50%)', zIndex: 999 }}>
            <Stack spacing="sm">
                <Tooltip label="Move Tool" position="right">
                    <ActionIcon
                        size="xl"
                        variant="filled"
                        color={mapProps.selectedTool == 'pan' ? "#003EB1" : "#285CC6" }
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

                <Tooltip label="Add Node" position="right">
                    <ActionIcon
                        size="xl"
                        variant="filled"
                        color={mapProps.selectedTool == 'add-node' ? "#003EB1" : "#285CC6" }
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

                <Tooltip label="Add or Remove Edge" position="right">
                    <ActionIcon
                        size="xl"
                        variant="filled"
                        color={mapProps.selectedTool == 'add-edge' ? "#003EB1" : "#285CC6" }
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

                <Tooltip label="Save Changes" position="right" withArrow>
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

                <Flex direction="row" gap={"lg"}>
                  <Tooltip label="Help" position="right">
                    <ActionIcon
                      size="xl"
                      variant="filled"
                      color={mapProps.selectedTool == 'help' ? "#003EB1" : "#285CC6" }
                      style={{
                        border: '2px solid #1C43A7',
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                      }}
                      onClick={() => mapProps.setSelectedTool('help')}
                    >
                      <IconQuestionMark size={32} />
                    </ActionIcon>
                  </Tooltip>
                  <Transition
                    mounted={mapProps.selectedTool === 'help'}
                    transition="slide-right"
                    duration={400}
                    timingFunction="linear"
                  >
                    {(styles) => (
                      <div style={styles}>
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
                          <Text>
                            Help Data
                          </Text>
                        </Box>
                      </div>)}
                  </Transition>
                </Flex>

                <Collapse
                    in={nodeInfoOpen}
                    transitionDuration={250}
                    transitionTimingFunction="linear"
                >
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
                            <Flex  direction="row" p="xs" gap="xs">
                            <NativeSelect
                                size="sm"
                                w={160}
                                value={mapProps.currentNode?.nodeType || ''}
                                onChange={(event) => mapProps.setCurrentNodeData({
                                  id: mapProps.currentNode.id,
                                  x: mapProps.currentNode.x,
                                  y: mapProps.currentNode.y,
                                  floor: mapProps.currentNode.floor,
                                  mapId: mapProps.currentNode.mapId,
                                  name: mapProps.currentNode.name,
                                  description: mapProps.currentNode.description,
                                  nodeType: event.currentTarget.value,
                                  connectingNodes: mapProps.currentNode.connectingNodes,
                                })}
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
                              <Modal opened={openedEditMenu} onClose={close} title={"Edit Node"} size={"auto"} centered
                                     overlayProps={{
                                backgroundOpacity: 0.55,
                                blur: 3,
                              }}>
                                <TextInput
                                    label={"Node Name"}
                                    size="sm"
                                    radius="xl"
                                    value={`${mapProps.currentNode?.name || ""}`}
                                    variant="filled"
                                    onChange={(event) => mapProps.setCurrentNodeData({
                                        id: mapProps.currentNode.id,
                                        x: mapProps.currentNode.x,
                                        y: mapProps.currentNode.y,
                                        floor: mapProps.currentNode.floor,
                                        mapId: mapProps.currentNode.mapId,
                                        name: event.currentTarget.value,
                                        description: mapProps.currentNode.description,
                                        nodeType: mapProps.currentNode.nodeType,
                                        connectingNodes: mapProps.currentNode.connectingNodes,
                                    })}
                                ></TextInput>
                                  <TextInput
                                      label={"Node Description"}
                                      size="sm"
                                      radius="xl"
                                      value={`${mapProps.currentNode?.description || ""}`}
                                      variant="filled"
                                      onChange={(event) => mapProps.setCurrentNodeData({
                                          id: mapProps.currentNode.id,
                                          x: mapProps.currentNode.x,
                                          y: mapProps.currentNode.y,
                                          floor: mapProps.currentNode.floor,
                                          mapId: mapProps.currentNode.mapId,
                                          name: mapProps.currentNode.name,
                                          description: event.currentTarget.value,
                                          nodeType: mapProps.currentNode.nodeType,
                                          connectingNodes: mapProps.currentNode.connectingNodes,
                                      })}
                                  ></TextInput>
                              </Modal>
                              <ActionIcon
                                size="xxxl"
                                variant="filled"
                                color="#285CC6"
                                onClick={open}>
                                Edit Node
                              </ActionIcon>
                          </Flex>
                        </Flex>
                    </Box>
                </Collapse>
            </Stack>
        </Box>
    );
};

export default MapEditorBox;
