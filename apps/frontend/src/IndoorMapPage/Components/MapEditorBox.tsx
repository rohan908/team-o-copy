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
    Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconDeviceFloppy,
    IconCirclePlus,
    IconVectorBezier2,
    IconHandMove,
    IconQuestionMark,
} from '@tabler/icons-react';
import { MapContext } from '../MapEditor.tsx';
import { useAllNodesContext } from '../../contexts/DirectoryContext.tsx';
import axios from 'axios';
import NodeInfoBox from './NodeInfoBox.tsx';
const MapEditorBox = () => {
    const mapProps = useContext(MapContext);
    const allNodes = useAllNodesContext();
    const [saveLabel, setSaveLabel] = useState(false);
    const [openedHelp, setOpenedHelp] = useState(false);

    const [selectedNodeType, setSelectedNodeType] = useState<string>(
        mapProps.currentNode?.nodeType || ''
    );

    const SaveAllNodes = async () => {
        await axios.post('api/directory/import/direct', { data: allNodes });
        setSaveLabel(true);
        setTimeout(() => setSaveLabel(false), 1500);
    };

    function toggleHelp() {
        setOpenedHelp(!openedHelp);
    }

    function roundCoordsToTwoPlaces(input: number) {
        if (!input) return 0;
        let roundedNumber = input;
        roundedNumber = roundedNumber * 100;
        roundedNumber = Math.round(roundedNumber);
        roundedNumber = roundedNumber / 100;
        return roundedNumber;
    }

    return (
        <Box pos="fixed" top="60%" left={20} style={{ transform: 'translateY(-50%)', zIndex: 999 }}>
            <Stack>
                <Flex direction="row" gap={'lg'} align={'center'}>
                    <Stack spacing="sm">
                        <Tooltip label="Move Tool" position="right" disabled={openedHelp}>
                            <ActionIcon
                                size="xl"
                                variant="filled"
                                color={'secondaryBlues.8'}
                                style={{
                                    border: '2px solid #1C43A7',
                                    width: 60,
                                    height: 60,
                                    borderRadius: 50,
                                }}
                                onClick={() => mapProps.setSelectedTool('pan')}
                            >
                                <IconHandMove size={32} color={
                                    mapProps.selectedTool == 'pan'
                                        ? '#f8d56b'
                                        : 'white'}/>
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Add Node" position="right" disabled={openedHelp}>
                            <ActionIcon
                                size="xl"
                                variant="filled"
                                color={'secondaryBlues.8'}
                                style={{
                                    border: '2px solid #1C43A7',
                                    width: 60,
                                    height: 60,
                                    borderRadius: 50,
                                }}
                                onClick={() => mapProps.setSelectedTool('add-node')}
                            >
                                <IconCirclePlus size={32} color={
                                    mapProps.selectedTool == 'add-node'
                                        ? '#f8d56b'
                                        : 'white'}/>
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Add or Remove Edge" position="right" disabled={openedHelp}>
                            <ActionIcon
                                size="xl"
                                variant="filled"
                                color={'secondaryBlues.8'}
                                style={{
                                    border: '2px solid #1C43A7',
                                    width: 60,
                                    height: 60,
                                    borderRadius: 50,
                                }}
                                onClick={() => mapProps.setSelectedTool('add-edge')}
                            >
                                <IconVectorBezier2 size={32} color={
                                    mapProps.selectedTool == 'add-edge'
                                        ? '#f8d56b'
                                        : 'white'}/>
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip
                            label="Save Changes"
                            position="right"
                            disabled={openedHelp}
                            withArrow
                        >
                            <ActionIcon
                                size="xl"
                                variant="filled"
                                color={saveLabel ? 'green' : 'secondaryBlues.8'}
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
                                color={'secondaryBlues.8'}
                                style={{
                                    border: '2px solid #1C43A7',
                                    width: 60,
                                    height: 60,
                                    borderRadius: 50,
                                }}
                                onClick={() => toggleHelp()}
                            >
                                <IconQuestionMark size={32} color={
                                    openedHelp
                                        ? '#f8d56b'
                                        : 'white'}/>
                            </ActionIcon>
                        </Tooltip>
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
                                    maw="400px"
                                    bg="primaryBlues.0"
                                    style={{
                                        borderRadius: 20,
                                    }}
                                >
                                    <Title c={'secondaryBlues.7'} fz={'md'} fw={'bold'} mb={'xs'}>
                                        Map Editor Controls:
                                    </Title>
                                    <Divider
                                        w={'100%'}
                                        mt={'xs'}
                                        mb={'xs'}
                                        color={'yellowAccent.4'}
                                        size={'xs'}
                                    />
                                    <Text c={'secondaryBlues.7'} fz={'sm'} fw={'bold'}>
                                        Move Tool:
                                    </Text>
                                    <Text c={'secondaryBlues.7'} fz={'sm'} fw={'normal'} mb={'xs'}>
                                        To move a node, click on the node you wish to move and drag
                                        it. To select multiple, use ctrl + click. To delete, use ctrl + right-click.
                                    </Text>
                                    <Divider
                                        w={'100%'}
                                        mt={'xs'}
                                        mb={'xs'}
                                        color={'yellowAccent.4'}
                                        size={'xs'}
                                    />
                                    <Text c={'secondaryBlues.7'} fz={'sm'} fw={'bold'}>
                                        Add Node:
                                    </Text>
                                    <Text c={'secondaryBlues.7'} fz={'sm'} fw={'normal'} mb={'xs'}>
                                        Click where you would like to place a new node.
                                    </Text>
                                    <Divider
                                        w={'100%'}
                                        mt={'xs'}
                                        mb={'xs'}
                                        color={'yellowAccent.4'}
                                        size={'xs'}
                                    />
                                    <Text c={'secondaryBlues.7'} fz={'sm'} fw={'bold'}>
                                        Add or Remove Edges: <br />
                                    </Text>
                                    <Text c={'secondaryBlues.7'} fz={'sm'} fw={'normal'}>
                                        Click on the starting node and the ending node to add or
                                        remove an edge between them.
                                    </Text>
                                    <Divider
                                        w={'100%'}
                                        mt={'xs'}
                                        mb={'xs'}
                                        color={'yellowAccent.4'}
                                        size={'xs'}
                                    />
                                    <Text c={'secondaryBlues.7'} fz={'sm'} fw={'bold'}>
                                        Edges Between Floors: <br />
                                    </Text>
                                    <Text c={'secondaryBlues.7'} fz={'sm'} fw={'normal'}>
                                        Click a staircase, change floors and click
                                        another staircase to create a between-floor edge.
                                        The visual indicates floor connections.
                                    </Text>
                                </Stack>
                            </div>
                        )}
                    </Transition>
                </Flex>
            </Stack>
        </Box>
    );
};

export default MapEditorBox;
