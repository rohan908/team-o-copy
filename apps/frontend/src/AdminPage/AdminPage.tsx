import React, { useState } from 'react';
import { DatabaseController } from './DatabaseController';
import { CSVTable } from './CSVTable';
import { useMantineTheme, Collapse, Button, Divider, Center, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Language from '../service-request/service.tsx';
import LanguageRequestHistory from './LanguageRequestHistory.tsx';

export function AdminPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/language-request-history');
    };

    const [showPreview, setShowPreview] = useState(false); // state to control the collapsible section

    return (
        <div
            className="min-h-screen w-full"
            style={{
                background: 'linear-gradient(160deg, #56effa 0%, #e4e8f0 100%)',
                padding: '2rem',
            }}
        >
            <div className="max-w-4xl mx-auto bg-white/90 p-4 sm:p-6 md:p-10 rounded-xl shadow-lg backdrop-b lur-sm">
                <Title order={1} className="mb-4 text-center" fw={600}>
                    Admin Page
                </Title>

                <Center>
                    <Button
                        variant="outline"
                        size="md"
                        color="#153A90"
                        fw="600"
                        className="nav-element hover-shadow"
                        mt="sm"
                        styles={{
                            root: {
                                borderRadius: '50px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: '#153A90',
                                    borderColor: 'black',
                                    backgroundColor: 'transparent',
                                },
                            },
                        }}
                        onClick={handleClick}
                    >
                        Language Request Form History
                    </Button>
                </Center>
                <br />
                <Divider
                    my="md"
                    size="sm"
                    color="#153A90"
                    className="border-t border-dotted border-#153A90"
                />
                <br />
                {/* CSV Import/Export Controls */}
                <DatabaseController table="directory" />

                {/* Toggle Button */}
                <Center mt="md">
                    <Button
                        variant="outline"
                        color="#153A90"
                        onClick={() => setShowPreview((prev) => !prev)}
                        className="nav-element hover-shadow"
                        size="md"
                        styles={{
                            root: {
                                color: '#153A90',
                                boderColor: 'black',
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        {showPreview ? 'Hide Directory Preview' : 'Directory Preview'}
                    </Button>
                </Center>

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
