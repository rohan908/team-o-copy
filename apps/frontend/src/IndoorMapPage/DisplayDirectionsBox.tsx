/**
 Author: Liam O'Driscoll
 Use: Displays Directions from GetTextDirections
 NOTES: CTRL+F !!! for changes that may need to be made
 I use ({Date}) in comments to manually track myself
 */
import {Accordion, Box, Text, Group, Divider, Flex, SegmentedControl, Button} from '@mantine/core';
import { GetTextDirections } from './GetTextDirections.tsx';
import {useMemo, useState} from 'react';
import { usePathContext, useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import { useAllNodesContext } from '../contexts/DirectoryContext.tsx';
import { useTimeline } from '../HomePage/TimeLineContext.tsx';
import { NodeDataType } from './MapClasses/MapTypes.ts';
import { useUser} from '@clerk/clerk-react';

import {
    IconArrowLeft,
    IconArrowRight,
    IconStairs,
    IconArrowUp,
} from '@tabler/icons-react';
import TTSButton from '../Buttons/TTSButton.tsx';
import {Link} from "react-router-dom";

/**
 *
 * @param nodeIds : list of numbers representing the nodeIds that are in the calculated path
 * @param allNodes : list of all NodeDataType's
 *
 */
function getPathNodes(nodeIds: number[], allNodes: NodeDataType[]): NodeDataType[] {
    const pathNodes: NodeDataType[] = [];

    for (const id of nodeIds) {
        const node = allNodes.find((node) => node.id === id);
        if (node) {
            pathNodes.push(node);
        }
    }

    return pathNodes;
}

export function DisplayDirectionsBox() {
    const { department, selectedHospital, setDepartment} = useTimeline();
    const pathNodes = usePathContext();
    const navSelection = useNavSelectionContext();
    const nodeIds = pathNodes.state.pathSelectRequest?.NodeIds;
    const [distanceType, setDistanceType] = useState("ft");
    let turnLeft = false;
    let turnRight = false;
    const { isSignedIn, user } = useUser();
    const role = user?.publicMetadata?.role;

    const allNodes = useAllNodesContext();

    // Scale factor translates node space coords to feet
    const getScaleFactor = () => {
        const hospital = navSelection.state.navSelectRequest?.HospitalName;
        if (hospital === '20 Patriot Pl' || hospital === '22 Patriot Pl') {
            return 1.5;
        }
        if (hospital === 'Chestnut Hill') {
            return 0.91;
        }
        if (hospital === 'Faulkner Hospital') {
            return 2.23;
        }
        if (hospital === 'BWH Campus') {
            return 3.43;
        } else {
            return 1;
        }
    };

    function convertFeetToMeters(input: number) {
      if (distanceType === "ft"){
        if (input == 0){
          return 9;
        }
        return input;
      } else {
        if (input == 0){
          return 2.74;
        }
        return input * 0.3048;
      }
    }

    // only call GetTextDirections if/when pathNodes change
    const directions = useMemo(() => {
        if (nodeIds && nodeIds.length > 1) {
            const fullPathNodes = getPathNodes(nodeIds, allNodes);
            return GetTextDirections(fullPathNodes);
        }
        return [];
    }, [nodeIds, allNodes]);
    // group directions by floor so they can be displayed separately

    const directionsByFloor: {
        [floor: number]: { Direction: string; Distance: number; Floor: number }[];
    } = {};
    directions.forEach((direction) => {
        if (!directionsByFloor[direction.Floor]) {
            directionsByFloor[direction.Floor] = [];
        }
        directionsByFloor[direction.Floor].push(direction);
    });
    if (!department || !selectedHospital) {
        return (
            <Box
                w="80%"
                h="400px"
                style={{
                    overflow: 'hidden',
                    borderRadius: '8px',
                    boxShadow:
                        nodeIds && nodeIds.length > 1 && department && selectedHospital
                            ? '0px 0px 4px 0px #AAAAAA'
                            : '0px 0px 0px 0px #FFFFFF',
                }}
            >
                <Box style={{ overflowY: 'auto' }}>
                    <Accordion
                        multiple
                        styles={{
                            root: {
                                height: '450px',
                                overflowY: 'auto',
                            },
                            item: {
                                marginBottom: '0px',
                            },
                        }}
                        defaultValue={[
                            'floor-1',
                            'floor-2',
                            'floor-3',
                            'floor-4',
                            'floor-5',
                            'floor-6',
                            'floor-7',
                        ]}
                    ></Accordion>
                </Box>
            </Box>
        );
    }
    return (
        <Box
            w="80%"
            h={isSignedIn && role === 'admin' ? "340px" : "400px"}
            style={{
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow:
                    nodeIds && nodeIds.length > 1 && department && selectedHospital
                        ? '0px 0px 4px 0px #AAAAAA'
                        : '0px 0px 0px 0px #FFFFFF',
            }}
        >
          <Flex direction={"column"} justify={"center"}>
            <Box style={{ overflowY: 'auto' }}>
              <Accordion
                    w={"100%"}
                    h={isSignedIn && role === 'admin' ? "275px" : "335px"}
                    multiple
                    styles={{
                        root: {
                            overflowY: 'auto',
                        },
                        item: {
                            marginBottom: '0px',
                        },
                    }}
                    defaultValue={[
                        'floor-1',
                        'floor-2',
                        'floor-3',
                        'floor-4',
                        'floor-5',
                        'floor-6',
                        'floor-7',
                    ]}
                >
                    {Object.entries(directionsByFloor).map(([floor, direction]) => {
                        const floorTTS = direction.map((step) => {
                            if (step.Direction.startsWith('Take')) return step.Direction;
                            if (step.Direction === 'Straight')
                                return `Continue straight for ${convertFeetToMeters(step.Distance * 1.5).toFixed(0)} ${distanceType}.`;
                            return `Turn ${step.Direction.toLowerCase()}`;
                        });
                        return (
                            <Accordion.Item key={floor} value={`floor-${floor}`}>
                                <Accordion.Control>
                                    <Group>
                                      <Flex direction={"column"} gap="0px" align={"center"}>
                                      <Text fw={700} size="md" c="secondaryBlues.5">
                                        {/* Stupid ass logic to change the floor bc we didn't do it right the first time*/}
                                        {/* Changing for Faulkner and Chestnut*/}
                                        {Number(floor) === 1 ? 'Floor 1' : ''}
                                        {Number(floor) === 2 ? 'Floor 3' : ''}
                                        {Number(floor) === 3 ? 'Floor 4' : ''}
                                        {Number(floor) === 4 ? 'Chestnut' : ''}
                                        {Number(floor) === 5 ? 'Faulkner' : ''}
                                        {Number(floor) === 6 ? 'BWH' : ''}
                                      </Text>
                                      {/*<SegmentedControl*/}
                                      {/*  maw={"100px"}*/}
                                      {/*  orientation="horizontal"*/}
                                      {/*  bg={"secondaryBlues.5"}*/}
                                      {/*  c={"white"}*/}
                                      {/*  color={"secondaryBlues.2"}*/}
                                      {/*  value={distanceType}*/}
                                      {/*  onChange={setDistanceType}*/}
                                      {/*  data={[*/}
                                      {/*    { label: 'FT', value: "feet" },*/}
                                      {/*    { label: 'M', value: 'meters' },*/}
                                      {/*  ]}*/}
                                      {/*  styles={{*/}
                                      {/*    root: {*/}
                                      {/*      borderRadius: 30,*/}
                                      {/*    },*/}
                                      {/*    label: {*/}
                                      {/*      fontWeight: 600,*/}
                                      {/*      textSize: '14px',*/}
                                      {/*      textAlign: 'center',*/}
                                      {/*      color: 'white',*/}
                                      {/*    },*/}
                                      {/*    indicator: {*/}
                                      {/*      borderRadius: 30,*/}
                                      {/*    },*/}
                                      {/*  }}/>*/}
                                      </Flex>
                                      <TTSButton text={floorTTS} />
                                    </Group>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    {direction.map((step, idx) => {
                                        if (step.Direction === "Left"){
                                          turnLeft = true;
                                          return null;
                                        }
                                        else if (step.Direction === "Right"){
                                          turnRight = true;
                                          return null;
                                        }

                                        const icon = step.Direction.toLowerCase().includes(
                                            'elevator'
                                        ) ? (
                                            <IconStairs size={20} color="#0E3B99" />
                                        ) : step.Direction.toLowerCase().includes('stairs') ? (
                                            <IconStairs size={20} color="#0E3B99" />
                                          ) : turnLeft ? (
                                            <IconArrowLeft size={16} color="#0E3B99" />
                                          ) : turnRight ?  (
                                            <IconArrowRight size={16} color="#0E3B99" />
                                          ) : (
                                            <IconArrowUp size={20} color="#0E3B99" />
                                        );

                                        const label = step.Direction.startsWith('Take')
                                            ? step.Direction
                                            : turnLeft
                                              ? `Turn left`
                                              : turnRight
                                              ? `Turn right`
                                              : 'Continue straight';

                                        if (step.Direction === 'Straight'){
                                          turnLeft = false;
                                          turnRight = false;
                                        }
                                        return (
                                            <Box key={idx} mb="xs">
                                                <Group align="center">
                                                    <Flex direction="row" gap="sm" align="center">
                                                        {icon}
                                                        <Text
                                                            size="sm"
                                                            fw={500}
                                                            c="secondaryBlues.5"
                                                        >
                                                            {label}
                                                        </Text>
                                                    </Flex>
                                                </Group>
                                                <Divider color="yellowAccent.4" my="xs" label={`${convertFeetToMeters(step.Distance * 1.5).toFixed(0)} ${distanceType}`}/>
                                            </Box>
                                        );
                                    })}
                                </Accordion.Panel>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
              <Flex w="100%" direction={"row"} gap="md" ta='center' mt="xs" justify="center" align={"center"}>
                <Button component={Link} to="/" color="secondaryBlues.5" fz="14px" size='xs'>
                  Navigation Complete
                </Button>
                <SegmentedControl
                  orientation="vertical"
                  bg={"secondaryBlues.5"}
                  c={"white"}
                  size={"xs"}
                  lh={"xs"}
                  color={"secondaryBlues.2"}
                  value={distanceType}
                  onChange={setDistanceType}
                  data={[
                    { label: 'FT', value: "ft" },
                    { label: 'M', value: 'meters' },
                  ]}
                  styles={{
                    root: {
                      borderRadius: 30,
                    },
                    label: {
                      fontWeight: 600,
                      fontSize: '12px',
                      textAlign: 'center',
                      color: 'white',
                    },
                    innerLabel: {

                    },
                    indicator: {
                      borderRadius: 30,
                    },
                  }}/>
              </Flex>
            </Box>
          </Flex>
        </Box>
    );
}
