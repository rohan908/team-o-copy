import {useCallback, useEffect, useMemo, useState} from 'react';
import { Table, Title, Loader, Center, ScrollArea, Text } from '@mantine/core';
import {useAllNodesContext, useDirectoryContext} from '../contexts/DirectoryContext.tsx';

type Props = {
    table: string;
};

export function CSVTable({ table }: Props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const data = useAllNodesContext();

    if(!data) {
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
        return <Text>No Data Found in Directory Table</Text>;
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
                                  {JSON.stringify(row[col])}
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
