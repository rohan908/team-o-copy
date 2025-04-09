import React from 'react';
import {DatabaseController} from './DatabaseController';
import {useState, useEffect} from "react";
import {useMantineTheme, Table, Center, Title, ScrollArea, Text, Flex, Box, Loader} from '@mantine/core'


export function LanguageRequestHistory() {
  const theme = useMantineTheme();

  const [data, setData] = useState<Record<string, string>[]>([]);



  console.log(data);


  return (
    <Flex>
      <Box>
        <ScrollArea>
          <Title order={4} mb="sm">{"Language Service Requests"}</Title>

        </ScrollArea>
      </Box>
    </Flex>
  );
}

export default LanguageRequestHistory;
