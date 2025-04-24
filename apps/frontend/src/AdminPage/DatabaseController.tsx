import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    TextInput,
    Button,
    FileInput,
    Group,
    useMantineTheme,
    Title,
    Flex,
    Text,
    Modal,
    Divider,
} from '@mantine/core';

type Props = {
    table: string;
};
export function DatabaseController({ table }: Props) {
    // useState variables -> might need to change types
    const [file, setFile] = useState<File | null>(null);
    const [opened, setOpened] = useState(false);

    // reads the given file and returns as string
    async function getData(datafile: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result as string);
            };

            reader.readAsText(datafile);
        });
    }

    // import function handling
    const handleImport = async () => {
        if (!file) {
            console.log('No file import');
            return;
        }

        const data = await getData(file);
        console.log(data);

        try {
            console.log('importing file');

            // Sends parsed data to the database
            const res = await axios
                .post(`api/${table}/import`, data)
                .then((responseData) => {
                    console.log('Response from server:', responseData);
                })
                .catch((err) => console.log(err));

            console.log('imported file');
            setOpened(false);
        } catch (error) {
            console.log(error);
        }

        reloadPage();
    };

    // export function handling
    const handleExport = async () => {
        const link = document.createElement('a');
        link.href = 'api/exportRoute/static-export/backup.csv';
        link.setAttribute('download', 'backup.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportJSON = async () => {

    }

    // clear function handling
    const handleClear = async () => {
        if (!confirm('Are you sure you want to clear this table?')) return;
        const res = await axios.delete(`api/${table}/clear`, {}).then((responseData) => {
            console.log('Response from server:', responseData);
        });

        reloadPage();
    };

    // used to reload the page when a button is pressed
    function reloadPage() {
        window.location.reload();
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {/**/}
            {/*Input for import csv*/}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Import CSV File"
                centered
            >
                <FileInput
                    label="Select CSV file"
                    placeholder="Choose a CSV file"
                    accept=".csv"
                    onChange={setFile}
                    mb="md"
                    className="mb-4"
                    color="#FDF0D5"
                    style={(theme) => ({
                        modal: {
                            backgroundColor: '#FDF0D5',
                        },
                        header: {
                            backgroundColor: '#FDF0D5',
                            borderBottom: `1px solid ${theme.colors.gray[3]}`,
                        },
                        title: {
                            color: '#153A90',
                            fontweight: 600,
                        },
                    })}
                />
                <Button fullWidth onClick={handleImport} color="dark" bg="#153A90">
                    Submit
                </Button>
            </Modal>

            <Flex
                gap="md"
                justify="center"
                align="center"
                direction={{ base: 'column', sm: 'row' }}
                wrap="wrap"
            >
                <Button
                    size="sm"
                    color="dark"
                    bg="#153A90"
                    className="nav-element hover-shadow"
                    //leftSection={<IconArrowRight size={14} />}
                    style={{
                        root: {
                            borderColor: '#000',
                            '&:hover': {
                                color: '#93c5fd',
                                borderColor: '#93c5fd',
                                backgroundColor: 'transparent',
                            },
                        },
                    }}
                    onClick={() => {
                        setOpened(true);
                    }}
                >
                    Import CSV
                </Button>
                <Button
                    size="sm"
                    color="dark"
                    className="nav-element hover-shadow"
                    bg="#153A90"
                    fw="600"
                    //leftSection={<IconArrowRight size={14} />}
                    style={{
                        root: {
                            borderColor: '#000',
                            '&:hover': {
                                color: '#93c5fd',
                                borderColor: '#93c5fd',
                                backgroundColor: 'transparent',
                            },
                        },
                    }}
                    onClick={handleExport}
                >
                    Export CSV
                </Button>
                <Button
                    size="sm"
                    color="dark"
                    className="nav-element hover-shadow"
                    bg="#153A90"
                    fw="600"
                    //leftSection={<IconArrowRight size={14} />}
                    style={{
                        root: {
                            borderColor: '#000',
                            '&:hover': {
                                color: '#93c5fd',
                                borderColor: '#93c5fd',
                                backgroundColor: 'transparent',
                            },
                        },
                    }}
                    onClick={handleExport}
                >
                    Export JSON
                </Button>
                <Button
                    size="sm"
                    color="dark"
                    fw="600"
                    bg="red"
                    className="nav-element hover-shadow"
                    //leftSection={<IconArrowRight size={14} />}
                    style={{
                        root: {
                            borderColor: '#000',
                            '&:hover': {
                                color: '#93c5fd',
                                borderColor: '#93c5fd',
                                backgroundColor: 'transparent',
                            },
                        },
                    }}
                    onClick={handleClear}
                >
                    Clear Table
                </Button>
            </Flex>
        </div>
    );
}
export default DatabaseController;
