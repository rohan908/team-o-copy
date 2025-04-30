import React, { useState, useEffect, useContext } from 'react';
import { Box, useMantineTheme, SegmentedControl, Flex, Collapse } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import FloorConnectionBox from './FloorConnectionBox.tsx';
import { MapContext } from '../MapEditor.tsx';

interface FloorSwitchBoxProps {
    floor: number;
    setFloor: (floor: number) => void;
    onCollapseChange?: (isCollapsed: boolean) => void;
    building: string;
}

const FloorSwitchBox: React.FC<FloorSwitchBoxProps> = ({ floor, setFloor, building }) => {
    const theme = useMantineTheme();
    const mapProps = useContext(MapContext);

    // TODO: In the future these should re-suse a react component.
    if (building === '22 Patriot Pl' || building == '20 Patriot Pl') {
        return (
            <Box
                bg="#1C43A7"
                pos="fixed"
                left="93%"
                bottom="5%"
                m="3px"
                style={{
                    borderRadius: '30px',
                    zIndex: 999,
                    transition: 'all 0.4s ease-in-out',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.7)',
                }}
            >
                <Box m="4px" p="2px" bg="blueBase.6" style={{ borderRadius: '30px' }}>
                    <SegmentedControl
                        orientation="vertical"
                        withItemsBorders={false}
                        size="14px"
                        m="1px"
                        color="blueBase.6"
                        value={floor.toString()}
                        onChange={(value) => setFloor(parseInt(value))}
                        data={[
                            { label: '3D', value: '5' },
                            { label: 'F4', value: '4' },
                            { label: 'F3', value: '3' },
                            { label: 'F2', value: '2' },
                            { label: 'F1', value: '1' },
                        ]}
                        styles={{
                            root: {
                                borderRadius: 30,
                                backgroundColor: '#1C43A7',
                            },
                            label: {
                                fontWeight: 600,
                                color: 'white',
                            },
                            indicator: {
                                borderRadius: 30,
                            },
                        }}
                    />
                </Box>
            </Box>
        );
    } else if (building === 'admin') {
        return (
            <Box
                pos="fixed"
                right="30px"
                bottom="15px"
                m="3px"
                style={{
                    borderRadius: '30px',
                    zIndex: 999,
                    transition: 'all 0.4s ease-in-out',
                }}
            >
                <Flex direction="row" align={'flex-end'}>
                    <Collapse
                        in={
                            mapProps.selectedTool == 'add-edge' &&
                            mapProps.currentNode?.nodeType == 'staircase'
                        }
                        transitionDuration={250}
                        transitionTimingFunction="linear"
                    >
                        <FloorConnectionBox />
                    </Collapse>
                    <Flex
                        m="3px"
                        p="2px"
                        bg="blueBase.6"
                        justify={'center'}
                        style={{
                            borderRadius: '30px',
                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.7)',
                        }}
                    >
                        <SegmentedControl
                            orientation="vertical"
                            withItemsBorders={false}
                            w={'100%'}
                            size="14px"
                            m="1px"
                            color="blueBase.6"
                            value={floor.toString()}
                            onChange={(value) => setFloor(parseInt(value))}
                            data={[
                                { label: 'BC', value: '7' },
                                { label: 'FK', value: '6' },
                                { label: 'CH', value: '5' },
                                { label: 'P4', value: '4' },
                                { label: 'P3', value: '3' },
                                { label: 'P1', value: '1' },
                            ]}
                            styles={{
                                root: {
                                    borderRadius: 30,
                                    backgroundColor: '#1C43A7',
                                },
                                label: {
                                    fontWeight: 600,
                                    textSize: '14px',
                                    textAlign: 'center',
                                    color: 'white',
                                },
                                indicator: {
                                    borderRadius: 30,
                                },
                            }}
                        />
                    </Flex>
                </Flex>
            </Box>
        );
    }
};

export default FloorSwitchBox;
