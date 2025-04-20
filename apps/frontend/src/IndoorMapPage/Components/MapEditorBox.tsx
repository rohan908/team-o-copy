import React, { useState, useEffect, useContext } from 'react';
import { BasicOutlinedButton, BlackButton } from '../../common-compoents/commonButtons.tsx';
import {
    Box,
    Collapse,
    Button,
    ActionIcon,
    useMantineTheme,
    Title,
    Flex,
    TextInput,
    Grid,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconArrowBadgeRight, IconArrowBadgeDown } from '@tabler/icons-react';
import {DirectoryNodeItem} from "../../contexts/DirectoryItem.ts";
import axios from 'axios';

interface MapEditorBoxProps {
    newNodes?: DirectoryNodeItem[];
    nodeSelected?: (isSelected: boolean) => void;
    nodeX?: number;
    nodeY?: number;
    floor?: number;
    updateNodePosition?: (x: number, y: number, floor: number) => void;
}

const MapEditorBox: React.FC<MapEditorBoxProps> = ({
    newNodes = [],
    nodeSelected = false,
    nodeX = 0,
    nodeY = 0,
    floor = 0,
    updateNodePosition,
}) => {
    const theme = useMantineTheme();
    const [savedStatus, setSavedStatus] = useState("");
    const [collapsed, setCollapsed] = useState(true);
    const [hoverAddNode, setHoverAddNode] = useState(setTimeout(function () {}, 1000));
    const [hoverRemoveNode, setHoverRemoveNode] = useState(setTimeout(function () {}, 1000));
    const [hoverAddEdge, setHoverAddEdge] = useState(setTimeout(function () {}, 1000));
    const [hoverRemoveEdge, setHoverRemoveEdge] = useState(setTimeout(function () {}, 1000));
    const handleAddNode = () => null;
    const handleAddEdge = () => null;
    const handleRemoveNode = () => null;
    const handleRemoveEdge = () => null;

    const { hovered, ref } = useHover();

    const handleUpdateNodePosition = () => {
        // Get values from form
        const values = form.getValues();
        const x = parseFloat(values.xpos); // convert from string to float
        const y = parseFloat(values.ypos);
        const floorNum = parseInt(values.floor);

        // Validate values
        if (isNaN(x) || isNaN(y) || isNaN(floorNum)) {
            console.log(x, y, floorNum);
            alert('Please enter valid numbers for X, Y, and Floor');
            return;
        }

        if (updateNodePosition) {
            updateNodePosition(x, y, floorNum);
        }
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            xpos: 'Select a node',
            ypos: 'Select a node',
            floor: 'Select a node',
        },
    });

    function switchAddNodeLabel(hovering: boolean) {
        const addNode = document.getElementById('addNode');
        if (hovering && addNode != null) {
            clearInterval(hoverAddNode);
            setHoverAddNode(
                setInterval(function () {
                    switch (addNode.innerText) {
                        case '+':
                            addNode.innerText = 'A';
                            break;
                        case 'A':
                            addNode.innerText = 'Ad';
                            break;
                        case 'Ad':
                            addNode.innerText = 'Add';
                            break;
                        case 'Add':
                            addNode.innerText = 'Add N';
                            break;
                        case 'Add N':
                            addNode.innerText = 'Add No';
                            break;
                        case 'Add No':
                            addNode.innerText = 'Add Nod';
                            break;
                        case 'Add Nod':
                            addNode.innerText = 'Add Node';
                            clearInterval(hoverAddNode);
                            break;
                    }
                }, 20)
            );
        } else if (addNode != null) {
            clearInterval(hoverAddNode);
            setHoverAddNode(
                setInterval(function () {
                    switch (addNode.innerText) {
                        case 'A':
                            addNode.innerText = '+';
                            clearInterval(hoverAddNode);
                            break;
                        case 'Ad':
                            addNode.innerText = 'A';
                            break;
                        case 'Add':
                            addNode.innerText = 'Ad';
                            break;
                        case 'Add N':
                            addNode.innerText = 'Add';
                            break;
                        case 'Add No':
                            addNode.innerText = 'Add N';
                            break;
                        case 'Add Nod':
                            addNode.innerText = 'Add No';
                            break;
                        case 'Add Node':
                            addNode.innerText = 'Add Nod';
                            break;
                    }
                }, 20)
            );
        }
    }

    function switchRemoveNodeLabel(hovering: boolean) {
        const removeNode = document.getElementById('removeNode');
        if (hovering && removeNode != null) {
            clearInterval(hoverRemoveNode);
            setHoverRemoveNode(
                setInterval(function () {
                    switch (removeNode.innerText) {
                        case '-':
                            removeNode.innerText = 'R';
                            break;
                        case 'R':
                            removeNode.innerText = 'Re';
                            break;
                        case 'Re':
                            removeNode.innerText = 'Rem';
                            break;
                        case 'Rem':
                            removeNode.innerText = 'Remo';
                            break;
                        case 'Remo':
                            removeNode.innerText = 'Remov';
                            break;
                        case 'Remov':
                            removeNode.innerText = 'Remove';
                            break;
                        case 'Remove':
                            removeNode.innerText = 'Remove N';
                            break;
                        case 'Remove N':
                            removeNode.innerText = 'Remove No';
                            break;
                        case 'Remove No':
                            removeNode.innerText = 'Remove Nod';
                            break;
                        case 'Remove Nod':
                            removeNode.innerText = 'Remove Node';
                            clearInterval(hoverRemoveNode);
                            break;
                    }
                }, 20)
            );
        } else if (removeNode != null) {
            clearInterval(hoverRemoveNode);
            setHoverRemoveNode(
                setInterval(function () {
                    switch (removeNode.innerText) {
                        case 'R':
                            removeNode.innerText = '-';
                            clearInterval(hoverRemoveNode);
                            break;
                        case 'Re':
                            removeNode.innerText = 'R';
                            break;
                        case 'Rem':
                            removeNode.innerText = 'Re';
                            break;
                        case 'Remo':
                            removeNode.innerText = 'Rem';
                            break;
                        case 'Remov':
                            removeNode.innerText = 'Remo';
                            break;
                        case 'Remove':
                            removeNode.innerText = 'Remov';
                            break;
                        case 'Remove N':
                            removeNode.innerText = 'Remove';
                            break;
                        case 'Remove No':
                            removeNode.innerText = 'Remove N';
                            break;
                        case 'Remove Nod':
                            removeNode.innerText = 'Remove No';
                            break;
                        case 'Remove Node':
                            removeNode.innerText = 'Remove Nod';
                            break;
                    }
                }, 20)
            );
        }
    }

    function switchAddEdgeLabel(hovering: boolean) {
        const addEdge = document.getElementById('addEdge');
        if (hovering && addEdge != null) {
            clearInterval(hoverAddEdge);
            setHoverAddEdge(
                setInterval(function () {
                    switch (addEdge.innerText) {
                        case '+':
                            addEdge.innerText = 'A';
                            break;
                        case '':
                            addEdge.innerText = 'A';
                            break;
                        case 'A':
                            addEdge.innerText = 'Ad';
                            break;
                        case 'Ad':
                            addEdge.innerText = 'Add';
                            break;
                        case 'Add':
                            addEdge.innerText = 'Add E';
                            break;
                        case 'Add E':
                            addEdge.innerText = 'Add Ed';
                            break;
                        case 'Add Ed':
                            addEdge.innerText = 'Add Edg';
                            break;
                        case 'Add Edg':
                            addEdge.innerText = 'Add Edge';
                            clearInterval(hoverAddEdge);
                            break;
                    }
                }, 20)
            );
        } else if (addEdge != null) {
            clearInterval(hoverAddEdge);
            setHoverAddEdge(
                setInterval(function () {
                    switch (addEdge.innerText) {
                        case 'A':
                            addEdge.innerText = '+';
                            clearInterval(hoverAddEdge);
                            break;
                        case 'Ad':
                            addEdge.innerText = 'A';
                            break;
                        case 'Add':
                            addEdge.innerText = 'Ad';
                            break;
                        case 'Add E':
                            addEdge.innerText = 'Add';
                            break;
                        case 'Add Ed':
                            addEdge.innerText = 'Add E';
                            break;
                        case 'Add Edg':
                            addEdge.innerText = 'Add Ed';
                            break;
                        case 'Add Edge':
                            addEdge.innerText = 'Add Edg';
                            break;
                    }
                }, 20)
            );
        }
    }

    function switchRemoveEdgeLabel(hovering: boolean) {
        const removeEdge = document.getElementById('removeEdge');
        if (hovering && removeEdge != null) {
            clearInterval(hoverRemoveEdge);
            setHoverRemoveEdge(
                setInterval(function () {
                    switch (removeEdge.innerText) {
                        case '-':
                            removeEdge.innerText = 'R';
                            break;
                        case 'R':
                            removeEdge.innerText = 'Re';
                            break;
                        case 'Re':
                            removeEdge.innerText = 'Rem';
                            break;
                        case 'Rem':
                            removeEdge.innerText = 'Remo';
                            break;
                        case 'Remo':
                            removeEdge.innerText = 'Remov';
                            break;
                        case 'Remov':
                            removeEdge.innerText = 'Remove';
                            break;
                        case 'Remove':
                            removeEdge.innerText = 'Remove E';
                            break;
                        case 'Remove E':
                            removeEdge.innerText = 'Remove Ed';
                            break;
                        case 'Remove Ed':
                            removeEdge.innerText = 'Remove Edg';
                            break;
                        case 'Remove Edg':
                            removeEdge.innerText = 'Remove Edge';
                            clearInterval(hoverRemoveEdge);
                            break;
                    }
                }, 20)
            );
        } else if (removeEdge != null) {
            clearInterval(hoverRemoveEdge);
            setHoverRemoveEdge(
                setInterval(function () {
                    switch (removeEdge.innerText) {
                        case 'R':
                            removeEdge.innerText = '-';
                            clearInterval(hoverRemoveEdge);
                            break;
                        case 'Re':
                            removeEdge.innerText = 'R';
                            break;
                        case 'Rem':
                            removeEdge.innerText = 'Re';
                            break;
                        case 'Remo':
                            removeEdge.innerText = 'Rem';
                            break;
                        case 'Remov':
                            removeEdge.innerText = 'Remo';
                            break;
                        case 'Remove':
                            removeEdge.innerText = 'Remov';
                            break;
                        case 'Remove E':
                            removeEdge.innerText = 'Remove';
                            break;
                        case 'Remove Ed':
                            removeEdge.innerText = 'Remove E';
                            break;
                        case 'Remove Edg':
                            removeEdge.innerText = 'Remove Ed';
                            break;
                        case 'Remove Edge':
                            removeEdge.innerText = 'Remove Edg';
                            break;
                    }
                }, 20)
            );
        }
    }

    // Sends all new Node data to the backend
    async function SaveAllNodes() {
        const importNodes = await axios.post('api/directory/import/direct', {
          data: newNodes,
        })

        setSavedStatus(importNodes.data.statusText)

        console.log(importNodes);
    }

    useEffect(() => {
        if (nodeSelected) {
            form.setValues({
                xpos: nodeX.toString(),
                ypos: nodeY.toString(),
                floor: floor.toString(),
            });
        }
    }, [nodeSelected, nodeX, nodeY, floor]);

    useEffect(() => {
      setCollapsed(!hovered);
    }, [hovered]);


    return (
        <Box
            pos="fixed"
            left={20}
            right={0}
            display="flex"
            ta="left"
            pb={collapsed ? 0 : '1.5rem'}
            style={{
                zIndex: 999,
                transition: 'all 0.4s ease-in-out',
            }}
        >
            <Box
                ref={ref}
                bg="themeGold.2"
                p={collapsed ? 0 : { base: 'xl', sm: '2rem' }}
                w="37%"
                maw={collapsed ? 350 : '80%'}
                opacity={collapsed ? 0.8 : 0.95}
                style={{
                    maxWidth: collapsed ? '350px' : '80%',
                    opacity: collapsed ? 0.8 : 0.95,
                    borderRadius: theme.radius.lg,
                    overflow: 'hidden',
                }}
            >
                <Collapse in={!collapsed}>
                    <Title
                        order={2}
                        mb="md"
                        c="black"
                        ta="center"
                        fw={700}
                        fz={{ sm: 'xl', md: 'xxxl' }}
                    >
                        Edit the Map
                    </Title>
                    <Flex direction="column" justify="space-evenly" gap="xs">
                        <Flex direction="row" justify="space-around" gap="xs">
                            <Title
                                order={2}
                                mb="md"
                                c="black"
                                ta="center"
                                fw={700}
                                fz={{ sm: 'md', md: 'xl' }}
                            >
                                Node:
                            </Title>
                            <BlackButton
                                id="addNode"
                                bg="blueBase.8"
                                onClick={handleAddNode}
                                onMouseEnter={() => switchAddNodeLabel(true)}
                                onMouseLeave={() => switchAddNodeLabel(false)}
                            >
                                +
                            </BlackButton>
                            <BlackButton
                                id="removeNode"
                                bg="blueBase.8"
                                onClick={handleRemoveNode}
                                onMouseEnter={() => switchRemoveNodeLabel(true)}
                                onMouseLeave={() => switchRemoveNodeLabel(false)}
                            >
                                -
                            </BlackButton>
                        </Flex>
                        <Flex direction="row" justify="space-around" gap="xl">
                            <Title
                                order={2}
                                mb="md"
                                c="black"
                                ta="center"
                                fw={700}
                                fz={{ sm: 'md', md: 'xl' }}
                            >
                                Edge:
                            </Title>
                            <BlackButton
                                id="addEdge"
                                bg="blueBase.8"
                                onClick={handleAddEdge}
                                onMouseEnter={() => switchAddEdgeLabel(true)}
                                onMouseLeave={() => switchAddEdgeLabel(false)}
                            >
                                +
                            </BlackButton>
                            <BlackButton
                                id="removeEdge"
                                bg="blueBase.8"
                                onClick={handleRemoveEdge}
                                onMouseEnter={() => switchRemoveEdgeLabel(true)}
                                onMouseLeave={() => switchRemoveEdgeLabel(false)}
                            >
                                -
                            </BlackButton>
                        </Flex>
                        <Flex direction="row" justify="space-between" gap="xs">
                            <TextInput
                                label="X Position"
                                placeholder="Select a node"
                                disabled={!nodeSelected}
                                key={form.key('xpos')}
                                {...form.getInputProps('xpos')}
                            ></TextInput>
                            <TextInput
                                label="Y Position"
                                placeholder="Select a node"
                                disabled={!nodeSelected}
                                key={form.key('ypos')}
                                {...form.getInputProps('ypos')}
                            ></TextInput>
                            <TextInput
                                label="Floor"
                                placeholder="Select a node"
                                disabled={!nodeSelected}
                                key={form.key('floor')}
                                {...form.getInputProps('floor')}
                            ></TextInput>
                        </Flex>
                        <Grid align="center">
                            <Grid.Col span={10}>
                                <BlackButton bg="blueBase.8" onClick={handleUpdateNodePosition}>
                                    Update Position
                                </BlackButton>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <ActionIcon
                                    bg="blueBase.8"
                                    size="input-sm"
                                    onClick={() => setCollapsed(true)}
                                    aria-label="ActionIcon the same size as inputs"
                                >
                                    <IconArrowBadgeRight />
                                </ActionIcon>
                            </Grid.Col>
                        </Grid>
                      <Flex direction="row" justify="space-between" gap="xs">
                        <BlackButton
                        onClick={() => SaveAllNodes()}>
                          Save Changes
                        </BlackButton>
                        <Title>
                          {savedStatus}
                        </Title>
                      </Flex>
                    </Flex>
                    <Flex justify="flex-end" gap="md"></Flex>
                </Collapse>

                {collapsed && (
                    <Box display="flex" w="100%" ta="center" opacity={1.0}>
                        <Box w="100%" maw={{ base: '100%', md: '700px' }}>
                            <Grid justify="space-evenly" align="center">
                                <Grid.Col span={'content'}>
                                    <Title
                                        order={2}
                                        mt="xs"
                                        mb="xs"
                                        c="black"
                                        ta="left"
                                        fw={700}
                                        fz={{ sm: 'l', md: 'l' }}
                                    >
                                        Map Editor Tools
                                    </Title>
                                </Grid.Col>
                                <Grid.Col span={'content'}>
                                    <ActionIcon
                                        bg="blueBase.8"
                                        size="input-sm"
                                        onClick={() => setCollapsed(false)}
                                        aria-label="ActionIcon the same size as inputs"
                                    >
                                        <IconArrowBadgeDown />
                                    </ActionIcon>
                                </Grid.Col>
                            </Grid>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default MapEditorBox;
