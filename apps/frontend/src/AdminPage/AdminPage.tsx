import React, { useState, useEffect } from 'react';
import { DatabaseController } from './DatabaseController';
import { CSVTable } from './CSVTable';
import { useMantineTheme, Collapse, Button, Divider, Center, Flex, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Language from '../service-request/LanguageInterpreterSR.tsx';
import LanguageRequestHistory from './LanguageRequestHistory.tsx';
import { BlackButton } from '../common-compoents/commonButtons.tsx';
import { SegmentedControl } from '@mantine/core';
import SecurityRequestHistory from './SecurityRequestHistory.tsx';
import SanitationRequestHistory from './SanitationRequestHistory.tsx';

export function AdminPage() {
    const navigate = useNavigate();

    const handleButtonSwitchers = () => {
        navigate('/language-request-history');
    };

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
        <div
            className="min-h-screen w-full"
            style={{
                background: 'linear-gradient(160deg, #aaf7fc 0%, #aaf7fc 100%)',
                padding: '2rem',
            }}
        >
            <div className="max-w-4xl mx-auto bg-[#FDF0D5]/90 p-4 sm:p-6 md:p-10 rounded-xl shadow-lg backdrop-blur-sm">
                <Title order={2} className="mb-4 text-center" fw={600}>
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
                                { label: 'MaintenanceRequest', value: '3', disabled: true },
                            ]}
                            onClick={() => setStringDisplayNum('-1')}
                            styles={(theme) => ({
                                root: {
                                    backgroundColor: '#FDF0D5',
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
                                    backgroundColor: theme.white,
                                    boxShadow: theme.shadows.sm,
                                },
                            })}
                        ></SegmentedControl>
                        <Collapse in={displayTableNumber == 0}>
                            <div className="bg-[#FDF0D5] p-4 rounded-lg mt-2">
                                <LanguageRequestHistory />
                            </div>
                        </Collapse>
                        <Collapse in={displayTableNumber == 1}>
                            <div className="bg-[#FDF0D5] p-4 rounded-lg mt-2">
                                <SecurityRequestHistory />
                            </div>
                        </Collapse>
                        <Collapse in={displayTableNumber == 2}>
                            <div className="bg-[#FDF0D5] p-4 rounded-lg mt-2">
                                <SanitationRequestHistory />
                            </div>
                        </Collapse>
                        <Collapse in={displayTableNumber == 3}>
                            <div className="bg-[#FDF0D5] p-4 rounded-lg mt-2">
                                {/*Staff Request*/}
                            </div>
                        </Collapse>
                    </Flex>
                    {/*<Button*/}
                    {/*    size="md"*/}
                    {/*    color="dark"*/}
                    {/*    fw="600"*/}
                    {/*    bg="black"*/}
                    {/*    mt="sm"*/}
                    {/*    style={{*/}
                    {/*      borderRadius: '50px',*/}
                    {/*      transition: 'all 0.3s ease',*/}
                    {/*    }}*/}
                    {/*    onClick= {handleClick}*/}
                    {/*  >*/}
                    {/*    Language Request Form History*/}
                    {/*  </Button>*/}
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
                <div className="flex justify-center mt-4">
                    <Button variant="outline" onClick={() => setShowPreview((prev) => !prev)}>
                        {showPreview ? 'Hide Directory Preview' : 'Preview Directory'}
                    </Button>
                </div>

                {/* Collapsible CSV Table */}
                <Collapse in={showPreview} transitionDuration={200}>
                    <div className="mt-4">
                        <CSVTable table="directory" />
                    </div>
                </Collapse>
            </div>
        </div>
    );
}

export default AdminPage;
