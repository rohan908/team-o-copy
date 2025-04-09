  import React, { useEffect, useState } from 'react';
  import {
    useMantineTheme,
    Table,
    Title,
    ScrollArea,
    Text,
    Flex,
    Box,
    Loader,
    Center,
  } from '@mantine/core';

  export function LanguageRequestHistory() {
    const theme = useMantineTheme();

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:3001/requests`);
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

    if (loading) {
      return <Center><Loader /></Center>;
    }

    if (error) {
      return <Text color="red">{error}</Text>;
    }

    if (!data.length) {
      return <Text>No request form data found.</Text>;
    }

    const columns = Object.keys(data[0]);

    return (
      <Flex justify="center">
        <Box maw="90%" w="100%">
          <ScrollArea>
            <Title order={4} mb="sm" style={{textAlign: 'center'}} >Language Service Requests</Title>
            <Table striped highlightOnHover withColumnBorders>
              <thead>
              <tr>
                {columns.map((col) => (
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
        </Box>
      </Flex>
    );
  }

  export default LanguageRequestHistory;
