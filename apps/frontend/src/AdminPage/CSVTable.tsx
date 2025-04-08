import { useEffect, useState } from "react";
import { Table, Title, Loader, Center, ScrollArea, Text } from '@mantine/core'

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
                const res = await fetch(`http://localhost:3001/api/${table}/export`); //This is where you pull the CSV data

                if (!res.ok) {
                    throw new Error(`HTTP error!: ${res.status}`);
                }
                const csvData = await res.text();

                const parsedData = parseCSV(csvData);
                setData(parsedData);
            } catch (error) {
                console.error('Error fetching CSV table', error);
                setError(error instanceof Error ? error.message : "Failed to load CSV");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [table]);

    const parseCSV = (csvString: string) => {
        const lines = csvString.split('\n');
        if (lines.length ===0) return [];

        const headers = lines[0].split(',').map(h => h.trim());

        return lines.slice(1).filter(line => line.trim() !== '').map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index]?.trim() || '';
                return obj;
            }, {} as Record<string, string>);
        });
    };

    if (loading) {
        return <Center><Loader /></Center>;
    }

    if (error) {
        return <Text color="red">{error}</Text>;
    }

    if (!data.length) {
        return <Text>No Data Found in CSV</Text>;
    }

    const columns = Object.keys(data[0]);

    return (
        <ScrollArea>
            <Title order={4} mb="sm">{table.toUpperCase()}</Title>
            <Table striped highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        {columns.map((col) =>(
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                        {columns.map((col) => (
                            <td key={col}>
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
    )
}

export default CSVTable;