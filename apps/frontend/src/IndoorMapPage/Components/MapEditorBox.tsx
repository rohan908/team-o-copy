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
import {MapContext, MapEditorProps} from '../MapEditor.tsx';
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

    const mapProps: MapEditorProps = useContext(MapContext);

    const theme = useMantineTheme();
    const [collapsed, setCollapsed] = useState(true);
    const [hoverPanTool, setHoverPanTool] = useState(setTimeout(function () {}, 1000));
    const [hoverNodeTool, setHoverNodeTool] = useState(setTimeout(function () {}, 1000));
    const [hoverEdgeTool, setHoverEdgeTool] = useState(setTimeout(function () {}, 1000));
    const [saveText, setSaveText] = useState(setTimeout(function () {}, 1000));
    const handlePanTool = () => {mapProps.setSelectedTool('pan')}
    const handleNodeTool = () => {mapProps.setSelectedTool('add-node')};
    const handleEdgeTool = () => null;
    

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

    function switchPanToolLabel(hovering: boolean) {
      const panTool = document.getElementById('panTool');
      if (hovering && panTool != null) {
        clearInterval(hoverPanTool);
        setHoverPanTool(
          setInterval(function () {
            switch (panTool.innerText) {
              case '+':
                panTool.innerText = 'P';
                break;
              case 'P':
                panTool.innerText = 'Pa';
                break;
              case 'Pa':
                panTool.innerText = 'Pan';
                break;
              case 'Pan':
                panTool.innerText = 'Pan T';
                break;
              case 'Pan T':
                panTool.innerText = 'Pan To';
                break;
              case 'Pan To':
                panTool.innerText = 'Pan Too';
                break;
              case 'Pan Too':
                panTool.innerText = 'Pan Tool';
                clearInterval(hoverPanTool);
                break;
            }
          }, 20)
        );
      } else if (panTool != null) {
        clearInterval(hoverPanTool);
        setHoverPanTool(
          setInterval(function () {
            switch (panTool.innerText) {
              case 'P':
                panTool.innerText = '+';
                clearInterval(hoverPanTool);
                break;
              case 'Pa':
                panTool.innerText = 'P';
                break;
              case 'Pan':
                panTool.innerText = 'Pa';
                break;
              case 'Pan T':
                panTool.innerText = 'Pan';
                break;
              case 'Pan To':
                panTool.innerText = 'Pan T';
                break;
              case 'Pan Too':
                panTool.innerText = 'Pan To';
                break;
              case 'Pan Tool':
                panTool.innerText = 'Pan Too';
                break;
            }
          }, 20)
        );
      }
    }

    function switchAddNodeLabel(hovering: boolean) {
        const addNode = document.getElementById('addNode');
        if (hovering && addNode != null) {
            clearInterval(hoverNodeTool);
            setHoverNodeTool(
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
                            clearInterval(hoverNodeTool);
                            break;
                    }
                }, 20)
            );
        } else if (addNode != null) {
            clearInterval(hoverNodeTool);
            setHoverNodeTool(
                setInterval(function () {
                    switch (addNode.innerText) {
                        case 'A':
                            addNode.innerText = '+';
                            clearInterval(hoverNodeTool);
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

    function switchAddEdgeLabel(hovering: boolean) {
        const addEdge = document.getElementById('addEdge');
        if (hovering && addEdge != null) {
            clearInterval(hoverEdgeTool);
            setHoverEdgeTool(
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
                            clearInterval(hoverEdgeTool);
                            break;
                    }
                }, 20)
            );
        } else if (addEdge != null) {
            clearInterval(hoverEdgeTool);
            setHoverEdgeTool(
                setInterval(function () {
                    switch (addEdge.innerText) {
                        case 'A':
                            addEdge.innerText = '+';
                            clearInterval(hoverEdgeTool);
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

    function addSaveLabel() {
        const saveLabel = document.getElementById('saved');
        if(saveLabel != null) {
          clearInterval(saveText);
          setSaveText(
            setInterval(function () {
                switch (saveLabel.innerText) {
                case '':
                  saveLabel.innerText = 'S';
                  break;
                case 'S':
                  saveLabel.innerText = 'Sa';
                  break;
                case 'Sa':
                  saveLabel.innerText = 'Sav';
                  break;
                case 'Sav':
                  saveLabel.innerText = 'Save';
                  break;
                case 'Save':
                  saveLabel.innerText = 'Saved';
                  clearInterval(saveText);
                  break;
              }
            }, 20)
          );
        }
    }

    function removeSaveLabel() {
      const saveLabel = document.getElementById('saved');
      if(saveLabel != null) {
        clearInterval(saveText);
        saveLabel.innerText = '';
      }
    }

    // Sends all new Node data to the backend
    async function SaveAllNodes() {
        const importNodes = await axios.post('api/directory/import/direct', {
          data: newNodes,
        })

        addSaveLabel();

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

      removeSaveLabel();

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
                        Edit The Map
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
                            Pan:
                          </Title>
                          <BlackButton
                            id="panTool"
                            bg="blueBase.8"
                            onClick={handlePanTool}
                            onMouseEnter={() => switchPanToolLabel(true)}
                            onMouseLeave={() => switchPanToolLabel(false)}
                          >
                            +
                          </BlackButton>
                        </Flex>
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
                                onClick={handleNodeTool}
                                onMouseEnter={() => switchAddNodeLabel(true)}
                                onMouseLeave={() => switchAddNodeLabel(false)}
                            >
                                +
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
                                onClick={handleEdgeTool}
                                onMouseEnter={() => switchAddEdgeLabel(true)}
                                onMouseLeave={() => switchAddEdgeLabel(false)}
                            >
                                +
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
                        <Title
                          id={'saved'}>
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
