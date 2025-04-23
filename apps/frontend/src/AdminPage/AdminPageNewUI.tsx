import React, { useState, useEffect } from 'react';
import { DatabaseController } from './DatabaseController';
import { CSVTable } from './CSVTable';
import {
  Collapse,
  Button,
  Divider,
  Center,
  Flex,
  Title,
  Box,
  Grid,
  ActionIcon, Transition,
} from '@mantine/core';
import LanguageRequestHistory from './LanguageRequestHistory.tsx';
import { SegmentedControl } from '@mantine/core';
import SecurityRequestHistory from './SecurityRequestHistory.tsx';
import SanitationRequestHistory from './SanitationRequestHistory.tsx';
import MaintenanceRequestHistory from './MaintenanceHistory.tsx';
import CSVControlsComponent from './CSVControlsComponent.tsx';
import {
  IconArrowBadgeDown,
  IconArrowBadgeDownFilled,
  IconArrowBadgeLeftFilled,
  IconArrowBadgeRightFilled
} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import { MapEditor } from '../IndoorMapPage/MapEditor.tsx';
import { Link } from 'react-router-dom';
import {ColorChangingButton} from "../common-compoents/commonButtons.tsx";
import ServiceRequestPage from "../service-request/ServiceRequestPage.tsx";

export function AdminPageV2() {
    const [sidebarOpen, {toggle}] = useDisclosure(true);
    const [formInfoOpen, {open, close}] = useDisclosure(true);
    const [otherToolsOpen, setOtherToolsOpen] = useState(true);
    const [displayTableNumber, setDisplayTableNumber] = useState(5);

    function displayNumToggle(num: number) {
        // if (num == displayTableNumber) {
        //   setDisplayTableNumber(-1);
        // } else {
        //   setDisplayTableNumber(num);
        // }
        setDisplayTableNumber(num);
    }

    function toggleOtherTools(){
      setOtherToolsOpen(!otherToolsOpen);
    }

    return (
        <Box
            mih="80vh"
            w="full"
            pt={"75px"}
            bg="#EAF1FF"
        >
          <Grid align="top">
              <Grid.Col span={"content"}>
                <Transition mounted={sidebarOpen} transition="slide-right" duration={400} timingFunction="linear">
                  {(styles) =>
                    <div style={styles}>
                      <Flex direction="column" justify="center">
                        <Box
                          w="20vw"
                          mih="100vh"
                          p="lg"
                          mt="-8px"
                        >
                          <Flex direction="column" justify="center" gap="sm">
                            <Flex direction="row" align="center" justify="center" gap="sm">
                              <Title c="black">
                                Toolbar
                              </Title>
                              <ActionIcon
                                bg={"#EBF2FF"}
                                top="10%"
                                size="input-sm"
                                onClick={toggle}
                                aria-label="ActionIcon the same size as inputs"
                              >
                                <IconArrowBadgeDownFilled color={"black"}/>
                              </ActionIcon>
                            </Flex>
                            <Flex direction="column" align="center" justify="center" gap="sm">
                              <Flex direction="row" align="center" justify="center" gap="sm">
                                <Title c="black">
                                  Service Requests
                                </Title>
                                <Collapse in={formInfoOpen} transitionDuration={0} transitionTimingFunction="linear">
                                  <ActionIcon
                                    bg={"#EBF2FF"}
                                    top="10%"
                                    size="input-sm"
                                    onClick={close}
                                    aria-label="ActionIcon the same size as inputs"
                                  >
                                    <IconArrowBadgeDownFilled color={"black"}/>
                                  </ActionIcon>
                                </Collapse>
                                {!formInfoOpen &&(
                                  <ActionIcon
                                    bg={"#EBF2FF"}
                                    size="input-sm"
                                    onClick={open}
                                    aria-label="ActionIcon the same size as inputs"
                                  >
                                    <IconArrowBadgeLeftFilled color={"black"}/>
                                  </ActionIcon>
                                )}
                              </Flex>
                              <Collapse in={formInfoOpen} transitionDuration={300} transitionTimingFunction="linear">
                                <Flex direction="column" justify="center" gap="xs">
                                  <ColorChangingButton numValueToCheck={displayTableNumber} numForTrigger={5} firstColor="#285CC6" secondColor="#5A83DB" onClick={() => displayNumToggle(5)}>
                                    Service Request Input
                                  </ColorChangingButton>
                                  <ColorChangingButton numValueToCheck={displayTableNumber} numForTrigger={0} firstColor="#285CC6" secondColor="#5A83DB" onClick={() => displayNumToggle(0)}>
                                    Language Requests
                                  </ColorChangingButton>
                                  <ColorChangingButton  numValueToCheck={displayTableNumber} numForTrigger={2} firstColor="#285CC6" secondColor="#5A83DB" onClick={() => displayNumToggle(2)}>
                                    Sanitation Requests
                                  </ColorChangingButton>
                                  <ColorChangingButton numValueToCheck={displayTableNumber} numForTrigger={3} firstColor="#285CC6" secondColor="#5A83DB" onClick={() => displayNumToggle(3)}>
                                    Maintenance Requests
                                  </ColorChangingButton>
                                  <ColorChangingButton numValueToCheck={displayTableNumber} numForTrigger={1} firstColor="#285CC6" secondColor="#5A83DB" onClick={() => displayNumToggle(1)}>
                                    Security Requests
                                  </ColorChangingButton>
                                </Flex>
                              </Collapse>
                              <Flex direction="row" align="center" justify="center" gap="sm" >
                                <Title c="black">
                                  Other Tools
                                </Title>
                                <Collapse in={otherToolsOpen} transitionDuration={0} transitionTimingFunction="linear">
                                  <ActionIcon
                                    bg={"#EBF2FF"}
                                    top="10%"
                                    size="input-sm"
                                    onClick={toggleOtherTools}
                                    aria-label="ActionIcon the same size as inputs"
                                  >
                                    <IconArrowBadgeDownFilled color={"black"}/>
                                  </ActionIcon>
                                </Collapse>
                                {!otherToolsOpen &&(
                                  <ActionIcon
                                    bg={"#EBF2FF"}
                                    size="input-sm"
                                    onClick={toggleOtherTools}
                                    aria-label="ActionIcon the same size as inputs"
                                  >
                                    <IconArrowBadgeLeftFilled color={"black"}/>
                                  </ActionIcon>
                                )}
                              </Flex>
                              <Collapse in={otherToolsOpen} transitionDuration={300} transitionTimingFunction="linear">
                                <Flex direction="column" justify="center" gap="xs">
                                  <ColorChangingButton numValueToCheck={displayTableNumber} numForTrigger={4} firstColor="#285CC6" secondColor="#5A83DB" onClick={() => displayNumToggle(4)}>
                                    CSV Manipulator
                                  </ColorChangingButton>
                                  <Button bg={"#5A83DB"}
                                          component={Link}
                                          to={"/map-editor"}
                                          size="sm"
                                          ff="Inter"
                                          fw="400"
                                          style={{
                                            borderRadius: "8px"
                                          }}
                                  >
                                    Map Editor Tools
                                  </Button>
                                </Flex>
                              </Collapse>
                            </Flex>
                          </Flex>
                        </Box>
                      </Flex>
                    </div>
                  }
                </Transition>
                {!sidebarOpen && (
                  <Transition mounted={!sidebarOpen} transition="slide-left" duration={400}>
                    {(styles) =>
                      <div style={styles}>
                        <Box
                          w="55px"
                          h="100vh"
                          p="lg"
                          mt="-8px"
                        >
                          <ActionIcon
                            bg="#EBF2FF"
                            size="input-sm"
                            onClick={toggle}
                            ml={"-10px"}
                            aria-label="ActionIcon the same size as inputs"
                          >
                            <IconArrowBadgeLeftFilled color="black" />
                          </ActionIcon>
                        </Box>
                      </div>}
                  </Transition>
                )}
              </Grid.Col>
            <Grid.Col span={"auto"}>
                <Box
                  maw="100%"
                  mx="auto"
                >
                  {/*<Title ff="Inter" fz="30px" mb="4px" ta="center" fw={600}>*/}
                  {/*  Admin Page*/}
                  {/*</Title>*/}
                  <Center>
                    <Flex direction="column" justify="center" align="center" w="100%" bg="#D6E0F8" style={{
                      boxShadow: "inset -5px 8px 5px -5px rgba(0,0,255,0.1)",
                      borderRadius: "8px"
                    }}>
                      <Collapse in={displayTableNumber == -1} transitionDuration={300} transitionTimingFunction="linear">
                        <Title order={3} mt="100px" mb="100px" ta="center" fw={600}>
                          Select a tool from the sidebar
                        </Title>
                      </Collapse>
                      <Collapse w = "100%" in={displayTableNumber == 0} transitionDuration={300} transitionTimingFunction="linear">
                        <Box
                          p="10px"
                          mt="10px"
                          w="100%"
                          style={{
                            borderRadius: "15px"
                          }}
                        >
                          <LanguageRequestHistory />
                        </Box>
                      </Collapse>
                      <Collapse w = "100%" in={displayTableNumber == 1} transitionDuration={300} transitionTimingFunction="linear">
                        <Box
                          p="10px"
                          mt="10px"
                          style={{
                            borderRadius: "15px"
                          }}
                        >
                          <SecurityRequestHistory />
                        </Box>
                      </Collapse>
                      <Collapse w = "100%" in={displayTableNumber == 2} transitionDuration={300} transitionTimingFunction="linear">
                        <Box
                          p="10px"
                          mt="10px"
                          style={{
                            borderRadius: "15px"
                          }}
                        >
                          <SanitationRequestHistory />
                        </Box>
                      </Collapse>
                      <Collapse w = "100%" in={displayTableNumber == 3} transitionDuration={300} transitionTimingFunction="linear">
                        <Box
                          p="10px"
                          mt="10px"
                          style={{
                            borderRadius: "15px"
                          }}
                        >
                          <MaintenanceRequestHistory />
                        </Box>
                      </Collapse>
                      <Collapse in={displayTableNumber == 4} transitionDuration={300} transitionTimingFunction="linear">
                        <Box
                          p="10px"
                          mt="10px"
                          style={{
                            borderRadius: "15px"
                          }}
                        >
                          <CSVControlsComponent />
                        </Box>
                      </Collapse>
                      <Collapse in={displayTableNumber == 5} transitionDuration={300} transitionTimingFunction="linear">
                        <Box
                          p="10px"
                          mt="10px"
                          style={{
                            borderRadius: "15px"
                          }}
                        >
                          <ServiceRequestPage />
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

export default AdminPageV2;
