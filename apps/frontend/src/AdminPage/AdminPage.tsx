import React, { useState } from 'react';

import {
    Collapse,
    Button,
    Center,
    Flex,
    Title,
    Box,
    Grid,
    ActionIcon,
    Modal,
    useMantineTheme,
} from '@mantine/core';

import CSVControlsComponent from './CSVControlsComponent.tsx';
import {
    IconChevronDown,
    IconChevronUp,
    IconFileBroken,
    IconMap2,
    IconLanguage,
    IconShieldHalf,
    IconTrash,
    IconBellExclamation,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { SidebarButton } from '../common-compoents/commonButtons.tsx';
import ServiceRequestPage from '../service-request/ServiceRequestPage.tsx';
import { HoverUnderline } from '../common-compoents/HoverUnderline.tsx';
import RequestHistory from './RequestHistory.tsx';

export function AdminPage() {
    const [formInfoOpen, { open, close }] = useDisclosure(true);
    const [CSVManipOpen, setCSVManipOpen] = useState(false);
    const [displayTableNumber, setDisplayTableNumber] = useState(0);
    const theme = useMantineTheme();

    function displayNumToggle(num: number) {
        // if (num == displayTableNumber) {
        //   setDisplayTableNumber(-1);
        // } else {x`
        //   setDisplayTableNumber(num);
        // }
        setDisplayTableNumber(num);
    }

    return (
        <Box mih="100vh" w="full" pt={'5px'} bg="#EAF1FF">
            <Grid align="top">
                <Grid.Col span={'content'}>
                    <Flex direction="column" justify="center">
                        <Box w="20vw" mih="100vh" pt="75px" p="lg" mt="-8px">
                            <Flex direction="column" justify="center" gap="sm">
                                <Flex
                                    direction="row"
                                    align="center"
                                    justify="center"
                                    gap="sm"
                                    mb="lg"
                                >
                                    <HoverUnderline>
                                        <Title order={2} c="secondaryBlues.7" w={'auto'} mt="md">
                                            Admin Page
                                        </Title>
                                    </HoverUnderline>
                                </Flex>
                                <Flex
                                    direction="column"
                                    align="left"
                                    justify="left"
                                    gap="sm"
                                    p="sm"
                                >
                                    <Flex direction="row" align="center" gap="0px">
                                        <Title c="secondaryBlues.7">Service Request History</Title>
                                        <Collapse
                                            in={formInfoOpen}
                                            transitionDuration={0}
                                            transitionTimingFunction="linear"
                                        >
                                            <ActionIcon
                                                bg={'#EBF2FF'}
                                                top="10%"
                                                size="input-sm"
                                                onClick={close}
                                                aria-label="ActionIcon the same size as inputs"
                                            >
                                                <IconChevronUp color={'#1C43A7'} />
                                            </ActionIcon>
                                        </Collapse>
                                        {!formInfoOpen && (
                                            <ActionIcon
                                                bg={'#EBF2FF'}
                                                size="input-sm"
                                                onClick={open}
                                                aria-label="ActionIcon the same size as inputs"
                                            >
                                                <IconChevronDown color={'#1C43A7'} />
                                            </ActionIcon>
                                        )}
                                    </Flex>
                                    <Collapse
                                        in={formInfoOpen}
                                        transitionDuration={400}
                                        transitionTimingFunction="linear"
                                    >
                                        <Flex
                                            direction="column"
                                            justify="center"
                                            gap="md"
                                            ml="sm"
                                            w="100%"
                                        >
                                            <SidebarButton
                                                ValueToCheck={displayTableNumber.toString()}
                                                ValueForTrigger={'0'}
                                                onClick={() => displayNumToggle(0)}
                                                icon={<IconLanguage size="35" />}
                                            >
                                                Language Requests
                                            </SidebarButton>

                                            <SidebarButton
                                                ValueToCheck={displayTableNumber.toString()}
                                                ValueForTrigger={'2'}
                                                onClick={() => displayNumToggle(2)}
                                                icon={<IconTrash size="35" />}
                                            >
                                                Sanitation Requests
                                            </SidebarButton>

                                            <SidebarButton
                                                ValueToCheck={displayTableNumber.toString()}
                                                ValueForTrigger={'3'}
                                                onClick={() => displayNumToggle(3)}
                                                icon={<IconBellExclamation size="35" />}
                                            >
                                                Maintenance Requests
                                            </SidebarButton>
                                            <SidebarButton
                                                ValueToCheck={displayTableNumber.toString()}
                                                ValueForTrigger={'1'}
                                                onClick={() => displayNumToggle(1)}
                                                icon={<IconShieldHalf size="35" />}
                                            >
                                                Security Requests
                                            </SidebarButton>
                                        </Flex>
                                    </Collapse>

                                    <Flex direction="column" justify="center" gap="md">
                                        <SidebarButton
                                            ValueToCheck={displayTableNumber.toString()}
                                            onClick={() => setCSVManipOpen(true)}
                                            icon={<IconFileBroken size="35" />}
                                        >
                                            CSV Manipulator
                                        </SidebarButton>
                                        <SidebarButton
                                            ValueToCheck={displayTableNumber.toString()}
                                            component={Link}
                                            to={'/map-editor'}
                                            icon={<IconMap2 size="35"  />}
                                        >
                                            Map Editor
                                        </SidebarButton>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Box>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={'auto'}>
                    <Box maw="100%" mx="auto">
                        {/*<Title ff="Inter" fz="30px" mb="4px" ta="center" fw={600}>*/}
                        {/*  Admin Page*/}
                        {/*</Title>*/}
                        <Center pr="10px">
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                w="100%"
                                bg="#D6E0F8"
                                style={{
                                    boxShadow: 'inset -5px 8px 5px -5px rgba(0,0,255,0.1)',
                                    borderRadius: '8px',
                                    margin: '80px',
                                }}
                            >
                                {/*CHANGE THIS IF WE WANT A DEFAULT LANDING PAGE INSTEAD OF LANGUAGE INTERPRETER TABLE*/}
                                {/*JUST HAVE TO CHANGE THE USESTATE NUMBER AT THE TOP TO -1IF YOU DO THIS*/}
                                {/*<Collapse*/}
                                {/*    in={displayTableNumber == -1}*/}
                                {/*    transitionDuration={300}*/}
                                {/*    transitionTimingFunction="linear"*/}
                                {/*>*/}
                                {/*    <Title order={3} mt="100px" mb="100px" ta="center" fw={600}>*/}
                                {/*        Select a tool from the sidebar*/}
                                {/*    </Title>*/}
                                {/*</Collapse>*/}
                                <Collapse
                                    w="100%"
                                    in={displayTableNumber == 0}
                                    transitionDuration={300}
                                    transitionTimingFunction="linear"
                                >
                                    <Box
                                        p="10px"
                                        mt="10px"
                                        w="100%"
                                        style={{
                                            borderRadius: '15px',
                                        }}
                                    >
                                        <RequestHistory requestType="Language" />
                                    </Box>
                                </Collapse>
                                <Collapse
                                    w="100%"
                                    in={displayTableNumber == 1}
                                    transitionDuration={300}
                                    transitionTimingFunction="linear"
                                >
                                    <Box
                                        p="10px"
                                        mt="10px"
                                        style={{
                                            borderRadius: '15px',
                                        }}
                                    >
                                        <RequestHistory requestType="Security" />
                                    </Box>
                                </Collapse>
                                <Collapse
                                    w="100%"
                                    in={displayTableNumber == 2}
                                    transitionDuration={300}
                                    transitionTimingFunction="linear"
                                >
                                    <Box
                                        p="10px"
                                        mt="10px"
                                        style={{
                                            borderRadius: '15px',
                                        }}
                                    >
                                        <RequestHistory requestType="Sanitation" />
                                    </Box>
                                </Collapse>
                                <Collapse
                                    w="100%"
                                    in={displayTableNumber == 3}
                                    transitionDuration={300}
                                    transitionTimingFunction="linear"
                                >
                                    <Box
                                        p="10px"
                                        mt="10px"
                                        style={{
                                            borderRadius: '15px',
                                        }}
                                    >
                                        <RequestHistory requestType="Maintenance" />
                                    </Box>
                                </Collapse>
                                <Box
                                    p="10px"
                                    mt="10px"
                                    style={{
                                        borderRadius: '15px',
                                    }}
                                >
                                    <Modal
                                        opened={CSVManipOpen}
                                        onClose={() => setCSVManipOpen(false)}
                                        title="CSV Manipulator"
                                        size="auto"
                                        centered
                                    >
                                        <CSVControlsComponent />
                                    </Modal>
                                </Box>
                                <Collapse
                                    in={displayTableNumber == 5}
                                    transitionDuration={300}
                                    transitionTimingFunction="linear"
                                >
                                    <Box
                                        p="10px"
                                        mt="10px"
                                        style={{
                                            borderRadius: '15px',
                                        }}
                                    >
                                        <ServiceRequestPage
                                            width={'100%'}
                                            marginRight={'0%'}
                                            height={'80vh'}
                                            cols={3}
                                            hSpacing={30}
                                            vSpacing={10}
                                            buttonHeight={220}
                                        />
                                    </Box>
                                </Collapse>
                            </Flex>
                        </Center>
                    </Box>
                </Grid.Col>
            </Grid>
        </Box>
    );
}

export default AdminPage;
