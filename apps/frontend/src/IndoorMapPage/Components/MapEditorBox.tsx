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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconDeviceFloppy,
    IconCirclePlus,
    IconVectorBezier2,
    IconHandMove,
} from '@tabler/icons-react';
import { MapContext } from '../MapEditor.tsx';
import { useAllNodesContext } from '../../contexts/DirectoryContext.tsx';
import axios from 'axios';
import NodeInfoBox from "./NodeInfoBox.tsx";
const MapEditorBox = () => {
    const mapProps = useContext(MapContext);
    const allNodes = useAllNodesContext();
    const [saveLabel, setSaveLabel] = useState(false);

    const [selectedNodeType, setSelectedNodeType] = useState<string>(mapProps.currentNode?.nodeType || "");

    const SaveAllNodes = async () => {
        await axios.post('api/directory/import/direct', { data: allNodes });
        setSaveLabel(true);
        setTimeout(() => setSaveLabel(false), 1500);
    };

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

            </Stack>
        </Box>
    );
};

export default MapEditorBox;
