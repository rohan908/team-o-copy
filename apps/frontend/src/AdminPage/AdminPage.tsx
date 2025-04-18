import React, { useState, useEffect } from 'react';
import { DatabaseController } from './DatabaseController';
import { CSVTable } from './CSVTable';
import { Collapse, Button, Divider, Center, Flex, Title, Box } from '@mantine/core';
import LanguageRequestHistory from './LanguageRequestHistory.tsx';
import { SegmentedControl } from '@mantine/core';
import SecurityRequestHistory from './SecurityRequestHistory.tsx';
import SanitationRequestHistory from './SanitationRequestHistory.tsx';
import MaintenanceRequestHistory from './MaintenanceHistory.tsx';

export function AdminPage() {
    const [showPreview, setShowPreview] = useState(false); // state to control the collapsible section
    const [displayTableNumber, setDisplayTableNumber] = useState(-1);
    const [stringDisplayNum, setStringDisplayNum] = useState('');

    useEffect(() => {
        switch (stringDisplayNum) {
            case '0':
                if (displayTableNumber != 0) {
                    setDisplayTableNumber(0);
                } else {
                    setDisplayTableNumber(-1);
                }
                break;
            case '1':
                if (displayTableNumber != 1) {
                    setDisplayTableNumber(1);
                } else {
                    setDisplayTableNumber(-1);
                }
                break;
            case '2':
                if (displayTableNumber != 2) {
                    setDisplayTableNumber(2);
                } else {
                    setDisplayTableNumber(-1);
                }
                break;
            case '3':
                if (displayTableNumber != 3) {
                    setDisplayTableNumber(3);
                } else {
                    setDisplayTableNumber(-1);
                }
                break;
        }
    }, [stringDisplayNum]);

    return (
        <Box
            className="min-h-screen w-full"
            style={{
                background: 'linear-gradient(160deg, #aaf7fc 0%, #aaf7fc 100%)',
                padding: '2rem',
            }}
        >
            <Box
              maw="60%"
              mx="auto"
              bg="themeGold.1"
              p="2.5%"
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
                        <Title
                            order={3}
                            mb="md"
                            c="#153A90"
                            ta="center"
                            fw={700}
                            fz={{ sm: 'xl', md: 'xl' }}
                        >
                            Select Request Form Type to View
                        </Title>
                        <SegmentedControl
                            value={stringDisplayNum}
                            onChange={setStringDisplayNum}
                            data={[
                                { label: 'LanguageRequest', value: '0' },
                                { label: 'SecurityRequest', value: '1' },
                                { label: 'SanitationRequest', value: '2' },
                                { label: 'MaintenanceRequest', value: '3' },
                            ]}
                            onClick={() => setStringDisplayNum('-1')}
                            styles={(theme) => ({
                                root: {
                                    backgroundColor: 'themeGold.1',
                                    padding: 4,
                                    borderRadius: theme.radius.md,
                                },
                                label: {
                                    color: theme.colors.dark[9],
                                    fontWeight: 600,
                                },
                                control: {
                                    border: 'none',
                                },
                                active: {
                                    backgroundColor: "themeGold.2",
                                    boxShadow: theme.shadows.sm,
                                },
                            })}
                        ></SegmentedControl>
                        <Collapse in={displayTableNumber == 0}>
                          <Box
                            bg="themeGold.0"
                            p="10px"
                            mt="10px"
                            style={{
                              borderRadius: "15px"
                            }}
                          >
                                <LanguageRequestHistory />
                            </Box>
                        </Collapse>
                        <Collapse in={displayTableNumber == 1}>
                          <Box
                            bg="themeGold.0"
                            p="10px"
                            mt="10px"
                            style={{
                              borderRadius: "15px"
                            }}
                          >
                                <SecurityRequestHistory />
                            </Box>
                        </Collapse>
                        <Collapse in={displayTableNumber == 2}>
                            <Box
                              bg="themeGold.0"
                              p="10px"
                              mt="10px"
                              style={{
                                borderRadius: "15px"
                              }}
                            >
                                <SanitationRequestHistory />
                            </Box>
                        </Collapse>
                        <Collapse in={displayTableNumber == 3}>
                            <Box
                              bg="themeGold.0"
                              p="10px"
                              mt="10px"
                              style={{
                                borderRadius: "15px"
                              }}
                            >
                                <MaintenanceRequestHistory />
                            </Box>
                        </Collapse>
                    </Flex>
                </Center>
                <br />
                <Divider
                    my="md"
                    size="sm"
                    style={{
                        borderTop: '4px dotted #FCCD6F',
                    }}
                />
                <br />
                {/* CSV Import/Export Controls */}
                <DatabaseController table="directory" />

                {/* Toggle Button */}
                <Flex
                  justify="center"
                  mt="10px"
                >
                    <Button
                        color="#153A90"
                        variant="outline"
                        onClick={() => setShowPreview((prev) => !prev)}
                    >
                        {showPreview ? 'Hide Directory Preview' : 'Preview Directory'}
                    </Button>
                </Flex>

                {/* Collapsible CSV Table */}
                <Collapse in={showPreview} transitionDuration={200}>
                    <div className="mt-4">
                        <CSVTable table="directory" />
                    </div>
                </Collapse>
            </Box>
        </Box>
    );
}

export default AdminPage;
