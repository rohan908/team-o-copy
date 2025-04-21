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
    ActionIcon,
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

export function AdminPageV2() {
    const [sidebarOpen, {toggle}] = useDisclosure(true);
    const [formInfoOpen, {open, close}] = useDisclosure(false);
    const [displayTableNumber, setDisplayTableNumber] = useState(-1);

    function displayNumToggle(num: number) {
        if (num == displayTableNumber) {
          setDisplayTableNumber(-1);
        } else {
          setDisplayTableNumber(num);
        }
    }

    return (
        <Box
            h="100%"
            w="full"
            style={{
                background: 'linear-gradient(160deg, #FAFAFB 0%, #FAFAFB 100%)',
            }}
        >
          <Grid align="top">
              <Grid.Col span={"content"}>
                <Collapse in={sidebarOpen} transitionDuration={300} transitionTimingFunction="ease">
                <Flex direction="column" justify="center">
                  <Button
                    bg="blueBase.8"
                    size="input-sm"
                    onClick={toggle}
                    aria-label="ActionIcon the same size as inputs"
                  >
                    <Title c="white">
                      Collapse Sidebar
                    </Title>
                  </Button>
                  <Box
                    bg="blueBase.8"
                    w="30vw"
                    h="content"
                    p="lg"
                  >
                    <Flex direction="column" justify="center" gap="sm">
                      <Flex>
                        <Title c="white">
                          Toolbar
                        </Title>
                      </Flex>
                      <Flex direction="row" align="center" justify="center" gap="sm">
                        <Title c="white">
                          Service Request Information
                        </Title>
                        <Collapse in={formInfoOpen} transitionDuration={0} transitionTimingFunction="linear">
                          <ActionIcon
                            top="10%"
                            bg="blueBase.8"
                            size="input-sm"
                            onClick={close}
                            aria-label="ActionIcon the same size as inputs"
                          >
                            <IconArrowBadgeDownFilled />
                          </ActionIcon>
                        </Collapse>
                        {!formInfoOpen &&(
                          <ActionIcon
                            bg="blueBase.8"
                            size="input-sm"
                            onClick={open}
                            aria-label="ActionIcon the same size as inputs"
                          >
                            <IconArrowBadgeLeftFilled />
                          </ActionIcon>
                        )}
                      </Flex>
                      <Collapse in={formInfoOpen} transitionDuration={300} transitionTimingFunction="linear">
                        <Flex direction="column" justify="center" gap="xs">
                          <Button bg={displayTableNumber == 0 ? "#3e4180" : "#5E62BF"} onClick={() => displayNumToggle(0)}>
                            Language Requests
                          </Button>
                          <Button bg={displayTableNumber == 2 ? "#3e4180" : "#5E62BF"} onClick={() => displayNumToggle(2)}>
                            Sanitation Requests
                          </Button>
                          <Button bg={displayTableNumber == 3 ? "#3e4180" : "#5E62BF"} onClick={() => displayNumToggle(3)}>
                            Maintenance Requests
                          </Button>
                          <Button bg={displayTableNumber == 1 ? "#3e4180" : "#5E62BF"} onClick={() => displayNumToggle(1)}>
                            Security Requests
                          </Button>
                          <Divider
                            my="md"
                            size="sm"
                            style={{
                              borderTop: '4px dotted #5E62BF',
                            }}
                          />
                        </Flex>
                      </Collapse>
                      <Button bg={displayTableNumber == 4 ? "#3e4180" : "#5E62BF"} onClick={() => displayNumToggle(4)}>
                        CSV Input Data
                      </Button>
                      <Button bg={displayTableNumber == 5 ? "#3e4180" : "#5E62BF"} onClick={() => displayNumToggle(5)}>
                        Map Editor Tools
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
                </Collapse>
                {!sidebarOpen && (
                  <Box
                    bg="blueBase.8"
                    left="5%"
                    w="fit-content"
                    h="fit-content"
                    style={{
                      borderRadius: "15px",
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    <ActionIcon
                      bg="blueBase.8"
                      size="input-sm"
                      onClick={toggle}
                      aria-label="ActionIcon the same size as inputs"
                    >
                      <IconArrowBadgeRightFilled />
                    </ActionIcon>
                  </Box>
                )}
              </Grid.Col>
            <Grid.Col span={"auto"}>
              <Box
                maw="100%"
                mx="auto"
                p="2%"
                style={{
                  borderRadius: "15px",
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <Title order={2} mb="4px" ta="center" fw={600}>
                  Admin Page
                </Title>
                <Center>
                  <Flex direction="column" justify="center" align="center">
                    <Collapse in={displayTableNumber == -1} transitionDuration={300} transitionTimingFunction="linear">
                      <Title order={3} mb="4px" ta="center" fw={600}>
                        Select a tool from the sidebar
                      </Title>
                    </Collapse>
                    <Collapse in={displayTableNumber == 0} transitionDuration={300} transitionTimingFunction="linear">
                      <Box
                        p="10px"
                        mt="10px"
                        style={{
                          borderRadius: "15px"
                        }}
                      >
                        <LanguageRequestHistory />
                      </Box>
                    </Collapse>
                    <Collapse in={displayTableNumber == 1} transitionDuration={300} transitionTimingFunction="linear">
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
                    <Collapse in={displayTableNumber == 2} transitionDuration={300} transitionTimingFunction="linear">
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
                    <Collapse in={displayTableNumber == 3} transitionDuration={300} transitionTimingFunction="linear">
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
                        <MapEditor />
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
