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
} from '@mantine/core';
import {
    IconDeviceFloppy,
    IconCirclePlus,
    IconVectorBezier2,
    IconHandMove,
} from '@tabler/icons-react';
import { MapContext } from '../MapEditor.tsx';
import { useAllNodesContext } from '../../contexts/DirectoryContext.tsx';
import axios from 'axios';
const MapEditorBox = ({ nodeData }) => {
    const mapProps = useContext(MapContext);
    const allNodes = useAllNodesContext();
    const [saveLabel, setSaveLabel] = useState(false);
    const [nodeInfoOpen, setNodeInfoOpen] = useState(false);

    const SaveAllNodes = async () => {
        await axios.post('api/directory/import/direct', { data: allNodes });
        setSaveLabel(true);
        setTimeout(() => setSaveLabel(false), 1500);
    };
    console.log(nodeData);
    useEffect(() => {
        if (nodeData) {
            setNodeInfoOpen(true);
        } else {
            setNodeInfoOpen(false);
        }
    }, [nodeData]);

    return (
        <Box pos="fixed" top="60%" left={20} style={{ transform: 'translateY(-50%)', zIndex: 999 }}>
            <Stack spacing="sm">
                <Tooltip label="Move Tool" position="right">
                    <ActionIcon
                        size="xl"
                        variant="filled"
                        color="#285CC6"
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
                        color="#285CC6"
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
                        color="#285CC6"
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
                                    value={`ID: ${nodeData?.id || 0}`}
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
                                    placeholder={`X: ${nodeData?.x || 0}`}
                                    variant="filled"
                                ></Input>
                                <Input
                                    size="sm"
                                    radius="xl"
                                    w={80}
                                    placeholder={`Y: ${nodeData?.y || 0}`}
                                    variant="filled"
                                ></Input>
                            </Flex>
                            <NativeSelect
                                size="sm"
                                value={nodeData?.type || 'Hallway'}
                                data={[
                                    'department',
                                    'parking-lot',
                                    'hallway',
                                    'staircase',
                                    'elevator',
                                ]}
                                variant="filled"
                            />
                        </Flex>
                    </Box>
                </Collapse>
            </Stack>
        </Box>
    );
};

export default MapEditorBox;
