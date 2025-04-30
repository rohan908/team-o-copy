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
import Filter from './Filter.tsx';

// filter context addition
import { useFilterContext } from '../contexts/FilterContext';

// Type-safe interface for request data
interface RequestProps {
    employeeName: string;
    RequestID: number;
    requestType: string;
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

export function RequestHistory({ requestType }: { requestType: string }) {
    const theme = useMantineTheme();

    const [data, setData] = useState<RequestProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    // get current filters
    const { filterNames } = useFilterContext();

    // helper function to dispay correct feild
    const getRequestTypeValue = (row: RequestProps) => {
        switch (requestType) {
            case 'Language':
                return row.language ?? 'N/A';
            case 'Maintenance':
                return row.maintenanceType ?? 'N/A';
            case 'Security':
                return row.security ?? 'N/A';
            case 'Sanitation':
                return row.cleanupType ?? 'N/A';
            default:
                return 'N/A';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res: Response;
                switch (requestType) {
                    case 'Language':
                        res = await fetch(`/api/languageSR`);
                        break;
                    case 'Maintenance':
                        res = await fetch(`/api/maintenanceSR`);
                        break;
                    case 'Security':
                        res = await fetch(`/api/SecuritySR`);
                        break;
                    case 'Sanitation':
                        res = await fetch(`/api/sanitationSR`);
                        break;
                    default:
                        throw new Error('Invalid request type');
                }

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
    }, [requestType]);

    if (loading)
        return (
            <Center>
                <Loader />
            </Center>
        );
    if (error) return <Text color="red">{error}</Text>;
    if (!data.length) return <Text>No request form data found.</Text>;

    // make filter array from context
    const rows = filterNames.length
        ? data.filter((row) => filterNames.includes(row.employeeName))
        : data;

    const summaryColumns = ['employeeName', 'requestID', 'requestType', 'createdAt'];

    return (
        <Box p="xl" bg="primaryBlues.1" w="100%" h="100%" bd="lg" flex="column">
            <Title order={1} mb="sm" c="secondaryBlues.7" ta="left" fz="xl">
                {requestType} Service Requests
            </Title>
            <Text c="secondaryBlues.7" ta="left" mb="xl" fz="xxs">
                Click on a row to find out more information
            </Text>
            <Filter />

            <ScrollArea type="scroll" offsetScrollbars scrollbarSize={6}>
                <Table
                    c="black"
                    borderColor="greys.3"
                    withTableBorder={true}
                    withRowBorders={true}
                    highlightOnHover={true}
                    highlightOnHoverColor={'greys.1'}
                    width="100%"
                    layout="auto"
                >
                    <Table.Thead bg="primaryBlues.8">
                        <Table.Tr c="white">
                            {/* hardcoded these columns to use the requestType */}
                            <Table.Th p="12px" tt="capitalize" ta="center" fw="400">
                                Employee Name
                            </Table.Th>
                            <Table.Th p="12px" tt="capitalize" ta="center" fw="400">
                                Request ID
                            </Table.Th>
                            <Table.Th p="12px" tt="capitalize" ta="center" fw="400">
                                {requestType}
                            </Table.Th>
                            <Table.Th p="12px" tt="capitalize" ta="center" fw="400">
                                Submitted
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.map((row, idx) => (
                            <React.Fragment key={idx}>
                                <Table.Tr
                                    onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                                    style={{ cursor: 'pointer', borderRadius: '12px' }}
                                >
                                    <Table.Td ta="center" p="12px">
                                        {row.employeeName}
                                    </Table.Td>
                                    <Table.Td ta="center" p="12px">
                                        {row.requestID}
                                    </Table.Td>

                                    <Table.Td ta="center" p="12px">
                                        {getRequestTypeValue(row)}
                                    </Table.Td>

                                    <Table.Td ta="center" p="12px">
                                        {timeAgo(row.createdAt)}
                                    </Table.Td>
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

export default RequestHistory;
