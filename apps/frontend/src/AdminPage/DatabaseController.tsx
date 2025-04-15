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
    Divider,
} from '@mantine/core';

type Props = {
    table: string;
};
export function DatabaseController({ table }: Props) {
    // useState variables -> might need to change types
    const [file, setFile] = useState<File | null>(null);

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
        } catch (error) {
            console.log(error);
        }

        //setMessage(await res.statusText);
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

    // clear function handling
    const handleClear = async () => {
        if (!confirm('Are you sure you want to clear this table?')) return;
        const res = await axios.delete(`api/${table}/clear`, {}).then((responseData) => {
            console.log('Response from server:', responseData);
        });
    };

    // used to reload the page when a button is pressed
    function reloadPage() {
        window.location.reload();
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {/**/}
            {/*Input for import csv*/}
            <FileInput
                label="Import File Here"
                radius="md"
                placeholder="Choose a CSV file"
                accept=".csv"
                onChange={setFile}
                className="mb-4"
                color="#FFF8EBs"
                styles={{
                    input: {
                        borderColor: '#153A90',
                        '&:hover': {
                            borderColor: '#93c5fd',
                        },
                    },
                }}
            />
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
                        handleImport();
                        reloadPage();
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
                    onClick={() => {
                        handleClear();
                        reloadPage();
                    }}
                >
                    Clear Table
                </Button>
            </Flex>
        </div>
    );
}
export default DatabaseController;
