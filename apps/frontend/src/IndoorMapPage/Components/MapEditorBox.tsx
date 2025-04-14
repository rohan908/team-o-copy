import React, { useState, useEffect, useContext } from 'react';
import { BasicOutlinedButton } from '../../common-compoents/commonButtons.tsx';
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
import { useForm } from '@mantine/form';
import { IconArrowBadgeRight, IconArrowBadgeDown } from '@tabler/icons-react';

interface MapEditorBoxProps {
    onCollapseChange?: (isCollapsed: boolean) => void;
    nodeSelected?: (isSelected: boolean) => void;
    nodeX?: number;
    nodeY?: number;
    floor?: number;
    updateNodePosition?: (x: number, y: number, floor: number) => void;
}

const MapEditorBox: React.FC<MapEditorBoxProps> = ({
    onCollapseChange,
    nodeSelected = false,
    nodeX = 0,
    nodeY = 0,
    floor = 0,
    updateNodePosition,
}) => {
    const theme = useMantineTheme();
    const [collapsed, setCollapsed] = useState(false);

    const handleAddNode = () => null;
    const handleAddEdge = () => null;
    const handleRemoveNode = () => null;
    const handleRemoveEdge = () => null;

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
        onCollapseChange?.(collapsed);
    }, [collapsed]);

    return (
        <Box
            pos="fixed"
            left={20}
            right={0}
            style={{
                zIndex: 999,
                display: 'flex',
                justifyContent: 'left',
                transition: 'all 0.4s ease-in-out',
                paddingBottom: collapsed ? 0 : '1.5rem',
            }}
        >
            <Box
                bg="themeGold.0"
                p={collapsed ? 0 : { base: 'xl', sm: '2rem' }}
                w="37%"
                style={{
                    maxWidth: collapsed ? '350px' : '80%', // ✅ Collapse mode limits width
                    opacity: collapsed ? 0.8 : 0.95,
                    borderRadius: theme.radius.lg,
                    backdropFilter: 'blur(5px)',
                    boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.1)',
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
                            <BasicOutlinedButton>Add Node</BasicOutlinedButton>
                            <BasicOutlinedButton>Add Edge</BasicOutlinedButton>
                        </Flex>
                        <Flex direction="row" justify="space-evenly" gap="xl">
                            <BasicOutlinedButton>Remove Node</BasicOutlinedButton>
                            <BasicOutlinedButton>Remove Edge</BasicOutlinedButton>
                        </Flex>
                        <Flex direction="row" justify="space-around" gap="xs">
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
                        <Grid>
                            <Grid.Col span={11}>
                                <BasicOutlinedButton>Update Position</BasicOutlinedButton>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <ActionIcon
                                    size="input-sm"
                                    onClick={() => setCollapsed(true)}
                                    aria-label="ActionIcon the same size as inputs"
                                >
                                    <IconArrowBadgeRight />
                                </ActionIcon>
                            </Grid.Col>
                        </Grid>
                    </Flex>
                    <Flex justify="flex-end" gap="md"></Flex>
                </Collapse>

                {collapsed && (
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            opacity: 1.0,
                            verticalAlign: 'middle',
                        }}
                    >
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
