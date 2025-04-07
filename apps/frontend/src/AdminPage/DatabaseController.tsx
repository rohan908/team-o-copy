import { useState, useEffect } from 'react';
import {
    Box,
    TextInput,
    Button,
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
    const [message, setMessage] = useState('');

    // import function handling
    const handleImport = async () => {
        if (!file) {
            console.log('No file import');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            console.log('importing file');

            // sends a post request, formData is empty though
            const res = await fetch(`http://localhost:3001/${table}/import`, {
                method: 'POST',
                body: formData,
            });

            console.log('imported file');
        } catch (error) {
            console.log(error);
        }

        //setMessage(await res.statusText);
    };
    // export function handling
    const handleExport = async () => {
        window.location.href = `api/export/${table}`;
        /*
        // checking connection, prints whole table to console
        const res = await fetch(`/api/${table}/all`)
            .then((res) => console.log(res))
         */
    };
    // clear function handling
    const handleClear = async () => {
        if (!confirm('Are you sure you want to clear this table?')) return;
        const res = await fetch(`/api/clear/${table}`, {
            method: 'DELETE',
        });
        setMessage(await res.text());
    };

    return (
        <div>
            {/**/}
            {/*Input for import csv*/}
            <input
                type={'file'}
                accept={'.csv'}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="form-control"
                color={"black"}

            />
            <div>
                <Button
                    size="md"
                    color="dark"
                    fw="600"
                    bg="black"
                    //leftSection={<IconArrowRight size={14} />}
                    style={{
                        borderRadius: '50px',
                        transition: 'all 0.3s ease',
                    }}
                    onClick={handleImport}
                >
                    Import CSV
                </Button>
                <Button
                    size="md"
                    color="dark"
                    fw="600"
                    bg="black"
                    //leftSection={<IconArrowRight size={14} />}
                    style={{
                        borderRadius: '50px',
                        transition: 'all 0.3s ease',
                    }}
                    onClick={handleExport}
                >
                    Export CSV
                </Button>
                <Button
                    size="md"
                    color="dark"
                    fw="600"
                    bg="red"
                    //leftSection={<IconArrowRight size={14} />}
                    style={{
                        borderRadius: '50px',
                        transition: 'all 0.3s ease',
                    }}
                    onClick={handleClear}
                >
                    Clear Table
                </Button>
            </div>
        </div>
    );
}
export default DatabaseController;
