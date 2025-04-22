import React, { useEffect, useState } from 'react';
import {
    useMantineTheme,
    Table,
    Title,
    ScrollArea,
    Text,
    Box,
    Loader,
    Center,
    Transition,
} from '@mantine/core';

// Type-safe interface for request data
interface SanitationRequest {
    RequestID: number;
    sanitation: string;
    createdAt: string;
    [key: string]: unknown;
}

// basic calculator to show how long ago request was made
function timeAgo(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${diffDay}d ago`;
}

export function SanitationRequestHistory() {
    const theme = useMantineTheme();

    const [data, setData] = useState<SanitationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/sanitationSR`);
                if (!res.ok) throw new Error(`HTTP error!: ${res.status}`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error('Error fetching request forms', err);
                setError('Failed to load request data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading)
        return (
            <Center>
                <Loader />
            </Center>
        );
    if (error) return <Text color="red">{error}</Text>;
    if (!data.length) return <Text>No request form data found.</Text>;

    const summaryColumns = ['requestID', 'cleanupType', 'createdAt'];

    return (
        <Box
            p="md"
            w="100%"
            h="100%"
            opacity="0.95"
            bd="lg"
            flex="column"
            bga='blur(5px)'
        >
            <Title order={1} mb="sm" c="black" ta="center" fw={700} fz={{ sm: 'xl', md: 'xxxl' }}>
                Sanitation Service Requests
            </Title>
            <Text c="black" ta="center" mb="sm" fw={500} fz={{ sm: 'xxs', md: 'xs' }}>
                Click on a row to find out more information
            </Text>
            <ScrollArea
                type="scroll"
                offsetScrollbars
                scrollbarSize={6}
                style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden' }}
            >
                <Table
                  c="black" borderColor="black" withTableBorder={true} withRowBorders={true} withColumnBorders={true}
                  highlightOnHover={true} highlightOnHoverColor={"#CBD2DF"}
                  width="100%"
                  layout='auto'
                >
                  <Table.Thead>
                    <Table.Tr
                      c="black"
                    >
                            {summaryColumns.map((col) => (
                              <Table.Th
                                key={col}
                                p="12px"
                                tt="capitalize"
                                ta={"left"}
                              >
                                    {col === 'createdAt'
                                        ? 'Submitted'
                                        : col === 'RequestID'
                                          ? 'Request ID'
                                          : col.charAt(0).toUpperCase() + col.slice(1)}
                              </Table.Th>
                            ))}
                    </Table.Tr>
                  </Table.Thead>
                    <Table.Tbody>
                        {data.map((row, idx) => (
                            <React.Fragment key={idx}>
                              <Table.Tr
                                onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                                //Cursor and Border Radius are only possible through style={}
                                style={{
                                  cursor: 'pointer',
                                  borderRadius: '12px',
                                }}
                              >
                                    {summaryColumns.map((col) => (
                                      <Table.Td
                                        key={col}
                                        p="12px"
                                        fw="500"
                                      >
                                        {col === 'createdAt'
                                          ? timeAgo(row[col] as string)
                                          : String(row[col] ?? 'N/A')}
                                      </Table.Td>
                                    ))}
                              </Table.Tr>
                              <Table.Tr>
                                <Table.Td colSpan={summaryColumns.length} p="0px">
                                        <Transition
                                            mounted={expandedRow === idx}
                                            transition="scale-y"
                                            duration={250}
                                            timingFunction="ease"
                                        >
                                            {(styles) => (
                                              <Box
                                                p="md"
                                                mt="xs"
                                                mb="md"
                                                mx="sm"
                                                c="black"
                                                //...styles is needed for Transition Data, shadow and radius are styles only
                                                style={{
                                                  ...styles,
                                                  boxShadow: theme.shadows.xs,
                                                  borderRadius: theme.radius.md,
                                                }}
                                              >
                                                    {Object.entries(row).map(([key, value]) => {
                                                        if (summaryColumns.includes(key))
                                                            return null;
                                                        return (
                                                            <Text key={key} size="sm" mb="xs">
                                                                <strong>{key}:</strong>{' '}
                                                                {typeof value === 'object'
                                                                    ? JSON.stringify(value)
                                                                    : String(value)}
                                                            </Text>
                                                        );
                                                    })}
                                                </Box>
                                            )}
                                        </Transition>
                                </Table.Td>
                              </Table.Tr>
                            </React.Fragment>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </Box>
    );
}

export default SanitationRequestHistory;
