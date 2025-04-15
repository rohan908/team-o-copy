import React, { useState } from 'react';
import { DatabaseController } from './DatabaseController';
import { CSVTable } from './CSVTable';
import { useMantineTheme, Collapse, Button, Divider, Center, Flex, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Language from "../service-request/LanguageInterpreterSR.tsx";
import LanguageRequestHistory from "./LanguageRequestHistory.tsx";
import { BlackButton } from '../common-compoents/commonButtons.tsx';
import { SegmentedControl } from '@mantine/core';

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
        <div className="p-4 sm:p-6 md:p-10 max-w-4xl mx-auto w-full">
            <h1 className="font-bold text-xl mb-4 text-center">Admin Page</h1>
            <Center>
                <Flex direction="column" justify="center" align="center">
                    <Title
                        order={3}
                        mb="md"
                        c="black"
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
                            { label: 'MachineRequest', value: '1', disabled: true },
                            { label: 'SanitationRequest', value: '2', disabled: true },
                            { label: 'StaffRequest', value: '3', disabled: true },
                        ]}
                        onClick={() => setStringDisplayNum('-1')}
                    ></SegmentedControl>
                    <Collapse in={displayTableNumber == 0}>
                        <LanguageRequestHistory />
                    </Collapse>
                    <Collapse in={displayTableNumber == 1}>{/*Machine Request*/}</Collapse>
                    <Collapse in={displayTableNumber == 2}>{/*Sanitation Request*/}</Collapse>
                    <Collapse in={displayTableNumber == 3}>{/*Staff Request*/}</Collapse>
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
                    borderTop: '1px dotted black',
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

    );
}

export default AdminPage;
