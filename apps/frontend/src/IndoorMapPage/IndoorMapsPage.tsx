import { DraggableMap } from './DraggableMap.tsx';
import { Flex, Box, Stack, Title, Divider, useMantineTheme } from '@mantine/core';
import { DisplayDirectionsBox } from './DisplayDirectionsBox.tsx';
import { ParkingSelector } from '../HomePage/ParkingSelector.tsx';
import { DepartmentSelector } from '../HomePage/DepartmentSelector.tsx';
import { AlgorithmSelector } from '../HomePage/AlgorithmSelector.tsx';

import { useUser} from '@clerk/clerk-react';

import {
    IconBuildings,
    IconCheckupList,
    IconDotsVertical,
    IconRouteSquare,
} from '@tabler/icons-react';

export function IndoorMapsPage() {
    const theme = useMantineTheme();
    const { isSignedIn, user } = useUser();
    const role = user?.publicMetadata?.role;

    return (
        <Flex direction="row" h="100%" mih="100vh" w="100vw" bg="#EBF2FF">
            <Box w={320} mt={60} bg="#EBF2FF">
                {/* Sidebar Panel */}
                <Title order={1} fz={'xl'} pt={'8px'} mb={'sm'} ta={'center'} c={'#0E3B99'}>
                    Navigate the Hospital
                </Title>
                <Stack w={320}>
                    <Divider color={'yellowAccent.4'} />
                    <Flex direction="column" justify="center" align="center">
                        <Flex direction="row" gap={'xs'}>
                            <IconBuildings
                                size="20"
                                style={{ color: theme.colors.primaryBlues[8], marginTop: '7px' }}
                            />
                            <ParkingSelector hasIcon={false} w={'100%'} />
                        </Flex>
                        <Flex w="100%" justify={'left'}>
                            <IconDotsVertical
                                size="20"
                                style={{
                                    color: theme.colors.primaryBlues[8],
                                    marginTop: '-10px',
                                    marginLeft: '17.5px',
                                }}
                            />
                        </Flex>
                        <Flex direction="row" gap={'xs'}>
                            <IconCheckupList
                                size="20"
                                style={{ color: theme.colors.primaryBlues[8], marginTop: '7px' }}
                            />
                            <DepartmentSelector hasIcon={false} w={'100%'} />
                        </Flex>
                        {isSignedIn && role === 'admin' && (
                            <>
                                {/*<Title order={4} fz={'md'} ta={'center'} c={'#0E3B99'}>*/}
                                {/*    Change Pathfinding Algorithm*/}
                                {/*</Title>*/}

                                <Flex w="100%" justify={'left'}>
                                    <IconDotsVertical
                                        size="20"
                                        style={{
                                            color: theme.colors.primaryBlues[8],
                                            marginTop: '-10px',
                                            marginLeft: '17.5px',
                                        }}
                                    />
                                </Flex>
                                <Flex direction="row" gap={'xs'}>
                                    <IconRouteSquare
                                        size="20"
                                        style={{
                                            color: theme.colors.primaryBlues[8],
                                            marginTop: '7px',
                                        }}
                                    />
                                    <AlgorithmSelector hasIcon={false} w={'100%'} />
                                </Flex>
                            </>
                        )}
                        {/*<Flex w="100%" justify={'left'}>*/}
                        {/*    <IconDotsVertical*/}
                        {/*        size="20"*/}
                        {/*        style={{*/}
                        {/*            color: theme.colors.primaryBlues[8],*/}
                        {/*            marginTop: '-10px',*/}
                        {/*            marginLeft: '17.5px',*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</Flex>*/}
                        {/*<Flex direction="row" gap={'xs'}>*/}
                        {/*    <IconRouteSquare*/}
                        {/*        size="20"*/}
                        {/*        style={{ color: theme.colors.primaryBlues[8], marginTop: '7px' }}*/}
                        {/*    />*/}
                        {/*    <AlgorithmSelector hasIcon={true} w={'100%'} />*/}
                        {/*</Flex>*/}
                    </Flex>
                    <Flex direction="column" justify="center" align="center">
                        <DisplayDirectionsBox />
                    </Flex>
                </Stack>
            </Box>
            {/* Map */}
            <Box style={{ flexGrow: 1, minWidth: 0, position: 'relative' }}>
                <DraggableMap onHomePage={false} />
            </Box>
        </Flex>
    );
}
