import { useEffect, useState } from 'react';
import { Table, Title, Loader, Center, ScrollArea, Text } from '@mantine/core';
import { parseBackupCSV } from 'common/src/CSVParsing.ts';
import fs from 'fs';

type Props = {
    table: string;
};

export function CSVTable({ table }: Props) {
    const [data, setData] = useState<Record<string, string>[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3001/${table}/export`); //This is where you pull the CSV data

                if (!res.ok) {
                    throw new Error(`HTTP error!: ${res.status}`);
                }
                // gets json data from fetched data
                const directoryData = res.json().then(res => {
                  console.log(res);
                  setData(res);
                });

            } catch (error) {
                console.error('Error fetching CSV table', error);
                setError(error instanceof Error ? error.message : 'Failed to load CSV');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [table]);

    if (loading) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    if (error) {
        return <Text color="red">{error}</Text>;
    }

    if (!data.length) {
        return <Text>No Data Found in CSV</Text>;
    }

    const columns = Object.keys(data[0]);

    return (
        <ScrollArea type="auto" offsetScrollbars>
            <Title order={4} mb="sm" ta="center">
                {table.toUpperCase()}
            </Title>

            {/* Table container with responsive design */}
            <Table
                striped
                highlightOnHover
                withColumnBorders
                withTableBorder
                className="text-sm"
                style={{ borderRadius: '8px', overflow: 'hidden' }}
            >
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col}
                                style={{
                                    padding: '8px',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    backgroundColor: '#f5f5f5',
                                }}
                            >
                                {col.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map((col) => (
                                <td
                                    key={col}
                                    style={{
                                        wordBreak: 'break-word',
                                        maxWidth: '160px',
                                        padding: '8px',
                                        fontSize: '14px',
                                    }}
                                >
                                    {typeof row[col] === 'object'
                                        ? JSON.stringify(row[col])
                                        : String(row[col])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </ScrollArea>
    );
}

export default CSVTable;
